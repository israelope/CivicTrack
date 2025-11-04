'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-[1000]">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Main flex container.
          - 'justify-between' pushes the left and right items to the edges.
          - 'relative' allows the mobile logo to be centered absolutely.
        */}
        <div className="flex justify-between items-center h-16 relative">

          {/* --- LEFT ITEM (Logo + Text) --- */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            {/* Logo Image (Desktop-Only) */}
            <Image
              src="/logo.png" // Your logo path
              alt="CivicTrack Logo"
              width={32}
              height={32}
              priority
              // --- HIDE on mobile, SHOW on desktop ---
              className="h-8 w-auto hidden md:block"
            />
            {/* Text (Always Visible) */}
            <span className="text-2xl font-bold text-blue-600">
              CivicTrack
            </span>
          </Link>

          {/* --- CENTER ITEM (Mobile-Only Logo) --- */}
          {/* This is centered absolutely and hidden on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.png" // Your logo path
                alt="CivicTrack Logo"
                width={32}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* --- RIGHT ITEMS (Desktop Links or Mobile Button) --- */}
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Report Issue
            </Link>
            <Link href="/map" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Live Map
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          {/* This is NOT absolute, so it's pushed to the right by justify-between */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Corrected) */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Report Issue
            </Link>
            <Link
              href="/map"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Live Map
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}