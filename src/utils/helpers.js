export function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

export const colorToRGBA = (color, opacity) => {
  const tempElem = document.createElement("div");
  tempElem.style.color = color;
  document.body.appendChild(tempElem);
  const computedColor = window.getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);
  const matches = computedColor.match(/rgba?\((\d+), (\d+), (\d+)(, [\d.]+)?\)/);
  if (matches) {
    const [_, r, g, b] = matches;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

export const colorToHex = (color, opacity) => {
  const tempElem = document.createElement("div");
  tempElem.style.color = color;
  document.body.appendChild(tempElem);
  const computedColor = window.getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);

  const matches = computedColor.match(/rgba?\((\d+), (\d+), (\d+)(, [\d.]+)?\)/);
  if (matches) {
    const [_, r, g, b] = matches;
    const hex = (num) => {
      const hexStr = parseInt(num).toString(16);
      return hexStr.length === 1 ? '0' + hexStr : hexStr;
    };

    const rgbaToHex = (r, g, b, a = 1) => {
      const alpha = Math.round(a * 255).toString(16).padStart(2, '0').toUpperCase();
      return `#${hex(r)}${hex(g)}${hex(b)}${alpha}`;
    };

    return rgbaToHex(r, g, b, opacity);
  }

  return color;
};