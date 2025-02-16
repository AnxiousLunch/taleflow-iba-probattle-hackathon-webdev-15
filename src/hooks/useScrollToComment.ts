import { useEffect, RefObject } from 'react';

export function useScrollToComment(ref: RefObject<HTMLElement>, shouldScroll: boolean) {
  useEffect(() => {
    if (shouldScroll && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [shouldScroll, ref]);
}