import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
        
        {/* COL 1: Brand & Socials */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#0B1B3D] text-lg">Akamba Hall Library</span>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Empowering Stareheans through access to knowledge, resources and innovation.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center cursor-pointer hover:bg-primary transition"><FaFacebook className="h-4 w-4" /></div>
            <div className="h-8 w-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center cursor-pointer hover:bg-primary transition"><FaTwitter className="h-4 w-4" /></div>
            <div className="h-8 w-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center cursor-pointer hover:bg-primary transition"><FaInstagram className="h-4 w-4" /></div>
            <div className="h-8 w-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center cursor-pointer hover:bg-primary transition"><FaYoutube className="h-4 w-4" /></div>
            <div className="h-8 w-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center cursor-pointer hover:bg-primary transition"><FaLinkedin className="h-4 w-4" /></div>
          </div>
        </div>
        
        {/* COL 2: Explore */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[14px] text-[#0B1B3D]">Explore</h3>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-[13px] text-slate-500 hover:text-primary transition-colors">About the Library</Link>
            <Link href="/services" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Library Services</Link>
            <Link href="/rules" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Rules & Policies</Link>
            <Link href="/faq" className="text-[13px] text-slate-500 hover:text-primary transition-colors">FAQ</Link>
          </div>
        </div>

        {/* COL 3: Resources */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[14px] text-[#0B1B3D]">Resources</h3>
          <div className="flex flex-col gap-3">
            <Link href="/search" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Catalogue Search</Link>
            <Link href="/e-resources" className="text-[13px] text-slate-500 hover:text-primary transition-colors">E-Resources</Link>
            <Link href="/archive" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Newspaper Archive</Link>
            <Link href="/digital" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Digital Library</Link>
          </div>
        </div>

        {/* COL 4: Support */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[14px] text-[#0B1B3D]">Support</h3>
          <div className="flex flex-col gap-3">
            <Link href="/ask" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Ask a Librarian</Link>
            <Link href="/feedback" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Feedback & Suggestions</Link>
            <Link href="/help" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Help Center</Link>
            <Link href="/contact" className="text-[13px] text-slate-500 hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* COL 5: Contact Us */}
        <div className="flex flex-col gap-4 max-w-[200px]">
          <h3 className="font-bold text-[14px] text-[#0B1B3D]">Contact Us</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-[13px] text-slate-500">P.O. Box 44929 - 00100, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-[13px] text-slate-500">+254 711 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-[13px] text-slate-500 break-all">library@stareheboyscentre.org</span>
            </div>
          </div>
        </div>

        {/* COL 6: Library Hours */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[14px] text-[#0B1B3D]">Library Hours</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-4">
              <span className="text-[13px] text-slate-500">Mon - Fri:</span>
              <span className="text-[13px] text-slate-500 text-right">7:30 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[13px] text-slate-500">Saturday:</span>
              <span className="text-[13px] text-slate-500 text-right">8:00 AM - 1:00 PM</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[13px] text-slate-500">Sunday:</span>
              <span className="text-[13px] text-slate-500 text-right">Closed</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Copyright Bar */}
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-slate-400">
          &copy; {new Date().getFullYear()} Starehe Boys&apos; Centre - Akamba Hall Library. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-[12px] text-slate-400">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
          <span>|</span>
          <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}
