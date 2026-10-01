import React, { useEffect, useRef } from 'react';

interface SparkleCanvasProps {
  intensity?: 'subtle' | 'celebratory';
}

export const SparkleCanvas: React.FC<SparkleCanvasProps> = ({ intensity = 'subtle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count based on screen size and intensity
    const particleCount = intensity === 'celebratory' ? 45 : 24;
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      pulseAngle: number;
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.1,
      maxOpacity: Math.random() * 0.5 + 0.25,
      fadeSpeed: Math.random() * 0.015 + 0.005,
      pulseAngle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseAngle += p.fadeSpeed;
        p.opacity = (Math.sin(p.pulseAngle) * 0.5 + 0.5) * p.maxOpacity;

        // Reset if drifted beyond top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw golden particle with soft glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(216, 181, 112, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(184, 142, 62, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(216, 181, 112, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Star glint for random particles
        if (p.size > 2) {
          ctx.strokeStyle = `rgba(255, 240, 205, ${p.opacity * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 1.5, p.y);
          ctx.lineTo(p.x + p.size * 1.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 1.5);
          ctx.lineTo(p.x, p.y + p.size * 1.5);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
};
