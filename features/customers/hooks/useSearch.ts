"use client";

import { useState, useEffect, useRef } from "react";
import { getBarangays, getStoresInBarangay, searchStoresByName} from "../libs/search-actions";
import { Barangay, StoreResult, barangayCache} from "../types/types";

export function useSearch() {
    const [searchMode, setSearchMode] = useState<"barangay" | "text">("barangay");
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(null);
    const [stores, setStores] = useState<StoreResult[]>([]);
    const [textQuery, setTextQuery] = useState("");
    const [isLoadingBarangays, setIsLoadingBarangays] = useState(false);
    const [isLoadingStores, setIsLoadingStores] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (barangayCache.data) {
            setBarangays(barangayCache.data);
            return;
        }
        setIsLoadingBarangays(true);
        getBarangays()
            .then((data) => {
                barangayCache.data = data;
                setBarangays(data);
            })
            .catch(() => setError("Failed to load barangays"))
            .finally(() => setIsLoadingBarangays(false));
    }, []);

    const handleSelectBarangay = async (barangay: Barangay) => {
        setSelectedBarangay(barangay);
        setStores([]);
        setIsLoadingStores(true);
        setError(null);
        try {
            const results = await getStoresInBarangay(barangay.id);
            setStores(results);
        } catch {
            setError("Failed to load stores");
        } finally {
            setIsLoadingStores(false);
        }
    };

    const handleTextSearch = async () => {
        if (!textQuery.trim()) return;
        setStores([]);
        setIsLoadingStores(true);
        setError(null);
        try {
            const results = await searchStoresByName(textQuery.trim());
            setStores(results);
        } catch {
            setError("Failed to search stores");
        } finally {
            setIsLoadingStores(false);
        }
    };

    const handleClearSelection = () => {
        setSelectedBarangay(null);
        setTextQuery("");
        setStores([]);
    };

    const handleModeSwitch = (mode: "barangay" | "text") => {
        setSearchMode(mode);
        handleClearSelection();
    };

    return {
        values: {searchMode,textQuery, barangays, selectedBarangay, stores, isLoadingBarangays, isLoadingStores, error},
        functions: { handleSelectBarangay, handleClearSelection, handleTextSearch, handleModeSwitch, setTextQuery },
    };
}

