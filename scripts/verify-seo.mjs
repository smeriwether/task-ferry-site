const baseUrl = new URL(process.argv[2] ?? "http://127.0.0.1:8790/");
const expectedCanonical = "https://taskferry.merimerimeri.com";
const expectedTitle = "TaskFerry — Apple Reminders on Your Work Mac";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function firstMatch(html, pattern, label) {
  const match = html.match(pattern);
  assert(match, `Missing ${label}`);
  return match[1];
}

const pageResponse = await fetch(baseUrl);
assert(pageResponse.ok, `Homepage returned ${pageResponse.status}`);
assert(
  pageResponse.headers.get("content-type")?.includes("text/html"),
  "Homepage did not return HTML"
);

const html = await pageResponse.text();
const title = firstMatch(html, /<title>([^<]+)<\/title>/, "page title");
const description = firstMatch(
  html,
  /<meta name="description" content="([^"]+)"/,
  "meta description"
);
const canonical = firstMatch(
  html,
  /<link rel="canonical" href="([^"]+)"/,
  "canonical URL"
);
const openGraphImage = firstMatch(
  html,
  /<meta property="og:image" content="([^"]+)"/,
  "Open Graph image"
);
const twitterCard = firstMatch(
  html,
  /<meta name="twitter:card" content="([^"]+)"/,
  "Twitter card"
);
const googleBot = firstMatch(
  html,
  /<meta name="googlebot" content="([^"]+)"/,
  "Googlebot directives"
);
const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;

assert(title === expectedTitle, `Unexpected title: ${title}`);
assert(description.length >= 120 && description.length <= 160, "Meta description should be 120–160 characters");
assert(canonical === expectedCanonical, `Unexpected canonical URL: ${canonical}`);
assert(openGraphImage === `${expectedCanonical}/taskferry-social.png`, "Unexpected Open Graph image");
assert(twitterCard === "summary_large_image", "Twitter card is not summary_large_image");
assert(googleBot.includes("max-image-preview:large"), "Googlebot is not allowed large image previews");
assert(h1Count === 1, `Expected one H1, found ${h1Count}`);
assert(/<h1>Apple Reminders\./.test(html), "H1 does not lead with Apple Reminders");
assert(
  /<link rel="icon" href="\/icon-1024\.png" sizes="1024x1024"/.test(html),
  "Missing high-resolution favicon declaration"
);

const jsonLdBlocks = [
  ...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)
].map((match) => JSON.parse(match[1]));
assert(jsonLdBlocks.length > 0, "Missing JSON-LD");

const graph = jsonLdBlocks.flatMap((block) => block["@graph"] ?? [block]);
const typeOf = (entry) => {
  const value = entry["@type"];
  return Array.isArray(value) ? value : [value];
};
const findType = (type) => graph.find((entry) => typeOf(entry).includes(type));

const organization = findType("Organization");
const website = findType("WebSite");
const software = findType("SoftwareApplication");
const faq = findType("FAQPage");

assert(organization, "Missing Organization structured data");
assert(website, "Missing WebSite structured data");
assert(software, "Missing SoftwareApplication structured data");
assert(faq, "Missing FAQPage structured data");
assert(software.softwareVersion === "0.1.5", "Unexpected software version");
assert(software.offers?.price === 0, "Software offer is not marked free");
assert(software.downloadUrl, "Software schema is missing a download URL");
assert(faq.mainEntity?.length === 4, "FAQ schema does not match the four visible questions");

const [robotsResponse, sitemapResponse, socialResponse] = await Promise.all([
  fetch(new URL("/robots.txt", baseUrl)),
  fetch(new URL("/sitemap.xml", baseUrl)),
  fetch(new URL("/taskferry-social.png", baseUrl))
]);

assert(robotsResponse.ok, `robots.txt returned ${robotsResponse.status}`);
assert(sitemapResponse.ok, `sitemap.xml returned ${sitemapResponse.status}`);
assert(socialResponse.ok, `Social image returned ${socialResponse.status}`);
assert(
  sitemapResponse.headers.get("content-type")?.includes("xml"),
  "Sitemap did not return XML"
);
assert(
  socialResponse.headers.get("content-type") === "image/png",
  "Social image did not return image/png"
);

const [robots, sitemap] = await Promise.all([
  robotsResponse.text(),
  sitemapResponse.text()
]);

assert(robots.includes(`Sitemap: ${expectedCanonical}/sitemap.xml`), "robots.txt does not advertise the sitemap");
assert(sitemap.includes(`<loc>${expectedCanonical}</loc>`), "Sitemap does not contain the canonical homepage");
assert(sitemap.includes("<lastmod>2026-07-23</lastmod>"), "Sitemap is missing an accurate lastmod date");

console.log(`SEO verification passed for ${baseUrl}`);
console.log(`Title: ${title}`);
console.log(`Description: ${description.length} characters`);
console.log(`Structured data: ${graph.length} entities`);
