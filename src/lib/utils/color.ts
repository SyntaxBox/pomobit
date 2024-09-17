export type ColorPallet = ReturnType<typeof generateColorPalette>;

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

export interface HsvaColor extends HsvColor {
  a: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HslaColor extends HslColor {
  a: number;
}

export function generateColorPalette(hexColor: string) {
  // Convert hex to RGB
  const rgb = hexToRgb(hexColor);

  // Convert RGB to HSV
  const hsv = rgbToHsv(rgb);

  // Generate colors
  const original = rgbToHex(rgb);
  const primary1 = rgbToHex(hsvToRgb(hsv));
  const primary2 = rgbToHex(hsvToRgb([(hsv[0] + 0.1) % 1, hsv[1], hsv[2]]));
  const secondary = rgbToHex(hsvToRgb([(hsv[0] + 0.5) % 1, hsv[1], hsv[2]]));
  const background = rgbToHex(hsvToRgb([hsv[0], 0.1, 0.95]));
  const background2 = rgbToHex(hsvToRgb([hsv[0], 0.25, 0.85]));
  const light1 = rgbToHex(hsvToRgb([hsv[0], 0.3, 0.9]));
  const light2 = rgbToHex(hsvToRgb([hsv[0], 0.5, 0.8]));

  // Generate text colors
  const text1 = rgbToHex(hsvToRgb([hsv[0], 0.8, 0.2]));
  const text2 = rgbToHex(hsvToRgb([hsv[0], 0.6, 0.4]));

  return {
    original,
    primary1,
    primary2,
    secondary,
    background,
    background2,
    light1,
    light2,
    text1,
    text2,
  } as const;
}

export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export function rgbToHsv(
  rgb: [number, number, number],
): [number, number, number] {
  const [r, g, b] = rgb.map((x) => x / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, v];
}

export function hsvToRgb(
  hsv: [number, number, number],
): [number, number, number] {
  const [h, s, v] = hsv;
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      [r, g, b] = [v, t, p];
      break;
    case 1:
      [r, g, b] = [q, v, p];
      break;
    case 2:
      [r, g, b] = [p, v, t];
      break;
    case 3:
      [r, g, b] = [p, q, v];
      break;
    case 4:
      [r, g, b] = [t, p, v];
      break;
    case 5:
      [r, g, b] = [v, p, q];
      break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHex(rgb: [number, number, number]): string {
  return "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function isHexColor(color: string): boolean {
  // Regular expression to match valid hex color formats
  const hexColorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorRegex.test(color);
}

export function clamp(number: number, min = 0, max = 1) {
  return number > max ? max : number < min ? min : number;
}

export function round(number: number, digits = 0, base = Math.pow(10, digits)) {
  return Math.round(base * number) / base;
}

export const hsvaToHsla = ({ h, s, v, a }: HsvaColor): HslaColor => {
  const hh = ((200 - s) * v) / 100;

  return {
    h: round(h),
    s: round(
      hh > 0 && hh < 200
        ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100
        : 0,
    ),
    l: round(hh / 2),
    a: round(a, 2),
  };
};

export const hsvaToHslString = (hsva: HsvaColor): string => {
  const { h, s, l } = hsvaToHsla(hsva);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export function hexToHsv(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values of r, g, and b
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let delta = max - min;

  // Calculate hue
  let h;
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate saturation
  let s = max === 0 ? 0 : delta / max;
  s = +(s * 100).toFixed(1);

  // Calculate value
  let v = +(max * 100).toFixed(1);

  return { h, s, v };
}

export function hsvToHex(h: number, s: number, v: number) {
  // Convert saturation and value from percentage to fraction
  s /= 100;
  v /= 100;

  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Add m to match the value (v)
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert r, g, b to hex and pad with zeros if necessary
  let rHex = r.toString(16).padStart(2, "0");
  let gHex = g.toString(16).padStart(2, "0");
  let bHex = b.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}

export function generateShades(hexColor: string, numShades: number): string[] {
  // Convert hex to HSV
  const { h } = hexToHsv(hexColor);

  // Calculate step size for saturation and value
  const step = 1 / (numShades - 1);

  // Generate shades
  const shades = [];
  for (let i = 0; i < numShades; i++) {
    // Interpolate saturation from 10% to 100%
    const newS = 10 + 90 * i * step;
    // Interpolate value from 95% (very light) to 20% (very dark)
    const newV = 95 - 75 * i * step;
    // Convert back to hex
    const shade = hsvToHex(h, newS, newV);
    shades.push(shade);
  }

  return shades;
}
