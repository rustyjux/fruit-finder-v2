import React from 'react';
import { useCarousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const CarouselDots = React.forwardRef((props, ref) => {
  const { api } = useCarousel();
  const [updateState, setUpdateState] = React.useState(false);
  const toggleUpdateState = React.useCallback(
    () => setUpdateState((prevState) => !prevState),
    []
  );

  React.useEffect(() => {
    if (api) {
      api.on('select', toggleUpdateState);
      api.on('reInit', toggleUpdateState);

      return () => {
        api.off('select', toggleUpdateState);
        api.off('reInit', toggleUpdateState);
      };
    }
  }, [api, toggleUpdateState]);

  const numberOfSlides = api?.scrollSnapList().length || 0;
  const currentSlide = api?.selectedScrollSnap() || 0;

  if (numberOfSlides > 1) {
    return (
      <div ref={ref} className={`flex justify-center ${props.className || ''}`}>
        {Array.from({ length: numberOfSlides }, (_, i) => (
          <Button
            key={i}
            className={`mx-1 h-1.5 w-1.5 rounded-full p-0 ${
              i === currentSlide
                ? 'scale-125 transform bg-gray-500 hover:bg-gray-500'
                : 'bg-gray-300 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
});

CarouselDots.displayName = 'CarouselDots';

export default CarouselDots;