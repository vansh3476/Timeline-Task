import './globals.css'
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400',  '700'],
  variable: '--font-lato',
});

export const metadata = {
  title: 'React App',
  description: 'React App',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body>{children}</body>
    </html>
  )
}
