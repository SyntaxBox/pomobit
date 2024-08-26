export function isHexColor(color: string): boolean {
  // Regular expression to match valid hex color formats
  const hexColorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  return hexColorRegex.test(color);
}
