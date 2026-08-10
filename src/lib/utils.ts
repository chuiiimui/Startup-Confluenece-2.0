import type Lenis from 'lenis';

/** Normalize Vite string URLs and Next.js StaticImageData imports. */
export type AssetSrc = string | { src: string };

export function assetSrc(image: AssetSrc | null | undefined): string {
  if (!image) return '';
  return typeof image === 'string' ? image : image.src;
}

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: -24,
      duration: 1.2,
    });
    return;
  }

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

export function scrollToTop(): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 0.9 });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Parse nav href into path + optional hash id. */
export function parseNavHref(href: string): { path: string; hashId: string | null } {
  if (href.startsWith('#')) {
    return { path: '/', hashId: href.slice(1) || null };
  }
  const [pathPart, hashPart] = href.split('#');
  return {
    path: pathPart || '/',
    hashId: hashPart || null,
  };
}
