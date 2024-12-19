import "./globals.css";
import Providers from "./components/Providers";
import Fonts from "./Fonts";
import Footer from "./components/Footer";
import MadeBySharpener from "./components/MadeBySharpener";
import JoinUs from "./components/JoinUs";
import AuthSession from "./components/AuthSession";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSession>
      <html lang="en">
        <head>
          <title>Point</title>
          <meta name="description" content="Design resources curated by Sharpener Design Studio" />
          <link rel="icon" href="/favicon.ico"/>
        </head>
        <body>
          <Providers>
            <Fonts />
            {children}
            
          </Providers>
        </body>
      </html>
    </AuthSession>
  );
}
