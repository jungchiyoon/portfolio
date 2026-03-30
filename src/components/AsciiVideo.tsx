'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AsciiVideoProps {
  src: string;
  width?: number; // Target characters wide
  className?: string;
  autoPlay?: boolean;
}

const CHAR_MAP = '@%#*+=-:. '; // Density map (Dark to Light for White background)

export default function AsciiVideo({ src, width = 100, className = '', autoPlay = true }: AsciiVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = useState<string>('');

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationId: number;

    const renderFrame = () => {
      if (!video || !canvas || !ctx) return;
      if (video.paused || video.ended || video.readyState < 2) {
        animationId = requestAnimationFrame(renderFrame);
        return;
      }

      const vWidth = video.videoWidth || 640;
      const vHeight = video.videoHeight || 480;
      const aspectRatio = vHeight / vWidth;
      const height = Math.round(width * aspectRatio * 0.5);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(video, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      let asciiStr = '';
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b);
          const charIndex = Math.floor((brightness / 256) * CHAR_MAP.length);
          asciiStr += CHAR_MAP[charIndex] || ' ';
        }
        asciiStr += '\n';
      }

      setAscii(asciiStr);
      animationId = requestAnimationFrame(renderFrame);
    };

    const startRendering = () => {
      if (animationId) cancelAnimationFrame(animationId);
      renderFrame();
    };

    video.addEventListener('loadedmetadata', startRendering);
    video.addEventListener('play', startRendering);
    
    // Fallback if already playing or loaded
    if (video.readyState >= 2) {
      startRendering();
    }

    return () => {
      video.removeEventListener('loadedmetadata', startRendering);
      video.removeEventListener('play', startRendering);
      cancelAnimationFrame(animationId);
    };
  }, [width]);

  return (
    <div className={`ascii-container ${className}`} style={{ width: '100%', overflow: 'hidden', background: '#ffffff' }}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        autoPlay={autoPlay}
        playsInline
        style={{ display: 'none' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <pre
        style={{
          margin: 0,
          padding: 0,
          fontSize: '6px',
          lineHeight: '6px',
          letterSpacing: '3px',
          fontWeight: 400,
          color: '#000000',
          fontFamily: '"Courier New", Courier, monospace',
          whiteSpace: 'pre',
          textAlign: 'center',
          transform: 'scale(1.1)', // Subtle scale for impact
          transformOrigin: 'center center'
        }}
      >
        {ascii}
      </pre>
    </div>
  );
}
