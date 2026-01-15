import Image from "next/image"
import Link from "next/link"
import GardemicLogo from "@/public/gardemic-logo.svg"

export default function NavBar() {
    return (
        <div className="w-full max-w-8xl flex justify-between items-center p-3 px-5 text-sm border-b-8 border-b-black/20">
            <div className="flex gap-5 items-center font-semibold text-2xl w-full">
                <Image 
                src={GardemicLogo}
                alt="Gardemic Logo"
                width={45}
                height={50}

                className="bg-white rounded-full"
                />
                <Link href={"/"} className="text-2xl text-accent-white font-aclonica">Gardemic</Link>
            </div>
        </div>
    )
}