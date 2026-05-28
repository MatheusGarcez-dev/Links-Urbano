import { useEffect, useRef } from "react";

type LineWavesProps = {
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
};

function LineWaves({
  speed = 0.2,
  innerLineCount = 32,
  outerLineCount = 32,
  warpIntensity = 1,
  rotation = -131,
  edgeFadeWidth = 1,
  colorCycleSpeed = 1,
  brightness = 0.2,
  color1 = "#231114",
  color2 = "#231114",
  color3 = "#231114",
  enableMouseInteraction = false,
  mouseInfluence = 2
}: LineWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;

    const palette = [color1, color2, color3];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = (event.clientY - rect.top) / rect.height;
    };

    window.addEventListener("pointermove", onPointerMove);

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;
      const rot = (rotation * Math.PI) / 180;
      const totalLines = innerLineCount + outerLineCount;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.translate(-cx, -cy);

      for (let i = 0; i < totalLines; i += 1) {
        const t = i / Math.max(totalLines - 1, 1);
        const yBase = t * height;
        const isOuter = i >= innerLineCount;
        const ampBase = isOuter ? 28 : 16;
        const amp = ampBase * warpIntensity;

        const colorIndex = Math.floor((i + time * colorCycleSpeed * 10) % palette.length);
        ctx.strokeStyle = palette[colorIndex];
        ctx.globalAlpha = Math.min(0.8, 0.14 + brightness * 0.6 + (isOuter ? 0.06 : 0));
        ctx.lineWidth = isOuter ? 1.3 : 1;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 6) {
          const nx = x / width;
          const mouseWave = enableMouseInteraction
            ? Math.sin((nx - pointerX) * 10) * Math.cos((t - pointerY) * 10) * mouseInfluence
            : 0;
          const wave =
            Math.sin(nx * 12 + time * speed * 8 + t * 5.5) * amp +
            Math.cos(nx * 7 - time * speed * 6 + t * 3) * (amp * 0.45) +
            mouseWave;
          const edgeFade = Math.max(0.08, 1 - Math.abs(nx - 0.5) * edgeFadeWidth * 1.3);
          const y = yBase + wave * edgeFade;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.restore();
      time += 0.01;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [
    speed,
    innerLineCount,
    outerLineCount,
    warpIntensity,
    rotation,
    edgeFadeWidth,
    colorCycleSpeed,
    brightness,
    color1,
    color2,
    color3,
    enableMouseInteraction,
    mouseInfluence
  ]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}

export function LineWavesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "1080px", height: "1080px", position: "relative" }}
      >
        <LineWaves
          speed={0.2}
          innerLineCount={32}
          outerLineCount={32}
          warpIntensity={1}
          rotation={-131}
          edgeFadeWidth={1}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#231114"
          color2="#231114"
          color3="#231114"
          enableMouseInteraction={false}
          mouseInfluence={2}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(242,218,42,0.1)_0.8px,transparent_0.8px)] [background-size:14px_14px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,6,8,0.32)_0%,rgba(8,4,5,0.75)_80%,rgba(8,4,5,0.86)_100%)]" />
    </div>
  );
}
