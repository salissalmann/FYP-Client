import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navigation/Navbar'
import RegisterModel from './components/Modals/RegisterModel'

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModel />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
