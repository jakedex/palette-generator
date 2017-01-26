function hexToRbg(hex) {
  var rgb = [];
  var fail = false;

  hex = (hex[0] === '#') ? hex.substr(1) : hex;

  // first, convert to RGB
  for (var i = 0; i < 6; i += 2) {
    rgb.push(parseInt(hex.substr(i, 2), 16));
    fail = fail || rgb[rgb.length - 1].toString() === 'NaN';
  }

  // if(fail) {
  //   // TODO
  // }

  return rgb;
}

function rgbToHex(rgb){
 return "#" +
  ("0" + rgb[0].toString(16)).slice(-2) +
  ("0" + rgb[1].toString(16)).slice(-2) +
  ("0" + rgb[2].toString(16)).slice(-2);
}

function hslToRgb(hsl){
    var r, g, b;
    var h = hsl[0] * (1 / 100),
        s = hsl[1] * (1 / 100),
        l = hsl[2] * (1 / 100);

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

// RGB -> hsl (https://codepen.io/pankajparashar/pen/oFzIg)
function rgbToHsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255;

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);

  var h, s, l = (max + min)/2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [
    (h * 100 + 0.5) | 0,
    ((s * 100 + 0.5) | 0),
    ((l * 100 + 0.5) | 0)
  ];
}

function triad(hsl) {
  var h = hsl[0];
  return [
    hsl,
    [(h + 120) % 360, hsl[1], hsl[2]],
    [(h + 240) % 360, hsl[1], hsl[2]],
  ];
}

function generatePalette(rule, hex) {
  var hsl = rgbToHsl(hexToRbg(hex));

  var result = triad(hsl).map(function(color) {
    return hslToRgb(color);
  });

  return result;
};
