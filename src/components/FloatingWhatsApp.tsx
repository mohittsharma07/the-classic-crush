import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text =
      'Hello The Classic Crush! I would like to place an order from your bakery.';

    const whatsappNumber = '918090205081';

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2">
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-[#D4BD85] bg-[#244536] text-[#FFFCF6] shadow-xl transition-colors hover:bg-[#292D1D]"
        aria-label="Chat with The Classic Crush on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-[#D8CCB7] bg-[#FFFCF6] px-3.5 py-2 text-xs text-[#292D1D] shadow-xl">
          <span>Need help? Chat with us! 🍰</span>

          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="p-0.5 text-[#615B4D] hover:text-[#292D1D]"
            aria-label="Dismiss message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
