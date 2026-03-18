"use client";

import { useAsyncForm } from "@/features/vendor/hooks/useAsyncForm";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ConfirmedLocation } from "@/features/maps/types/types";

interface StoreFormData {
  storeName: string;
  storeDescription: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  latitude: number | null; 
  longitude: number | null;
}
 
const INITIAL_FORM: StoreFormData = {
  storeName: '',
  storeDescription: '',
  address: '',
  phone: '',
  email: '',
  openingTime: '',
  closingTime: '',
  latitude: null, 
  longitude: null, 
};

interface StoreSetupProps {
  onComplete?: () => void;
  userId: string;
}

const MAX_SIZE_MB = 1;

    export function useSetUpFormLogic( { userId, onComplete }: StoreSetupProps) {
        const supabase = createClient();
    const { isLoading, error, setError, run } = useAsyncForm();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<StoreFormData>(INITIAL_FORM);
    
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const [showMap, setShowMap] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image must be under ${MAX_SIZE_MB}MB`);
        return;
        }
    
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleMapSelect = (isTrue: boolean, confirmed?: ConfirmedLocation) => {
        setShowMap(isTrue);
        if (confirmed) {
            setFormData((prev) => ({
            ...prev,
            address: confirmed.address,
            latitude: confirmed.geolocation.latitude,
            longitude: confirmed.geolocation.longitude,
            }));
        }
    };

    const clearLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
    };

    const uploadImage = async (file: File, path: string): Promise<string> => {
        const { error } = await supabase.storage
        .from('store_assets')
        .upload(path, file, { upsert: true });
    
        if (error) throw error;
    
        const { data } = supabase.storage.from('store_assets').getPublicUrl(path);
        return data.publicUrl;
    };

    const handleNext = () => {
        if (currentStep === 1) {
        if (!formData.storeName) {
            setError('Please fill in all required fields.');
            return;
        }
        setError(null);
        setCurrentStep(2);
        } else {
        if (!formData.address|| !formData.phone || !formData.email) {
            setError('Please fill in all required fields.');
            return;
        }
        run(handleSubmit);
        }
    };
    
    const handleBack = () => {
        setError(null);
        setCurrentStep(1);
    };
    
    const handleSubmit = async () => {
        console.log('📋 formData on submit:', formData)  // ← here
        console.log('📍 coordinates:', formData.latitude, formData.longitude)
        console.log('📬 address:', formData.address)
        let logoUrl: string | null = null;

        if (logoFile) {
            logoUrl = await uploadImage(logoFile, `${userId}/logo-${Date.now()}`);
        }

    

    const { error: dbError } = await supabase.from('stores').insert({
            id: userId,
            store_name: formData.storeName,
            store_description: formData.storeDescription || null,
            store_logo: logoUrl,
            store_coordinates:
            formData.latitude != null && formData.longitude != null
                ? `POINT(${formData.longitude} ${formData.latitude})`
                : null,
            phone_numbers: [formData.phone],
            email: formData.email,
            address: formData.address,
            opening_time: formData.openingTime || null,
            closing_time: formData.closingTime || null,
        });

        if (dbError) {
            console.error('❌ DB Error:', dbError.message)
            console.error('❌ DB Details:', dbError.details)
            console.error('❌ DB Hint:', dbError.hint)
            throw dbError
        }
        onComplete?.();
    };
    
    return {
        state: { currentStep, formData, logoPreview, logoInputRef, isLoading, error, showMap },
        setters: { handleChange, handleImageChange, clearLogo, handleNext, handleBack, handleMapSelect },
    };
}