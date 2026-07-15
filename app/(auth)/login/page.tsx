import { LoginForm } from '@/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center bg-[#0B1829] text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Akamba Hall Library</h1>
        <p className="text-lg text-[#A8B4C4] text-center">Academic authority meets clean SaaS UI.</p>
      </div>
      <div className="flex items-center justify-center p-6 bg-[#F8FAFC]">
        <LoginForm />
      </div>
    </div>
  )
}
