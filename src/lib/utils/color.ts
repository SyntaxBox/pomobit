export function isHexColor(color: string): boolean {
  // Regular expression to match valid hex color formats
  const hexColorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorRegex.test(color);
}

export type ColorPallet = ReturnType<typeof generateColorPalette>;
export function generateColorPalette(hexColor: string) {
  // Convert hex to RGB and then to HSV
  const hsv = rgbToHsv(hexToRgb(hexColor));

  // Helper function to generate color variations
  const adjustHue = (hueOffset: number, saturation: number, value: number) =>
    rgbToHex(hsvToRgb([(hsv[0] + hueOffset) % 1, saturation, value]));

  return {
    primary1: rgbToHex(hsvToRgb(hsv)),
    primary2: adjustHue(0.1, hsv[1], hsv[2]),
    secondary: adjustHue(0.5, hsv[1], hsv[2]),
    background: adjustHue(0, 0.1, 0.95),
    light1: adjustHue(0, 0.3, 0.9),
    light2: adjustHue(0, 0.5, 0.8),
  } as const;
}

export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function rgbToHsv([r, g, b]: [number, number, number]): [
  number,
  number,
  number,
] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
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

  return [h, max === 0 ? 0 : diff / max, max];
}

export function hsvToRgb([h, s, v]: [number, number, number]): [
  number,
  number,
  number,
] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  const [r, g, b] =
    i % 6 === 0
      ? [v, t, p]
      : i % 6 === 1
        ? [q, v, p]
        : i % 6 === 2
          ? [p, v, t]
          : i % 6 === 3
            ? [p, q, v]
            : i % 6 === 4
              ? [t, p, v]
              : [v, p, q];

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
