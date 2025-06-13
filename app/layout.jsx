import './globals.css'

export const metadata = {
  title: 'React App',
  description: 'React App',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
