import "./globals.css";

export const metadata = {
  title: "DDL",
  description: "DADALU",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
      >
        {children}
      </body>
    </html>
  );
}
