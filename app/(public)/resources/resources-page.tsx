'use client'

import { Search, BookOpen, Globe, Lightbulb, Wrench, BookMarked, Star, ArrowRight, Filter, Eye, CheckCircle2, Download, Wifi, FileText, Library, BookPlus } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerChildren, StaggerItem, ScaleOnHover } from '@/components/motion'
import { AiCitationGenerator } from '@/components/ai/ai-citation-generator'
import { AiResearchAssistant } from '@/components/ai/ai-research-assistant'
import { AiStudyPlan } from '@/components/ai/ai-study-plan'
import { AiReadingList } from '@/components/ai/ai-reading-list'
import { AiFeatureBanner } from '@/components/ai/ai-feature-banner'

const featuredBooks = [
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology', desc: 'A groundbreaking exploration of the two systems that drive the way we think — System 1 fast and intuitive, System 2 slow and deliberate. Essential for understanding decision-making.' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', desc: 'A bold narrative of humanity\'s creation and evolution that explores how biology and history have defined us and enhanced our understanding of what it means to be human.' },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self Development', desc: 'Practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results. Applicable to study and personal growth.' },
  { title: 'Deep Work', author: 'Cal Newport', category: 'Productivity', desc: 'Rules for focused success in a distracted world. Cal Newport makes a compelling case that the ability to focus without distraction is becoming increasingly rare and increasingly valuable.' },
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', desc: 'A handbook of agile software craftsmanship. Even if you are not a programmer, the principles of clarity, simplicity, and structure apply to any form of technical writing or problem-solving.' },
  { title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', desc: 'How today\'s entrepreneurs use continuous innovation to create radically successful businesses. Introduces the build-measure-learn feedback loop that applies far beyond business.' },
]

const catalogueSteps = [
  { step: 1, title: 'Enter Your Search', desc: 'Type a title, author, subject, or keyword into the catalogue search bar. The system searches across all materials — books, journals, past papers, and digital resources.', icon: Search },
  { step: 2, title: 'Filter Results', desc: 'Narrow results by category, availability, format, or location. See which items are on the shelf, borrowed, or on hold. Filter by subject to find curriculum-aligned materials.', icon: Filter },
  { step: 3, title: 'Check Availability', desc: 'Each result shows real-time status — on shelf, checked out, on hold, or in processing. See the shelf location and call number to find the physical item quickly.', icon: Eye },
  { step: 4, title: 'Reserve or Borrow', desc: 'Place a hold on unavailable items or go directly to the shelf for available ones. Reserve study spaces alongside your book search for a complete study planning session.', icon: CheckCircle2 },
]

export default function ResourcesPageClient() {
  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <FadeIn>
        <section className="bg-[#0B1A3B] py-20 px-4 pb-20">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-[13px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Library className="h-3 w-3" aria-hidden="true" />
              Knowledge &amp; Discovery
            </span>
            <h1 className="text-[40px] md:text-[52px] font-medium text-white mt-5 leading-tight tracking-tight">
              Resources
            </h1>
            <p className="text-[16px] md:text-[17px] text-white/50 mt-5 max-w-2xl mx-auto leading-relaxed">
              Find books, access digital materials, get study help, and discover what the library has to offer — before you even log in. Our collection spans physical books, e-resources, past papers, and curated study guides.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Separator */}
      <div className="mx-4 h-px bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 sm:mx-6 lg:mx-8" />

      {/* Quick anchor nav - mini navbar */}
      <div className="sticky top-[80px] z-40 w-full border-b border-[#E4E7EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {['#catalogue', '#physical', '#digital', '#study-help', '#suggested'].map((id) => (
              <a key={id} href={id} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#E4E7EE] bg-[#F5F6FA] text-[12px] sm:text-[13px] font-medium text-[#5B6376] hover:bg-gold hover:text-navy hover:border-gold transition-all capitalize shrink-0">
                {id.replace('#', '').replace('-', ' ')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Catalogue Search */}
      <FadeIn>
        <section id="catalogue" className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                Start Here
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">
              Catalogue Search
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-6">
              The catalogue is the quickest way to find what you need. It searches across the entire library collection — physical books, digital resources, past papers, and reference materials. Results show availability in real time.
            </p>

            {/* Step-by-step */}
            <div className="mb-12">
              <h3 className="text-[18px] font-medium text-[#101828] mb-6">How to Search</h3>
              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {catalogueSteps.map((s, j) => (
                  <StaggerItem key={j}>
                    <ScaleOnHover>
                      <div className="relative bg-[#F5F6FA] border border-[#E4E7EE] rounded-[16px] p-6 flex flex-col items-center text-center gap-3">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-gold text-navy text-[13px] font-medium flex items-center justify-center shadow-sm">
                          {s.step}
                        </div>
                        <div className="h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mt-2">
                          <s.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h4 className="text-[15px] font-medium text-[#101828]">{s.title}</h4>
                        <p className="text-[14px] text-[#5B6376] leading-relaxed">{s.desc}</p>
                      </div>
                    </ScaleOnHover>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>

            <Link href="/search" className="inline-flex items-center gap-2 mt-4 text-[15px] font-medium text-gold hover:underline">
              <Search className="h-4 w-4" aria-hidden="true" />
              Open Catalogue Search
            </Link>

            {/* What you can search */}
            <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-8 mt-12">
              <h3 className="text-[18px] font-medium text-[#101828] mb-5">What You Can Search</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {[
                  'Book titles and authors — find any book in the collection by name or writer',
                  'Subjects and topics — browse by academic subject or area of interest',
                  'ISBN and call numbers — locate specific editions using unique identifiers',
                  'Availability and shelf status — see what is on the shelf right now',
                  'New arrivals and featured items — discover the latest additions to the collection',
                  'Past papers and revision guides — access exam preparation materials by subject and year',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-2 h-2 rounded-full bg-gold mt-2" aria-hidden="true" />
                    <span className="text-[15px] text-[#5B6376] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Physical Collections */}
      <FadeIn>
        <section id="physical" className="py-24 px-4 bg-[#F5F6FA]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                On the Shelves
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Physical Collections</h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              The library holds over 8,400 physical items across multiple categories. Collections are organized by subject and format, with clear signage and call numbers to help you find what you need quickly. The collection is reviewed annually to remove outdated materials and add new acquisitions.
            </p>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: 'Textbooks', desc: 'Core curriculum materials across all subjects and form levels, aligned with the Kenya National Curriculum. Updated each year to reflect syllabus changes. Textbooks are available for in-library use and short-term loan during exam periods.', count: '3,200+' },
                { icon: BookMarked, title: 'Reference Books', desc: 'Dictionaries, encyclopedias, atlases, and handbooks for research and academic writing. These items stay in the library and cannot be borrowed — they are for consultation only. Includes both English and Kiswahili reference works.', count: '1,100+' },
                { icon: Star, title: 'Fiction & Literature', desc: 'Novels, short stories, and literary works — from African literature to world classics. The collection includes award-winning authors from Kenya, Nigeria, South Africa, and beyond. Updated with new releases each term.', count: '2,400+' },
                { icon: FileText, title: 'Journals & Periodicals', desc: 'Academic journals, magazines, and newsletters covering science, humanities, and current affairs. Subscriptions include both Kenyan and international publications. Back issues are archived for reference.', count: '15+' },
                { icon: Globe, title: 'Newspapers', desc: 'Daily and weekly newspapers for current affairs reading — available in the reading hall only. Includes the Daily Nation, The Standard, The East African, and The Economist. A 30-day archive is maintained.', count: 'Daily' },
                { icon: Lightbulb, title: 'Past Papers', desc: 'Collection of past examination papers and revision guides for KCSE and internal exams. Organized by subject and year. Students can borrow past papers for up to 7 days during revision periods.', count: '600+' },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-4 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="text-[13px] font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">{item.count}</span>
                      </div>
                      <h3 className="text-[17px] font-medium text-[#101828]">{item.title}</h3>
                      <p className="text-[15px] text-[#5B6376] leading-relaxed">{item.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      </FadeIn>

      {/* Digital Resources */}
      <FadeIn>
        <section id="digital" className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                Online Access
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">
              Digital Resources
            </h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              Access e-books, online reading materials, and curated digital links from any device. Digital resources are available 24/7 through the member portal — no need to visit the library physically. All you need is your login credentials and an internet connection.
            </p>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'E-Books & PDFs', desc: 'Downloadable reading materials across academic subjects and general interest. The collection includes textbooks, study guides, and reference works in PDF format. Access is granted through the member portal with automatic expiration after the loan period.', icon: Download, count: '350+' },
                { label: 'Online Databases', desc: 'Access to academic databases for research papers and journals. Includes JSTOR for humanities and social sciences, and curated open-access repositories for science and technology. Off-campus access is available through the portal.', icon: Wifi, count: '5 databases' },
                { label: 'Learning Links', desc: 'Curated links to educational platforms, open courses, and study tools recommended by library staff. Includes Khan Academy, Coursera, MIT OpenCourseWare, and Kenya-specific educational platforms. Links are reviewed and updated monthly.', icon: Globe, count: '120+ links' },
                { label: 'Internal Resources', desc: 'School-specific materials — syllabus guides, reading lists, and departmental resources uploaded by teachers. These materials are only accessible to Starehe students and staff. Updated each term by the academic departments.', icon: BookMarked, count: '200+ files' },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex gap-5 hover:shadow-md transition-shadow">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[17px] font-medium text-[#101828]">{item.label}</h3>
                          <span className="text-[13px] font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">{item.count}</span>
                        </div>
                        <p className="text-[15px] text-[#5B6376] leading-relaxed mt-2">{item.desc}</p>
                      </div>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      </FadeIn>

      {/* Study Help */}
      <FadeIn>
        <section id="study-help" className="py-24 px-4 bg-[#F5F6FA]">
          <div className="container mx-auto max-w-5xl">
            <AiFeatureBanner
              title="AI Citation Generator"
              description="Format references in APA, MLA, Chicago, Harvard, or Vancouver — powered by AI. Just enter the details below."
              feature="AI Tool"
              pageKey="resources-citation"
            />
            <div className="flex items-center gap-3 mb-4 mt-8">
              <span className="inline-flex items-center gap-2 bg-white/80 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                Learn How
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Study Help</h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              The library teaches you how to use materials effectively. These guides cover everything from finding a book to writing a research paper. Each guide is written by library staff and reviewed by teachers.
            </p>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Using the Catalogue', text: 'A step-by-step guide to searching, filtering, and locating items in the library system. Learn how to check availability, place holds, track your searches, and use advanced search filters to find exactly what you need. Includes screenshots and tips for common search scenarios.', icon: Search },
                { title: 'Research Tips', text: 'How to start a research project, find credible sources, evaluate information, and structure your findings for school assignments. Covers the difference between primary and secondary sources, how to assess source credibility, and how to organize your research notes effectively.', icon: Lightbulb },
                { title: 'Citation Guides', text: 'APA, MLA, and other citation formats explained with examples. Know how to reference books, journals, websites, and digital resources correctly. Includes a quick-reference card you can keep at your desk and an online citation generator available through the portal.', icon: FileText },
                { title: 'Reading Strategies', text: 'Techniques for effective reading, skimming, scanning, critical reading, and note taking. Get more out of every book you pick up. Includes a reading log template you can download from the portal to track your progress and reflect on what you have read.', icon: BookOpen },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="bg-white border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-[17px] font-medium text-[#101828]">{item.title}</h3>
                      </div>
                      <p className="text-[15px] text-[#5B6376] leading-relaxed">{item.text}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <AiCitationGenerator />
              <AiResearchAssistant />
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <AiStudyPlan />
              <AiReadingList />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Suggested Reading */}
      <FadeIn>
        <section id="suggested" className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] text-[13px] font-medium uppercase tracking-widest px-4 py-2 rounded-full">
                <BookPlus className="h-3.5 w-3.5" aria-hidden="true" />
                Start Reading
              </span>
            </div>
            <h2 className="text-[30px] md:text-[36px] font-medium text-[#101828] mt-6 mb-3">Suggested Reading</h2>
            <p className="text-[16px] text-[#5B6376] max-w-3xl leading-relaxed mb-12">
              Staff picks and new arrivals worth your time. These books are selected by library staff and teachers based on relevance to the curriculum, popularity with students, and academic value. Each recommendation includes a brief description to help you decide.
            </p>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="bg-[#F5F6FA] border border-[#E4E7EE] rounded-[20px] p-7 flex flex-col gap-3 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                      <span className="text-[13px] font-medium text-gold uppercase tracking-wider">{book.category}</span>
                      <h3 className="text-[17px] font-medium text-[#101828]">{book.title}</h3>
                      <p className="text-[13px] text-[#5B6376]">{book.author}</p>
                      <p className="text-[14px] text-[#5B6376] leading-relaxed mt-1">{book.desc}</p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <div className="text-center mt-12">
              <Link href="/search" className="inline-flex items-center gap-2 text-[15px] font-medium text-gold hover:underline">
                Browse full catalogue <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
