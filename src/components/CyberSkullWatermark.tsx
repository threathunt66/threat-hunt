import { useEffect, useRef } from "react";

const LEFT_EYE  = { cx: 154.6, cy: 320, rx: 30, ry: 15 };
const RIGHT_EYE = { cx: 344.9, cy: 320, rx: 30, ry: 15 };
const SIZE = 500;
const LERP = 0.12;

const HEX_VALS = ["0xDEAD", "0xFF", "C2", "APT", "4x4F", "0x1337", "TTPs", "IOC", "0xC0DE", "HUNT", "0xBAD", "CVE"];

function clampEllipse(dx: number, dy: number, rx: number, ry: number) {
  const len = Math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2);
  if (len <= 1) return { x: dx, y: dy };
  return { x: dx / len, y: dy / len };
}

const CyberSkullWatermark = () => {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const hexRef      = useRef<HTMLDivElement>(null);
  const lIrisRef    = useRef<SVGCircleElement>(null);
  const lPupilRef   = useRef<SVGCircleElement>(null);
  const lGlowRef    = useRef<SVGCircleElement>(null);
  const rIrisRef    = useRef<SVGCircleElement>(null);
  const rPupilRef   = useRef<SVGCircleElement>(null);
  const rGlowRef    = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let lx = LEFT_EYE.cx,  ly = LEFT_EYE.cy;
    let rx = RIGHT_EYE.cx, ry = RIGHT_EYE.cy;
    let ltx = LEFT_EYE.cx, lty = LEFT_EYE.cy;
    let rtx = RIGHT_EYE.cx, rty = RIGHT_EYE.cy;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const imgLeft = rect.left + (rect.width  - SIZE) / 2;
      const imgTop  = rect.top  + (rect.height - SIZE) / 2;

      const dl = clampEllipse(
        e.clientX - (imgLeft + LEFT_EYE.cx),
        e.clientY - (imgTop  + LEFT_EYE.cy),
        LEFT_EYE.rx, LEFT_EYE.ry
      );
      const dr = clampEllipse(
        e.clientX - (imgLeft + RIGHT_EYE.cx),
        e.clientY - (imgTop  + RIGHT_EYE.cy),
        RIGHT_EYE.rx, RIGHT_EYE.ry
      );
      ltx = LEFT_EYE.cx + dl.x; lty = LEFT_EYE.cy + dl.y;
      rtx = RIGHT_EYE.cx + dr.x; rty = RIGHT_EYE.cy + dr.y;
    };

    const tick = () => {
      lx += (ltx - lx) * LERP; ly += (lty - ly) * LERP;
      rx += (rtx - rx) * LERP; ry += (rty - ry) * LERP;

      const setXY = (el: SVGCircleElement | null, x: number, y: number) => {
        el?.setAttribute("cx", String(x));
        el?.setAttribute("cy", String(y));
      };
      setXY(lIrisRef.current,  lx, ly);
      setXY(lPupilRef.current, lx, ly);
      setXY(lGlowRef.current,  lx, ly);
      setXY(rIrisRef.current,  rx, ry);
      setXY(rPupilRef.current, rx, ry);
      setXY(rGlowRef.current,  rx, ry);

      rafId = requestAnimationFrame(tick);
    };

    // Floating hex particles
    const spawnHex = () => {
      const container = hexRef.current;
      if (!container) return;
      const el = document.createElement("div");
      el.textContent = HEX_VALS[Math.floor(Math.random() * HEX_VALS.length)];
      el.style.cssText = `
        position: absolute;
        font-family: monospace;
        font-size: 10px;
        color: #2AA6C6;
        opacity: 0;
        left: ${10 + Math.random() * 80}%;
        bottom: 0;
        animation: skullHexFloat ${3 + Math.random() * 2}s ease-out forwards;
        pointer-events: none;
        white-space: nowrap;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    };

    const hexInterval = setInterval(spawnHex, 1000);

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearInterval(hexInterval);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes skullBreathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.02); }
        }
        @keyframes skullScan {
          0%   { transform: translateY(-10px); opacity: 0; }
          8%   { opacity: 1; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(${SIZE}px); opacity: 0; }
        }
        @keyframes skullPulseL {
          0%, 100% { opacity: 0.22; }
          50%       { opacity: 0.05; }
        }
        @keyframes skullPulseR {
          0%, 100% { opacity: 0.22; }
          50%       { opacity: 0.05; }
        }
        @keyframes skullEyeGlow {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.30; }
        }
        @keyframes skullHexFloat {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 0.45; }
          90%  { opacity: 0.30; }
          100% { transform: translateY(-90px); opacity: 0; }
        }
        @keyframes skullCircuit {
          0%   { stroke-dashoffset: 120; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="absolute inset-0 m-auto pointer-events-none select-none"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Breathing wrapper */}
        <div style={{ width: "100%", height: "100%", animation: "skullBreathe 4.5s ease-in-out infinite", position: "relative" }}>

          {/* Skull base image */}
          <img
            src="/logo.png"
            alt=""
            draggable={false}
            style={{ width: SIZE, height: SIZE, opacity: 0.25, filter: "blur(0.4px)", position: "absolute", inset: 0 }}
          />

          {/* SVG eye layer */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: SIZE, height: SIZE }}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            {/* Pulse rings */}
            <circle cx={LEFT_EYE.cx}  cy={LEFT_EYE.cy}  r={28} fill="none" stroke="#2AA6C6" strokeWidth="1.2" style={{ animation: "skullPulseL 3s ease-in-out infinite" }} />
            <circle cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={28} fill="none" stroke="#2AA6C6" strokeWidth="1.2" style={{ animation: "skullPulseR 3s ease-in-out infinite 0.6s" }} />

            {/* Glow bloom behind iris */}
            <circle ref={lGlowRef} cx={LEFT_EYE.cx}  cy={LEFT_EYE.cy}  r={26} fill="#2AA6C6" style={{ animation: "skullEyeGlow 2.5s ease-in-out infinite",       filter: "blur(10px)" }} />
            <circle ref={rGlowRef} cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={26} fill="#2AA6C6" style={{ animation: "skullEyeGlow 2.5s ease-in-out infinite 0.4s", filter: "blur(10px)" }} />

            {/* Iris + pupil */}
            <circle ref={lIrisRef}  cx={LEFT_EYE.cx}  cy={LEFT_EYE.cy}  r={18} fill="#2AA6C6" opacity={0.28} />
            <circle ref={lPupilRef} cx={LEFT_EYE.cx}  cy={LEFT_EYE.cy}  r={7}  fill="#062030" opacity={0.55} />
            <circle ref={rIrisRef}  cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={18} fill="#2AA6C6" opacity={0.28} />
            <circle ref={rPupilRef} cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} r={7}  fill="#062030" opacity={0.55} />
          </svg>

          {/* Scan line sweep */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <div style={{
              position: "absolute", left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(42,166,198,0.4), transparent)",
              animation: "skullScan 6s ease-in-out infinite 2s",
            }} />
          </div>

        </div>

        {/* Floating hex particles */}
        <div ref={hexRef} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} />
      </div>
    </>
  );
};

export default CyberSkullWatermark;