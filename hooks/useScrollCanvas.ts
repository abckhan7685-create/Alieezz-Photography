import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollCanvasResult {
  progress: number;
  phase: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  loadProgress: number;
}

export function useScrollCanvas(startFrame = 3, endFrame = 151): UseScrollCanvasResult {
  const totalFrames = endFrame - startFrame + 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameInterp = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const preloadImages = useCallback(async () => {
    let loadedCount = 0;
    const promises = [];

    for (let i = startFrame; i <= endFrame; i++) {
      promises.push(
        new Promise<void>((resolve) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(3, '0');
          img.src = `/Frames/ezgif-frame-${frameNumber}.jpg`;
          
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}`);
            loadedCount++; // Count as loaded to prevent hang
            resolve();
          };
          imagesRef.current[i - startFrame] = img;
        })
      );
    }
    await Promise.all(promises);
  }, [startFrame, endFrame, totalFrames]);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    // Maintain aspect ratio cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  const updateScroll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement?.parentElement; // .scroll-anim-container
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollTop = -rect.top;
    const scrollHeight = rect.height - window.innerHeight;
    
    // Calculate progress 0 to 1
    let newProgress = scrollTop / scrollHeight;
    newProgress = Math.max(0, Math.min(1, newProgress));
    setProgress(newProgress);

    // Update phase
    if (newProgress < 0.3) setPhase(1);
    else if (newProgress < 0.6) setPhase(2);
    else setPhase(3);

    // Calculate target frame
    const targetFrameIdx = Math.floor(newProgress * (totalFrames - 1));
    
    // Lerp
    currentFrameInterp.current += (targetFrameIdx - currentFrameInterp.current) * 0.15;
    
    const currentFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrameInterp.current)));
    drawFrame(currentFrame);

    animationFrameId.current = requestAnimationFrame(updateScroll);
  }, [totalFrames, drawFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const currentFrame = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrameInterp.current)));
    drawFrame(currentFrame);
  }, [drawFrame, totalFrames]);

  useEffect(() => {
    let mounted = true;

    preloadImages().then(() => {
      if (!mounted) return;
      resizeCanvas();
      animationFrameId.current = requestAnimationFrame(updateScroll);
      window.addEventListener('resize', resizeCanvas);
    });

    return () => {
      mounted = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [preloadImages, updateScroll, resizeCanvas]);

  return { progress, phase, canvasRef, loadProgress };
}
