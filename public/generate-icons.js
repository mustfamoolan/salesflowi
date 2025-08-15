const fs = require('fs');
const path = require('path');

// إنشاء أيقونات PWA بسيطة باستخدام SVG
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

function createIconSVG(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06B6D4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" ry="${size * 0.15}" fill="url(#gradient)"/>
  <text x="${size / 2}" y="${size * 0.6}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white">$</text>
  <circle cx="${size * 0.25}" cy="${size * 0.75}" r="${size * 0.02}" fill="white" opacity="0.8"/>
  <circle cx="${size * 0.5}" cy="${size * 0.75}" r="${size * 0.02}" fill="white" opacity="0.6"/>
  <circle cx="${size * 0.75}" cy="${size * 0.75}" r="${size * 0.02}" fill="white" opacity="0.4"/>
</svg>`;
}

// إنشاء الأيقونات
iconSizes.forEach(size => {
    const svgContent = createIconSVG(size);
    const filename = `icon-${size}x${size}.svg`;
    const filePath = path.join(__dirname, 'images', filename);

    fs.writeFileSync(filePath, svgContent);
    console.log(`Created: ${filename}`);
});

console.log('✅ All PWA icons created successfully!');
