"use client"

import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0a0a0a] via-[#0f172a] to-[#003366] text-white pt-12 pb-6 px-6 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {/* Left - Logo + desc */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3">JobITViet</h2>
          <p className="text-gray-300 text-sm max-w-xs">
            A modern IT job search platform connecting candidates with leading
            technology companies.
          </p>
        </div>

        {/* Middle - Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="/job/job-by-skill" className="hover:text-white">Jobs By Skill</a></li>
            <li><a href="/job/job-by-city" className="hover:text-white">Jobs By City</a></li>
            <li><a href="/company/list" className="hover:text-white">Companies</a></li>
          </ul>
        </div>

        {/* Right - Connect */}
        <div>
          <h3 className="text-lg font-bold mb-3">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        Copyright © 2025 JobITViet
      </div>
    </footer>
  )
}
