import { useEffect, useState } from "react";

interface Ember {
  id: number;
  style: React.CSSProperties;
}

interface Orb {
  id: number;
  style: React.CSSProperties;
  animClass: string;
}

const COLORS = ["#FF4500", "#FF6820", "#FFB800", "#FF8C00", "#FF3300", "#FFCC00"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function EmberBackground() {
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const emberList = Array.from({ length: 40 }).map((_, i) => {
      const size = randomBetween(1.2, 4.8);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${randomBetween(0, 100)}%`,
          bottom: `${randomBetween(-5, 10)}%`,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}44`,
          animationDuration: `${randomBetween(8, 22)}s`,
          animationDelay: `${randomBetween(0, 16)}s`,
          "--drift": `${(Math.random() - 0.5) * 200}px`,
        } as React.CSSProperties,
      };
    });
    setEmbers(emberList);

    const orbList = Array.from({ length: 5 }).map((_, i) => {
      const configs = [
        { top: "15%", left: "10%", w: "500px", h: "400px", color: "rgba(255,69,0,0.07)", dur: "22s", delay: "0s" },
        { top: "55%", left: "65%", w: "420px", h: "520px", color: "rgba(255,120,0,0.05)", dur: "28s", delay: "-7s" },
        { top: "30%", left: "45%", w: "600px", h: "350px", color: "rgba(255,184,0,0.04)", dur: "35s", delay: "-14s" },
        { top: "70%", left: "5%",  w: "380px", h: "440px", color: "rgba(255,69,0,0.06)", dur: "25s", delay: "-4s" },
        { top: "5%",  left: "70%", w: "460px", h: "380px", color: "rgba(255,100,0,0.05)", dur: "30s", delay: "-10s" },
      ];
      const c = configs[i];
      return {
        id: i,
        style: {
          top: c.top, left: c.left,
          width: c.w, height: c.h,
          background: `radial-gradient(ellipse at center, ${c.color} 0%, transparent 70%)`,
          animationDuration: c.dur,
          animationDelay: c.delay,
        } as React.CSSProperties,
        animClass: i % 2 === 0 ? "orb-drift-a" : "orb-drift-b",
      };
    });
    setOrbs(orbList);
  }, []);

  return (
    <div className="bg-canvas" aria-hidden>
      {orbs.map((o) => (
        <div key={o.id} className={`bg-orb ${o.animClass}`} style={o.style} />
      ))}
      {embers.map((e) => (
        <div key={e.id} className="ember" style={e.style} />
      ))}
    </div>
  );
}
