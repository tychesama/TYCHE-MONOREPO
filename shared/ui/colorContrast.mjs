/**
 * Pick the higher-contrast black or white foreground for a six-digit hex color.
 * Invalid values fall back to white so callers remain readable on dark surfaces.
 *
 * @param {string} hexColor
 * @returns {"#000000" | "#FFFFFF"}
 */
export function getReadableTextColor(hexColor) {
  const normalized = hexColor.trim().replace(/^#/, "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return "#FFFFFF";
  }

  const channels = [0, 2, 4].map((offset) => {
    const value = Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  const luminance =
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  const blackContrast = (luminance + 0.05) / 0.05;
  const whiteContrast = 1.05 / (luminance + 0.05);

  return blackContrast >= whiteContrast ? "#000000" : "#FFFFFF";
}
