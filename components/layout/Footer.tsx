import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="w-full bg-[#0B1A3B] text-white">
      <div className="container mx-auto px-5 md:px-4 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-10 sm:h-14 sm:w-11 shrink-0">
                <Image
                  src="/images/starehe-logo.png"
                  alt="Starehe Boys' Centre Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-[14px] sm:text-[15px] text-white leading-tight">
                Akamba Hall Library
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] text-white/50 leading-relaxed">
              Providing Starehians with access to quality knowledge, curated collections, and well-designed learning spaces for self-improvement.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { Icon: FaFacebook, label: 'Facebook' },
                { Icon: FaTwitter, label: 'Twitter' },
                { Icon: FaInstagram, label: 'Instagram' },
                { Icon: FaYoutube, label: 'YouTube' },
                { Icon: FaLinkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-8 w-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-[family-name:var(--font-inter)] font-medium text-[13px] sm:text-[14px] text-white uppercase tracking-wider">
              About Us
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {[
                { label: 'About the Library', href: '/about' },
                { label: 'Mission & Purpose', href: '/about#mission' },
                { label: 'Who We Serve', href: '/about#who-we-serve' },
                { label: 'Our Values', href: '/about#values' },
                { label: 'Library Leadership', href: '/about#leadership' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] sm:text-[13px] text-white/45 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Collections */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-[family-name:var(--font-inter)] font-medium text-[13px] sm:text-[14px] text-white uppercase tracking-wider">
              Collections
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {[
                { label: 'Catalogue Search', href: '/search' },
                { label: 'Physical Collections', href: '/resources#physical' },
                { label: 'Digital Resources', href: '/resources#digital' },
                { label: 'New Arrivals', href: '/news#arrivals' },
                { label: 'Suggested Reading', href: '/resources#suggested' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] sm:text-[13px] text-white/45 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Services */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-[family-name:var(--font-inter)] font-medium text-[13px] sm:text-[14px] text-white uppercase tracking-wider">
              Services
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {[
                { label: 'Library Services', href: '/services' },
                { label: 'Study Spaces', href: '/services#bookings' },
                { label: 'Equipment Lending', href: '/services#equipment' },
                { label: 'Research Support', href: '/resources#study-help' },
                { label: 'Ask a Librarian', href: '/contact#help-desk' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] sm:text-[13px] text-white/45 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 5: Community */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-[family-name:var(--font-inter)] font-medium text-[13px] sm:text-[14px] text-white uppercase tracking-wider">
              Community
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {[
                { label: 'Events Calendar', href: '/news#events' },
                { label: 'News & Updates', href: '/news' },
                { label: 'Reading Campaigns', href: '/news#campaigns' },
                { label: 'Library Notices', href: '/news#notices' },
                { label: 'Feedback', href: '/contact#feedback' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] sm:text-[13px] text-white/45 hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 6: Contact Us */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="font-[family-name:var(--font-inter)] font-medium text-[13px] sm:text-[14px] text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-white/30 shrink-0 mt-0.5" />
                <span className="text-[12px] sm:text-[13px] text-white/45 leading-relaxed">
                  P.O. Box 30178 – 00100,<br />
                  General Waruinge Street<br />
                  Nairobi, Kenya
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-white/30 shrink-0" />
                <span className="text-[12px] sm:text-[13px] text-white/45">
                  +254 727 531 001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-white/30 shrink-0" />
                <span className="text-[12px] sm:text-[13px] text-white/45 break-all">
                  info@stareheboyscentre.ac.ke
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Library Hours — stacked on mobile */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3">
            <Clock className="h-4 w-4 text-gold shrink-0" />
            <span className="text-[11px] sm:text-[13px] font-medium text-gold uppercase tracking-widest">Library Hours</span>
            <div className="h-4 w-px bg-gold/30 hidden sm:block" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-[13px] text-white/60 font-medium">Mon – Fri</span>
              <span className="text-[11px] sm:text-[13px] font-medium text-gold">7:30 AM – 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-[13px] text-white/60 font-medium">Saturday</span>
              <span className="text-[11px] sm:text-[13px] font-medium text-gold">8:00 AM – 1:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-[13px] text-white/60 font-medium">Sunday</span>
              <span className="text-[11px] sm:text-[13px] font-medium text-gold">Closed</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="text-[11px] sm:text-[13px] text-white/30">
            &copy; 2026 Starehe Boys&apos; Centre – Akamba Hall Library. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-[13px] text-white/30">
            <Link href="/" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/" className="hover:text-gold transition-colors">
              Terms of Use
            </Link>
            <span className="hidden sm:inline">|</span>
            <p className="text-[11px] sm:text-[13px] text-gold/70">
              Designed by <span className="font-medium text-gold hover:text-gold-hover transition-colors cursor-pointer">Vessora Consulting Agency</span>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
