import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "LifeAssist AI",
  description: "AI-powered healthcare guidance assistant"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
