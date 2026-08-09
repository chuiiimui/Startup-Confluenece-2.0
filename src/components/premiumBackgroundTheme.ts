/** Decorative layer palettes for PremiumBackground (dark cinematic vs light clay). */

export type Bubble = {
  id: number;
  size: number;
  left: string;
  top: string;
  color: string;
  glow: string;
  depth: number;
  delay: number;
  duration: number;
};

export type NeonShape = {
  id: number;
  left: string;
  top: string;
  w: number;
  h: number;
  kind: 'ring' | 'hex' | 'chip' | 'diamond' | 'cross' | 'triangle';
  rotate?: number;
  border: string;
  glow: string;
  fill?: string;
  depthX: number;
  depthY: number;
};

export type Node = {
  id: number;
  left: string;
  top: string;
  color: string;
  depth: number;
};

export type DataBar = {
  id: number;
  left: string;
  top: string;
  h: number;
  color: string;
  depth: number;
};

export type Stripe = {
  id: number;
  left: string;
  top: string;
  w: number;
  h: number;
  rotate: number;
  color: string;
  glow: string;
  depth: number;
  delay: number;
};

type LayoutBubble = Omit<Bubble, 'color' | 'glow'>;
type LayoutShape = Omit<NeonShape, 'border' | 'glow' | 'fill'>;
type LayoutNode = Omit<Node, 'color'>;
type LayoutBar = Omit<DataBar, 'color'>;
type LayoutStripe = Omit<Stripe, 'color' | 'glow'>;

const BUBBLE_LAYOUT: LayoutBubble[] = [
  { id: 1, size: 18, left: '10%', top: '18%', depth: 50, delay: 0, duration: 7 },
  { id: 2, size: 26, left: '82%', top: '22%', depth: 64, delay: 0.3, duration: 8.5 },
  { id: 3, size: 14, left: '68%', top: '62%', depth: 38, delay: 0.7, duration: 6.2 },
  { id: 4, size: 22, left: '18%', top: '70%', depth: 54, delay: 1, duration: 7.8 },
  { id: 5, size: 12, left: '48%', top: '30%', depth: 76, delay: 0.2, duration: 5.6 },
  { id: 6, size: 16, left: '90%', top: '72%', depth: 42, delay: 1.4, duration: 6.8 },
  { id: 7, size: 10, left: '30%', top: '44%', depth: 68, delay: 0.9, duration: 6 },
  { id: 8, size: 20, left: '74%', top: '40%', depth: 46, delay: 1.2, duration: 7.4 },
  { id: 9, size: 11, left: '58%', top: '78%', depth: 52, delay: 0.5, duration: 6.5 },
  { id: 10, size: 15, left: '4%', top: '52%', depth: 58, delay: 1.6, duration: 7.2 },
];

const SHAPE_LAYOUT: LayoutShape[] = [
  { id: 1, left: '6%', top: '20%', w: 130, h: 130, kind: 'ring', depthX: 24, depthY: 18 },
  { id: 2, left: '87%', top: '52%', w: 96, h: 96, kind: 'chip', rotate: 12, depthX: -20, depthY: 22 },
  { id: 3, left: '54%', top: '10%', w: 84, h: 84, kind: 'ring', depthX: 30, depthY: -16 },
  { id: 4, left: '20%', top: '56%', w: 70, h: 70, kind: 'hex', depthX: 18, depthY: 26 },
  { id: 5, left: '78%', top: '12%', w: 60, h: 60, kind: 'diamond', rotate: 45, depthX: -28, depthY: 14 },
  { id: 6, left: '40%', top: '74%', w: 52, h: 52, kind: 'cross', depthX: 16, depthY: -20 },
  { id: 7, left: '11%', top: '40%', w: 46, h: 46, kind: 'hex', depthX: 32, depthY: 12 },
  { id: 8, left: '63%', top: '46%', w: 108, h: 40, kind: 'chip', rotate: -8, depthX: -14, depthY: 28 },
  { id: 9, left: '32%', top: '12%', w: 54, h: 54, kind: 'triangle', depthX: 20, depthY: 24 },
  { id: 10, left: '92%', top: '34%', w: 44, h: 44, kind: 'hex', depthX: -22, depthY: 16 },
  { id: 11, left: '48%', top: '64%', w: 78, h: 78, kind: 'ring', depthX: 12, depthY: -24 },
  { id: 12, left: '3%', top: '76%', w: 90, h: 34, kind: 'chip', rotate: 6, depthX: 26, depthY: 14 },
];

const NODE_LAYOUT: LayoutNode[] = [
  { id: 1, left: '16%', top: '18%', depth: 28 },
  { id: 2, left: '28%', top: '26%', depth: 34 },
  { id: 3, left: '22%', top: '34%', depth: 30 },
  { id: 4, left: '70%', top: '66%', depth: 26 },
  { id: 5, left: '80%', top: '74%', depth: 32 },
  { id: 6, left: '76%', top: '60%', depth: 36 },
  { id: 7, left: '50%', top: '50%', depth: 40 },
  { id: 8, left: '58%', top: '56%', depth: 24 },
  { id: 9, left: '38%', top: '42%', depth: 44 },
  { id: 10, left: '86%', top: '28%', depth: 30 },
  { id: 11, left: '8%', top: '48%', depth: 38 },
  { id: 12, left: '94%', top: '64%', depth: 28 },
];

const BAR_LAYOUT: LayoutBar[] = [
  { id: 1, left: '43%', top: '20%', h: 28, depth: 12 },
  { id: 2, left: '45%', top: '20%', h: 44, depth: 16 },
  { id: 3, left: '47%', top: '20%', h: 20, depth: 20 },
  { id: 4, left: '49%', top: '20%', h: 36, depth: 24 },
  { id: 5, left: '51%', top: '20%', h: 52, depth: 18 },
  { id: 6, left: '53%', top: '20%', h: 24, depth: 22 },
];

const STRIPE_LAYOUT: LayoutStripe[] = [
  { id: 1, left: '-5%', top: '30%', w: 220, h: 2, rotate: -18, depth: 18, delay: 0 },
  { id: 2, left: '55%', top: '18%', w: 260, h: 2, rotate: 14, depth: 22, delay: 0.4 },
  { id: 3, left: '10%', top: '78%', w: 240, h: 2, rotate: 10, depth: 16, delay: 0.8 },
  { id: 4, left: '60%', top: '70%', w: 200, h: 2, rotate: -22, depth: 20, delay: 1.1 },
  { id: 5, left: '35%', top: '48%', w: 180, h: 1.5, rotate: 32, depth: 26, delay: 0.2 },
  { id: 6, left: '75%', top: '40%', w: 160, h: 1.5, rotate: -8, depth: 14, delay: 0.6 },
  { id: 7, left: '2%', top: '58%', w: 140, h: 2, rotate: 4, depth: 24, delay: 1.4 },
  { id: 8, left: '48%', top: '86%', w: 280, h: 2, rotate: -6, depth: 12, delay: 0.9 },
];

const DARK_BUBBLE_COLORS = [
  { color: '#FF6A3D', glow: '0 0 28px rgba(255,106,61,0.75)' },
  { color: '#A855F7', glow: '0 0 34px rgba(168,85,247,0.7)' },
  { color: '#5EEAD4', glow: '0 0 24px rgba(94,234,212,0.65)' },
  { color: '#FB7185', glow: '0 0 28px rgba(251,113,133,0.65)' },
  { color: '#38BDF8', glow: '0 0 20px rgba(56,189,248,0.65)' },
  { color: '#FF7A00', glow: '0 0 22px rgba(255,122,0,0.7)' },
  { color: '#C084FC', glow: '0 0 18px rgba(192,132,252,0.7)' },
  { color: '#22D3EE', glow: '0 0 26px rgba(34,211,238,0.65)' },
  { color: '#F472B6', glow: '0 0 18px rgba(244,114,182,0.65)' },
  { color: '#67E8F9', glow: '0 0 20px rgba(103,232,249,0.6)' },
];

/** Cyan-forward + deep blue, with orange accents */
const LIGHT_BUBBLE_COLORS = [
  { color: '#06B6D4', glow: '0 0 30px rgba(6,182,212,0.7)' },
  { color: '#063C48', glow: '0 0 34px rgba(6,60,72,0.6)' },
  { color: '#22D3EE', glow: '0 0 26px rgba(34,211,238,0.65)' },
  { color: '#0E7490', glow: '0 0 28px rgba(14,116,144,0.6)' },
  { color: '#0891B2', glow: '0 0 22px rgba(8,145,178,0.6)' },
  { color: '#E57734', glow: '0 0 22px rgba(229,119,52,0.55)' },
  { color: '#155E75', glow: '0 0 20px rgba(21,94,117,0.6)' },
  { color: '#67E8F9', glow: '0 0 26px rgba(103,232,249,0.65)' },
  { color: '#F0A05A', glow: '0 0 18px rgba(240,160,90,0.55)' },
  { color: '#0B5F6A', glow: '0 0 20px rgba(11,95,106,0.6)' },
];

const DARK_SHAPE_STYLE: Omit<NeonShape, keyof LayoutShape>[] = [
  { border: '1.5px solid rgba(232,121,249,0.55)', glow: '0 0 40px rgba(232,121,249,0.3), inset 0 0 28px rgba(168,85,247,0.12)' },
  { border: '1.5px solid rgba(255,122,0,0.55)', glow: '0 0 36px rgba(255,122,0,0.3), inset 0 0 22px rgba(255,106,61,0.12)', fill: 'rgba(255,122,0,0.06)' },
  { border: '1.5px solid rgba(94,234,212,0.55)', glow: '0 0 30px rgba(94,234,212,0.3)' },
  { border: '1.5px solid rgba(56,189,248,0.55)', glow: '0 0 32px rgba(56,189,248,0.3)', fill: 'rgba(56,189,248,0.05)' },
  { border: '1.5px solid rgba(251,113,133,0.55)', glow: '0 0 28px rgba(251,113,133,0.3)', fill: 'rgba(251,113,133,0.06)' },
  { border: '1.5px solid rgba(168,85,247,0.55)', glow: '0 0 26px rgba(168,85,247,0.3)' },
  { border: '1.5px solid rgba(255,154,61,0.55)', glow: '0 0 24px rgba(255,154,61,0.3)', fill: 'rgba(255,122,0,0.05)' },
  { border: '1.5px solid rgba(34,211,238,0.55)', glow: '0 0 30px rgba(34,211,238,0.28)', fill: 'rgba(34,211,238,0.05)' },
  { border: '1.5px solid rgba(192,132,252,0.55)', glow: '0 0 26px rgba(192,132,252,0.3)', fill: 'rgba(168,85,247,0.06)' },
  { border: '1.5px solid rgba(244,114,182,0.55)', glow: '0 0 22px rgba(244,114,182,0.3)', fill: 'rgba(244,114,182,0.05)' },
  { border: '1.5px solid rgba(255,122,0,0.4)', glow: '0 0 28px rgba(255,122,0,0.25)' },
  { border: '1.5px solid rgba(167,139,250,0.5)', glow: '0 0 26px rgba(167,139,250,0.28)', fill: 'rgba(167,139,250,0.05)' },
];

const LIGHT_SHAPE_STYLE: Omit<NeonShape, keyof LayoutShape>[] = [
  { border: '1.5px solid rgba(6,182,212,0.65)', glow: '0 0 40px rgba(6,182,212,0.35), inset 0 0 28px rgba(6,182,212,0.12)' },
  { border: '1.5px solid rgba(6,60,72,0.6)', glow: '0 0 36px rgba(6,60,72,0.32), inset 0 0 22px rgba(6,60,72,0.12)', fill: 'rgba(6,60,72,0.08)' },
  { border: '1.5px solid rgba(34,211,238,0.65)', glow: '0 0 30px rgba(34,211,238,0.35)' },
  { border: '1.5px solid rgba(8,145,178,0.6)', glow: '0 0 32px rgba(8,145,178,0.32)', fill: 'rgba(8,145,178,0.08)' },
  { border: '1.5px solid rgba(14,116,144,0.6)', glow: '0 0 28px rgba(14,116,144,0.3)', fill: 'rgba(14,116,144,0.08)' },
  { border: '1.5px solid rgba(6,182,212,0.55)', glow: '0 0 26px rgba(6,182,212,0.32)' },
  { border: '1.5px solid rgba(229,119,52,0.5)', glow: '0 0 24px rgba(229,119,52,0.28)', fill: 'rgba(229,119,52,0.06)' },
  { border: '1.5px solid rgba(103,232,249,0.6)', glow: '0 0 30px rgba(103,232,249,0.32)', fill: 'rgba(103,232,249,0.08)' },
  { border: '1.5px solid rgba(21,94,117,0.55)', glow: '0 0 26px rgba(21,94,117,0.3)', fill: 'rgba(6,182,212,0.08)' },
  { border: '1.5px solid rgba(6,60,72,0.5)', glow: '0 0 22px rgba(6,60,72,0.28)', fill: 'rgba(6,60,72,0.06)' },
  { border: '1.5px solid rgba(6,182,212,0.5)', glow: '0 0 28px rgba(6,182,212,0.28)' },
  { border: '1.5px solid rgba(8,145,178,0.55)', glow: '0 0 26px rgba(8,145,178,0.28)', fill: 'rgba(186,230,236,0.25)' },
];

const DARK_NODE_COLORS = ['#A855F7', '#38BDF8', '#FF7A00', '#5EEAD4', '#FB7185', '#C084FC', '#22D3EE', '#FF9A3D', '#67E8F9', '#F472B6', '#A78BFA', '#FB923C'];
const LIGHT_NODE_COLORS = ['#06B6D4', '#063C48', '#22D3EE', '#0E7490', '#0891B2', '#155E75', '#67E8F9', '#E57734', '#0B5F6A', '#06B6D4', '#063C48', '#F0A05A'];

const DARK_BAR_COLORS = [
  'rgba(168,85,247,0.75)',
  'rgba(255,122,0,0.75)',
  'rgba(56,189,248,0.75)',
  'rgba(94,234,212,0.75)',
  'rgba(251,113,133,0.7)',
  'rgba(192,132,252,0.7)',
];
const LIGHT_BAR_COLORS = [
  'rgba(6,182,212,0.85)',
  'rgba(6,60,72,0.8)',
  'rgba(34,211,238,0.85)',
  'rgba(8,145,178,0.8)',
  'rgba(14,116,144,0.75)',
  'rgba(229,119,52,0.65)',
];

const DARK_STRIPE_STYLE = [
  { color: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.85), transparent)', glow: '0 0 16px rgba(168,85,247,0.55)' },
  { color: 'linear-gradient(90deg, transparent, rgba(255,122,0,0.85), transparent)', glow: '0 0 16px rgba(255,122,0,0.5)' },
  { color: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)', glow: '0 0 14px rgba(34,211,238,0.5)' },
  { color: 'linear-gradient(90deg, transparent, rgba(251,113,133,0.8), transparent)', glow: '0 0 14px rgba(251,113,133,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(94,234,212,0.75), transparent)', glow: '0 0 12px rgba(94,234,212,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.8), transparent)', glow: '0 0 12px rgba(192,132,252,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)', glow: '0 0 12px rgba(56,189,248,0.4)' },
  { color: 'linear-gradient(90deg, transparent, rgba(255,154,61,0.75), transparent)', glow: '0 0 14px rgba(255,154,61,0.45)' },
];

const LIGHT_STRIPE_STYLE = [
  { color: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.9), transparent)', glow: '0 0 16px rgba(6,182,212,0.55)' },
  { color: 'linear-gradient(90deg, transparent, rgba(6,60,72,0.85), transparent)', glow: '0 0 16px rgba(6,60,72,0.5)' },
  { color: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.85), transparent)', glow: '0 0 14px rgba(34,211,238,0.5)' },
  { color: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.8), transparent)', glow: '0 0 14px rgba(8,145,178,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(14,116,144,0.8), transparent)', glow: '0 0 12px rgba(14,116,144,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(103,232,249,0.8), transparent)', glow: '0 0 12px rgba(103,232,249,0.45)' },
  { color: 'linear-gradient(90deg, transparent, rgba(21,94,117,0.75), transparent)', glow: '0 0 12px rgba(21,94,117,0.4)' },
  { color: 'linear-gradient(90deg, transparent, rgba(229,119,52,0.7), transparent)', glow: '0 0 14px rgba(229,119,52,0.4)' },
];

export function getBackgroundDecor(isLight: boolean) {
  const bubbleColors = isLight ? LIGHT_BUBBLE_COLORS : DARK_BUBBLE_COLORS;
  const shapeStyles = isLight ? LIGHT_SHAPE_STYLE : DARK_SHAPE_STYLE;
  const nodeColors = isLight ? LIGHT_NODE_COLORS : DARK_NODE_COLORS;
  const barColors = isLight ? LIGHT_BAR_COLORS : DARK_BAR_COLORS;
  const stripeStyles = isLight ? LIGHT_STRIPE_STYLE : DARK_STRIPE_STYLE;

  return {
    bubbles: BUBBLE_LAYOUT.map((b, i) => ({ ...b, ...bubbleColors[i] })),
    shapes: SHAPE_LAYOUT.map((s, i) => ({ ...s, ...shapeStyles[i] })),
    nodes: NODE_LAYOUT.map((n, i) => ({ ...n, color: nodeColors[i] })),
    bars: BAR_LAYOUT.map((b, i) => ({ ...b, color: barColors[i] })),
    stripes: STRIPE_LAYOUT.map((s, i) => ({ ...s, ...stripeStyles[i] })),
  };
}
