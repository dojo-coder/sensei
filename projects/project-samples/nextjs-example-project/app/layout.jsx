export const metadata = {
  title: "Next.js Items App",
  description: "A minimal Next.js App Router sample listing items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
