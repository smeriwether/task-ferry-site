import sharp from "sharp";

const width = 1200;
const height = 630;
const iconSize = 330;

const icon = await sharp("public/icon-1024.png")
  .resize(iconSize, iconSize)
  .png()
  .toBuffer();

const artwork = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1768d2"/>
        <stop offset="1" stop-color="#073b81"/>
      </linearGradient>
      <linearGradient id="sunset" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff9585"/>
        <stop offset="1" stop-color="#f45c4d"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" rx="0" fill="#fffaf0"/>
    <circle cx="1080" cy="68" r="220" fill="#14bfd0" opacity=".12"/>
    <circle cx="1020" cy="568" r="270" fill="url(#sunset)" opacity=".13"/>
    <path d="M0 560 C210 505 345 618 585 552 C755 505 905 560 1200 502 L1200 630 L0 630 Z" fill="#14bfd0" opacity=".10"/>
    <rect x="64" y="56" width="190" height="42" rx="21" fill="#ffffff" stroke="#d9e4ed"/>
    <circle cx="88" cy="77" r="7" fill="#14bfd0"/>
    <text x="106" y="84" fill="#073b81" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">TASKFERRY</text>
    <text x="64" y="205" fill="#032554" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" letter-spacing="-3">
      <tspan x="64" dy="0">Apple Reminders</tspan>
      <tspan x="64" dy="82">on your work Mac.</tspan>
    </text>
    <text x="68" y="410" fill="#5d6b7e" font-family="Arial, Helvetica, sans-serif" font-size="29" font-weight="500">
      Private. Free. No personal iCloud login required.
    </text>
    <rect x="64" y="474" width="415" height="62" rx="31" fill="url(#sea)"/>
    <text x="98" y="514" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">
      macOS 14+  •  Signed &amp; notarized
    </text>
    <rect x="794" y="136" width="350" height="350" rx="86" fill="#ffffff" opacity=".72"/>
  </svg>
`);

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#fffaf0"
  }
})
  .composite([
    { input: artwork, top: 0, left: 0 },
    { input: icon, top: 146, left: 804 }
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile("public/taskferry-social.png");

console.log("Generated public/taskferry-social.png (1200×630)");
