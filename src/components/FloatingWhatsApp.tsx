import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleOpenWhatsApp = () => {
    const text =
      'Hello The Classic Crush! I would like to place an order from your bakery.';

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2">
      {/* WhatsApp Button */}
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-2xl hover:bg-[#20BA59] cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white text-[#25D366]" />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3.5 py-2 text-xs text-stone-800 shadow-xl">
          <span>Need help? Chat with us! 🍰</span>

          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="p-0.5 text-stone-400 hover:text-stone-700"
            aria-label="Dismiss message"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};