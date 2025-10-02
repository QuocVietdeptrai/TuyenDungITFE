"use client"

import Link from "next/link"
import { FaBars } from "react-icons/fa6"
import { HeaderMenu } from "./HeaderMenu"
import { useState } from "react"
import { HeaderAccount } from "./HeaderAccount"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] py-[15px] px-[16px]">
        <div className="container mx-auto">
          {/* Wrap */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-white font-extrabold sm:text-[28px] text-[20px] lg:flex-none flex-1"
            >
              JobITViet
            </Link>

            {/* Menu */}
            <HeaderMenu showMenu={showMenu} />

            {/* Account + Language */}
            <div className="flex items-center gap-4">
              <HeaderAccount />
            </div>

            {/* Button Menu Mobile */}
            <button
              onClick={handleShowMenu}
              className="text-white text-[20px] lg:hidden inline-block ml-[12px]"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
