import {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Grid3X3, ChevronLeft, ChevronRight, LogOut,
  BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch, ArrowDownToLine, RefreshCw, Package,
  SearchCheck, Newspaper, UserPlus, CreditCard, AlertTriangle, X,
} from 'lucide-react'

export const icon_map: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Shield, Activity, ScrollText,
  Settings, CalendarCheck, Library, BriefcaseBusiness,
  GraduationCap, Briefcase, Monitor, Zap, BookMarked,
  Grid3X3, ChevronLeft, ChevronRight, LogOut,
  BookOpen, Bookmark, Megaphone, User, HelpCircle, LogIn,
  Search, PackageCheck, Star, Globe, Video,
  ClipboardCheck, ShieldCheck, BarChart2, FileSearch, Armchair,
  FileText, UserSearch, ArrowDownToLine, RefreshCw, Package,
  SearchCheck, Newspaper, UserPlus, CreditCard, AlertTriangle, X,
}

export function resolve_icon(name: string) {
  return icon_map[name] ?? LayoutDashboard
}
