import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navigation/Navbar'
import RegisterModel from './components/Modals/RegisterModel'
import LandingPage from './components/LandingPage'
import LoginModal from './components/Modals/LoginModel'
import { getCurrentUser } from './actions/getCurrentUser'


export const metadata: Metadata = {
  title: 'Cloud Fusion',
  description: 'Cloud Fusion',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`{font.className} bg-black`}>
        {children}
      </body>
    </html>
  )
}
