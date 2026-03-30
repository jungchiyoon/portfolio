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
    if (!video || !canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return;
    }

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
      console.log('AsciiVideo: startRendering called (readyState:', video.readyState, ')');
      if (animationId) cancelAnimationFrame(animationId);
      renderFrame();
    };

    video.addEventListener('loadedmetadata', startRendering);
    video.addEventListener('play', startRendering);
    video.addEventListener('playing', startRendering);
    video.addEventListener('canplay', startRendering);
    
    // Explicitly try to play
    video.play().catch(err => {
      console.warn('AsciiVideo: Play failed, waiting for interaction or readyState:', err);
    });

    // Polling fallback for readyState
    const checkInterval = setInterval(() => {
      if (video.readyState >= 2) {
        console.log('AsciiVideo: Polling found readyState >= 2');
        startRendering();
        clearInterval(checkInterval);
      }
    }, 500);

    return () => {
      video.removeEventListener('loadedmetadata', startRendering);
      video.removeEventListener('play', startRendering);
      video.removeEventListener('playing', startRendering);
      video.removeEventListener('canplay', startRendering);
      clearInterval(checkInterval);
      cancelAnimationFrame(animationId);
    };
  }, [width, src]);

  return (
    <div className={`ascii-container ${className}`} style={{ width: '100%', overflow: 'hidden', background: '#ffffff', position: 'relative' }}>
      {/* Hidden but technically visible to ensure loading */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '1px', 
          height: '1px', 
          opacity: 0,
          pointerEvents: 'none' 
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            fontSize: '8px',
            lineHeight: '8px',
            letterSpacing: '4px',
            fontWeight: 500,
            color: '#000000',
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            textAlign: 'left',
            overflow: 'hidden'
          }}
        >
          {ascii || 'Loading ASCII data...'}
        </pre>
      </div>
    </div>
  );
}
