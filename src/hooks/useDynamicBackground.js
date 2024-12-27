import { useEffect } from 'react';

export const useDynamicBackground = (shouldApply, getImage) => {
  useEffect(() => {
    if (shouldApply) {
      document.body.style.backgroundImage = `url(${getImage})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center center';
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    }

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, [shouldApply, getImage]);
};
