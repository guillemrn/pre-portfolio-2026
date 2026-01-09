import { useEffect, useState } from 'react';

export function EstefaniaToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for ?ref=estefania
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref') === 'estefania') {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isVisible) return null;

  return (
    <div className="fixed bottom-6 right-0 left-0 md:left-auto md:right-8 z-50 flex justify-center md:block pointer-events-none">
      <div className="bg-forest border border-neon/30 shadow-2xl rounded-full py-3 px-6 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-700 pointer-events-auto">
        <span className="text-xl">✨</span>
        <p className="font-sans text-sm font-medium text-white tracking-wide">
          ¿Vienes del sitio de Estefanía? Me encargo de su infraestructura digital. <span className="text-neon">Hablemos de la tuya.</span>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 text-white/50 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
}
