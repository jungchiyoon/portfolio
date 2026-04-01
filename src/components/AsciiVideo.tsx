'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AsciiVideoProps {
  src: string;
  width?: number; // Target characters wide
  className?: string;
  autoPlay?: boolean;
  fontSize?: string;
  backgroundColor?: string;
  color?: string;
  subtitle?: string;
}


export default function AsciiVideo({ 
  src, 
  width = 100, 
  className = '', 
  autoPlay = true,
  fontSize = '10px',
  backgroundColor = '#ffffff',
  color = '#000000',
  subtitle = ''
}: AsciiVideoProps) {
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
      
      // Braille uses a 2x4 grid. To maintain the same character width, 
      // we need 2x pixels horizontally and 4x pixels vertically per character.
      const canvasWidth = width * 2;
      const canvasHeight = Math.round((width * 2 * aspectRatio) / 4) * 4;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;

      let asciiStr = '';
      const threshold = 127; // Threshold for dark vs light

      for (let y = 0; y < canvasHeight; y += 4) {
        for (let x = 0; x < canvasWidth; x += 2) {
          let brailleCode = 0;
          
          // Braille dot mapping:
          // 1 4
          // 2 5
          // 3 6
          // 7 8
          const dots = [
            [0, 0, 0x01], [0, 1, 0x02], [0, 2, 0x04],
            [1, 0, 0x08], [1, 1, 0x10], [1, 2, 0x20],
            [0, 3, 0x40], [1, 3, 0x80]
          ];

          for (const [dx, dy, bit] of dots) {
            const px = x + dx;
            const py = y + dy;
            if (px < canvasWidth && py < canvasHeight) {
              const offset = (py * canvasWidth + px) * 4;
              const r = pixels[offset];
              const g = pixels[offset + 1];
              const b = pixels[offset + 2];
              const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b);
              // Dark pixels (low brightness) become dots on white background
              if (brightness < threshold) {
                brailleCode |= bit;
              }
            }
          }
          
          asciiStr += String.fromCharCode(0x2800 + brailleCode);
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
    <div className={`ascii-container ${className}`} style={{ width: '100%', overflow: 'hidden', background: backgroundColor, position: 'relative' }}>
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
      <div style={{ width: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor }}>
        <pre
          style={{
            margin: 0,
            padding: '1rem',
            fontSize: fontSize,
            lineHeight: fontSize,
            letterSpacing: '0px',
            fontWeight: 500,
            color: color,
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            textAlign: 'left',
            overflow: 'hidden'
          }}
        >
          {ascii || 'Loading ASCII data...'}
        </pre>
      </div>
      {subtitle && (
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '2rem', 
            left: 0, 
            right: 0, 
            textAlign: 'center',
            color: '#ffffff',
            fontFamily: 'monospace',
            fontSize: '14px',
            letterSpacing: '0.2em'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
