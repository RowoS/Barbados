"use client";
import { ShoppingCart, User, UtensilsCrossed } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#216869] rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F2421]">Buybites</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#1F2421] hover:text-[#216869] transition-colors">
              Home
            </a>
            <a href="#" className="text-[#1F2421] hover:text-[#216869] transition-colors">
              Restaurants
            </a>
            <a href="#" className="text-[#1F2421] hover:text-[#216869] transition-colors">
              About
            </a>
            <a href="#" className="text-[#1F2421] hover:text-[#216869] transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#1F2421]" />
            </button>
            <button 
              onClick={()=> router.push('/login')}
              className="flex items-center gap-2 bg-[#216869] hover:bg-[#1a5657] text-white px-5 py-2 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}