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