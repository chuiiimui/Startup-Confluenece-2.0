import type Lenis from 'lenis';

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}

export function cn(...inputs: ClassValue[]): string {
  const flatten = (arr: ClassValue[]): string[] => {
    return arr.reduce((acc: string[], val) => {
      if (Array.isArray(val)) {
        acc.push(...flatten(val));
      } else if (typeof val === 'string' || typeof val === 'number') {
        acc.push(String(val));
      }
      return acc;
    }, []);
  };
  return flatten(inputs).filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
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

export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.split(' ');
  let initials = '';
  for (let i = 0; i < Math.min(2, parts.length); i++) {
    if (parts[i].length > 0) {
      initials += parts[i][0];
    }
  }
  return initials.toUpperCase();
}
