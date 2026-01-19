"use client";
import { Button } from '@/shared/ui/button';
import { InputField } from '@/shared/components/InputField';
import { useUpdatePasswordForm } from '../hooks/useUpdatePassForm';
import { Smartphone } from 'lucide-react';

export default function UpdatePasswordForm() {
    const  { values, setters, error,message, isLoading, handleUpdatePassword, } = useUpdatePasswordForm();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DCE1DE] to-[#9CC5A1] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#216869] to-[#49A078] rounded-2xl flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold text-[#1F2421]">Buybites</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1F2421] mb-2">Reset Password</h1>
                    <p className="text-[#1F2421]/70">Enter your details to reset your password</p>
                </div>
                
                
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <InputField
                        label="New Password"
                        type="password"
                        value={values.password}
                        onChange={(e) => {
                            setters.setPassword(e.target.value);
                            if (error) setters.setConfirmPassword(e.target.value);
                    }}
                    />
                    <InputField
                        label="Confirm New Password"
                        type="password"
                        value={values.confirmPassword}
                        onChange={(e) => setters.setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    {isLoading ? (
                        <Button type="submit" className="w-full bg-gradient-to-r from-[#216869] to-[#49A078] text-white py-3.5 rounded-xl font-medium transition-all"disabled>
                            Loading...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-gradient-to-r from-[#216869] to-[#49A078] hover:from-[#1a5657] hover:to-[#3d8a66] text-white py-3.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl">Update Password</Button>
                    )}

                    {message && (<p className="text-green-600 text-sm font-medium">{message}</p>
)}
                </form>
                </div>     
                
            </div>
        </div>
    )
}