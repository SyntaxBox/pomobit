export type ColorPallet = ReturnType<typeof generateColorPalette>;
export function generateColorPalette(hexColor: string) {
  // Convert hex to RGB
  const rgb = hexToRgb(hexColor);

  // Convert RGB to HSV
  const hsv = rgbToHsv(rgb);

  // Generate colors
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
