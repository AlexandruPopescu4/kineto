'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: 'therapist' | 'patient') => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      if (role === 'therapist') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden md:block">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Activity className="h-7 w-7" />
              </div>
              <span className="text-3xl font-bold text-gray-900">KinetoFlow</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Transformarea Recuperării Pacienților prin Monitorizare Inteligentă
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Platforma modernă de kinetoterapie care conectează terapeuții și pacienții ca niciodată înainte.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">Monitorizare Progres</h3>
                <p className="text-sm text-gray-600">Monitorizați aderența pacienților și recuperarea în timp real</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1">Securitate & GDPR</h3>
                <p className="text-sm text-gray-600">Datele dumneavoastră sunt protejate cu securitate de nivel enterprise</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="flex md:hidden items-center justify-center space-x-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
              </div>
              
              <CardTitle className="text-2xl">Bine Ați Venit</CardTitle>
              <CardDescription>
                Conectați-vă la contul dumneavoastră pentru a continua
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresă Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Introduceți emailul"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Parolă
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Introduceți parola"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Ține-mă minte</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                    Ai uitat parola?
                  </a>
                </div>
                
                <Button
                  type="submit"
                  className="w-full py-3 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Se conectează...' : 'Conectare'}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Sau încercați un cont demo</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleDemoLogin('therapist')}
                  disabled={isLoading}
                >
                  Conectare ca Terapeut
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full py-3 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleDemoLogin('patient')}
                  disabled={isLoading}
                >
                  Conectare ca Pacient
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Nu aveți un cont?{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Înregistrați-vă gratuit
                  </Link>
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  Realizat de Otilia Stratu în cadrul proiectului ODA
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
