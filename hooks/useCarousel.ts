import { useState, useCallback, useEffect } from 'react';

export function useCarousel(totalCards: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(((index % totalCards) + totalCards) % totalCards);
  }, [totalCards]);

  const nextSlide = useCallback(() => goToSlide(activeIndex + 1), [activeIndex, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(activeIndex - 1), [activeIndex, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return { activeIndex, goToSlide, nextSlide, prevSlide };
}
