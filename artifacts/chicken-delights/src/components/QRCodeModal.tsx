import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

const MENU_URL = "https://chickendelights.onrender.com/";

export function QRCodeModal() {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "chicken-delights-menu-qr.png";
    a.click();
  };

  return (
    <>
      <button className="qr-trigger" onClick={() => setOpen(true)}>
        <span>🌐</span> Get QR Code
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="qr-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="qr-modal"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="qr-close" onClick={() => setOpen(false)}>×</button>

              <div className="qr-title">Your Menu QR Code</div>
              <p className="qr-sub">
                Print this on your packaging, flyers, or display it in-store.<br />
                Customers scan it to browse and order directly.
              </p>

              <div className="qr-canvas-wrap" ref={canvasRef}>
                <div className="qr-canvas-inner">
                  <QRCodeCanvas
                    value={MENU_URL}
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#1a0800"
                    level="H"
                    marginSize={2}
                  />
                </div>
                <div className="qr-url">{MENU_URL}</div>
              </div>

              <div className="qr-actions">
                <button className="qr-download-btn" onClick={handleDownload}>
                  ⬇️ Download PNG
                </button>
                <button className="qr-secondary-btn" onClick={() => setOpen(false)}>
                  Done
                </button>
              </div>

              <p className="qr-hint">
                💡 Works at 300 DPI — safe to print at up to A5 size
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
