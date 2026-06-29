export function AboutSection() {
  return (
    <div className="mt-16 mb-12 p-6 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] border-l-[3px] border-l-[var(--fire)] backdrop-blur-md">
      <div className="font-['Bebas_Neue'] text-xl tracking-[2px] text-[var(--gold)] mb-3">About Us</div>
      <p className="text-[0.95rem] text-[var(--cream)] leading-[1.6] mb-3">
        Chicken Delights is a premium frozen snacks brand based in Mira Road, Mumbai. We specialize in bringing restaurant-quality flavors to your home with our wide range of kebabs, cutlets, and fried items.
      </p>
      <p className="text-[0.95rem] text-[var(--smoke)] italic font-['Playfair_Display']">
        "Taste the difference. Cook with confidence."
      </p>
    </div>
  );
}
