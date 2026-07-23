import "./globals.css";

const siteUrl = "https://taskferry.merimerimeri.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "TaskFerry — Apple Reminders, across your Macs",
  description:
    "A private Mac app that carries Apple Reminders between your personal and work Macs. No hosted database. No TaskFerry account.",
  applicationName: "TaskFerry",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" }]
  },
  openGraph: {
    title: "TaskFerry — Your reminders, on the Mac you’re using",
    description:
      "When another Mac—like a work computer—can’t use your personal iCloud, TaskFerry lets you read, add, edit, and complete your Apple Reminders there through a private connection you control.",
    url: siteUrl,
    siteName: "TaskFerry",
    type: "website",
    images: [
      {
        url: "/icon-1024.png",
        width: 1024,
        height: 1024,
        alt: "TaskFerry app icon"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "TaskFerry — Apple Reminders, across your Macs",
    description:
      "A small, private Mac app that ferries Apple Reminders between your personal and work Macs.",
    images: ["/icon-1024.png"]
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
