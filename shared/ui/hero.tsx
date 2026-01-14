import { ShoppingBag, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-[#216869] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Hungry?
              </h1>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#9CC5A1]">Order Food</span> You Love
              </h2>
              <p className="text-lg text-white/90 max-w-lg leading-relaxed">
                Discover the best restaurants in Baybay and get your favorite meals delivered to your doorstep in minutes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-white text-[#216869] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                <ShoppingBag className="w-5 h-5" />
                Order Now
              </button>
              <button className="flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
                <PlayCircle className="w-5 h-5" />
                How to Order
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold mb-1">100+</div>
                <div className="text-white/80 text-sm">Restaurants</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">5K+</div>
                <div className="text-white/80 text-sm">Happy Costumer</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">30 min</div>
                <div className="text-white/80 text-sm">Avg. Delivery</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/marvelous.gif"
                alt="Food Delivery"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
