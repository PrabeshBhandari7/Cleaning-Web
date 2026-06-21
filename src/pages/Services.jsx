import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Services({ services, formatPrice, setFormData, setFormHighlight, nameInputRef }) {
  const navigate = useNavigate();

  const handleSelectServiceFromCard = (serviceId) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceId }));
    navigate('/contact');

    setTimeout(() => {
      setFormHighlight(true);
      setTimeout(() => setFormHighlight(false), 2000);

      if (nameInputRef.current) {
        setTimeout(() => nameInputRef.current.focus(), 800);
      }
    }, 100); // slight delay to allow navigation
  };

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
            Our Service Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
            Tailored Services for Every Environment
          </h2>
          <p className="text-slate-500 text-sm">
            Click on any service card below to automatically select it in the calculator and book!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelectServiceFromCard(service.id)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-border cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                {/* Floating Action Hint */}
                <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest bg-brand-orange text-white px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  Book This <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <div className="flex justify-between items-end text-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                        {service.icon || <Sparkles className="w-5 h-5 text-white" />}
                      </div>
                      <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                        {service.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl">{service.title}</h3>
                    <p className="text-[11px] text-slate-300 max-w-[18rem] line-clamp-1 group-hover:line-clamp-none transition-all mt-1">
                      {service.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-xs text-slate-300 block">From</span>
                    <span className="text-base font-black bg-brand-orange px-3 py-1 rounded-full block mt-0.5">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
