import './globals.css';

export const metadata = {
  title: 'The Green Whisk',
  description: 'A warm, modern drink and recipe blog built for thoughtful sips.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#5C3A21] antialiased">{children}</body>
    </html>
  );
}
