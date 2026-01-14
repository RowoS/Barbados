import { Clock, ShieldCheck, CreditCard, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Get your food delivered hot and fresh in an average of 30 minutes.',
      color: 'text-[#216869]',
      bgColor: 'bg-[#216869]/10',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Hygienic',
      description: 'All our partner vendors follow strict hygiene and safety standards.',
      color: 'text-[#216869]',
      bgColor: 'bg-[#216869]/10',
    },
    {
      icon: CreditCard,
      title: 'Easy Payment',
      description: 'Multiple payment options including cards, digital wallets, and cash on delivery.',
      color: 'text-[#216869]',
      bgColor: 'bg-[#216869]/10',
    },
    {
      icon: MapPin,
      title: 'Track Orders',
      description: 'Real-time order tracking so you know exactly when your food will arrive.',
      color: 'text-[#216869]',
      bgColor: 'bg-[#216869]/10',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F2421] mb-3">Why Choose Us</h2>
          <p className="text-lg text-[#1F2421]/70">
            We're committed to providing the best food delivery experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border-2 border-[#DCE1DE] hover:border-[#9CC5A1] hover:shadow-lg transition-all duration-300"
            >
              <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2421] mb-2">{feature.title}</h3>
              <p className="text-[#1F2421]/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}