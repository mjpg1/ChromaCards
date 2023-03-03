// Formulas adapted from EasyRGB

// convert hex to rgb
const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
};

// convert standard rgb to xyz color space with D65/2° standard illuminant
const rgb2xyz = (rgb) => {
  const { r, g, b } = rgb;

  let var_R = r / 255;
  let var_G = g / 255;
  let var_B = b / 255;

  if (var_R > 0.04045) var_R = ((var_R + 0.055) / 1.055) ** 2.4;
  else var_R = var_R / 12.92;
  if (var_G > 0.04045) var_G = ((var_G + 0.055) / 1.055) ** 2.4;
  else var_G = var_G / 12.92;
  if (var_B > 0.04045) var_B = ((var_B + 0.055) / 1.055) ** 2.4;
  else var_B = var_B / 12.92;

  var_R = var_R * 100;
  var_G = var_G * 100;
  var_B = var_B * 100;

  const X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
  const Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
  const Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;

  return { X, Y, Z };
};

// convert xyz to L*a*b* color space with D65/2° standard illuminant
const xyz2lab = (xyz) => {
  const { X, Y, Z } = xyz;

  let var_X = X / 95.047;
  let var_Y = Y / 100.0;
  let var_Z = Z / 108.883;

  if (var_X > 0.008856) var_X = var_X ** (1 / 3);
  else var_X = 7.787 * var_X + 16 / 116;
  if (var_Y > 0.008856) var_Y = var_Y ** (1 / 3);
  else var_Y = 7.787 * var_Y + 16 / 116;
  if (var_Z > 0.008856) var_Z = var_Z ** (1 / 3);
  else var_Z = 7.787 * var_Z + 16 / 116;

  const L = 116 * var_Y - 16;
  const a = 500 * (var_X - var_Y);
  const b = 200 * (var_Y - var_Z);

  return { L, a, b };
};

// calculate delta E difference between two L*a*b* colors
const deltaE = (lab1, lab2) => {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;

  return Math.sqrt((L1 - L2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
};

// calculate delta E difference between two hex colors
const hex2deltaE = (hex1, hex2) => {
  return deltaE(
    xyz2lab(rgb2xyz(hex2rgb(hex1))),
    xyz2lab(rgb2xyz(hex2rgb(hex2)))
  );
};

export default hex2deltaE;
