type ClassValue = string | number | boolean | undefined | null | ClassValue[];

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
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
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
