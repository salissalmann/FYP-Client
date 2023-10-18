import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navigation/Navbar'
import Modal from './components/Modals/Modal'


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
        <Modal
          isOpen title="AirBNB"
        />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
