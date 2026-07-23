import "./globals.css";

const siteUrl = "https://taskferry.merimerimeri.com";
const title = "TaskFerry — Apple Reminders on Your Work Mac";
const description =
  "Use Apple Reminders on a work Mac that can’t sign in to your personal iCloud. TaskFerry is a free, private macOS bridge with no hosted task database.";
const socialImage = "/taskferry-social.png";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "TaskFerry",
  authors: [
    {
      name: "MeriMeriMeri Software LLC",
      url: "https://merimerimeri.com/"
    }
  ],
  creator: "MeriMeriMeri Software LLC",
  publisher: "MeriMeriMeri Software LLC",
  category: "technology",
  alternates: {
    canonical: siteUrl
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" }
    ],
    apple: [{ url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "TaskFerry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "TaskFerry brings Apple Reminders to a work Mac"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073b81"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
