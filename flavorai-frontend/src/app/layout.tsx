import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlavorAI',
  description: 'Smart recipe discovery platform',
}

const navLinks = [
  { href: '/recipes', label: 'Recipes' },
  { href: '/recipes/new', label: 'Add Recipe' },
  { href: '/profile', label: 'Profile' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-pink-600">FlavorAI</div>
          <div className="space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-pink-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
