import { QRCodeModal } from "./QRCodeModal";

export function OrderFooter() {
  return (
    <div className="text-center p-8 rounded-3xl bg-[rgba(255,69,0,0.03)] border border-[rgba(255,69,0,0.15)] backdrop-blur-md relative overflow-hidden mb-8">
      <div className="text-4xl mb-3 filter drop-shadow-[0_2px_8px_rgba(255,69,0,0.4)]">📦</div>
      <h2 className="font-['Bebas_Neue'] text-[2.2rem] tracking-[2px] text-[var(--gold)] mb-2">Order Now</h2>
      <div className="text-[0.8rem] text-[var(--smoke)] tracking-[1.5px] uppercase mb-6">Home Use · Cafes · Parties · Bulk Orders</div>

      <div className="flex flex-col items-center gap-3 max-w-[280px] mx-auto">
        {/* WhatsApp */}
        <a
          href="https://wa.me/919373295037"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-[0.95rem] tracking-[0.5px] text-white transition-all hover:-translate-y-[2px]"
          style={{
            background: "linear-gradient(90deg, #128C7E, #25D366)",
            boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
          }}
        >
          <span>💬</span> WhatsApp Us
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/chickendelights.in"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-[0.95rem] tracking-[0.5px] text-white transition-all hover:-translate-y-[2px]"
          style={{
            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            boxShadow: "0 4px 16px rgba(220,39,67,0.35)",
          }}
        >
          <span>📸</span> Follow us · <span className="font-normal opacity-90">@chickendelights.in</span>
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-8">
        <span className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[0.7rem] text-[var(--smoke)] tracking-[1px] uppercase">500g Frozen Packs</span>
        <span className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[0.7rem] text-[var(--smoke)] tracking-[1px] uppercase">Hygienic</span>
        <span className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[0.7rem] text-[var(--smoke)] tracking-[1px] uppercase">Ready to Cook</span>
        <span className="px-3 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[0.7rem] text-[var(--smoke)] tracking-[1px] uppercase">Restaurant Quality</span>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mt-6">
        <QRCodeModal />
      </div>

      {/* FSSAI Certification */}
      <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,184,0,0.06)] border border-[rgba(255,184,0,0.2)]">
          <span className="text-base">🏛️</span>
          <span className="text-[0.72rem] tracking-[1.5px] uppercase font-semibold text-[var(--gold)]">FSSAI Certified</span>
          <span className="text-[0.65rem] text-[var(--smoke)]">· Food Safety Assured</span>
        </div>
        <p className="text-[0.65rem] text-[var(--smoke)] mt-2 tracking-[0.5px]">
          Licensed & compliant with Food Safety and Standards Authority of India
        </p>
      </div>
    </div>
  );
}
