import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Heart,
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold text-gray-900">KinetoFlow</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Caracteristici</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Cum Funcționează</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Prețuri</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimoniale</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Conectare</Button>
          </Link>
          <Link href="/login">
            <Button>Începe Acum</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transformarea Recuperării Pacienților cu
            <span className="text-blue-600"> Monitorizare Inteligentă</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Îmbunătățiți aderența pacienților și obțineți vizibilitate completă asupra progresului recuperării. 
            Platforma modernă de kinetoterapie care conectează terapeuții și pacienții ca niciodată înainte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-3">
                Începe Perioada Gratuită
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Vezi Demo
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Nu necesită card de credit</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Perioadă gratuită de 14 zile</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Anulează oricând</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tot Ce Aveți Nevoie pentru a Gesti Recuperarea Pacienților
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Instrumente comprehensive concepute special pentru practici moderne de kinetoterapie
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Gestiunea Pacienților</CardTitle>
                <CardDescription>
                  Profiluri centralizate ale pacienților cu monitorizare comprehensive a recuperării și progresului
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Analiza Progresului</CardTitle>
                <CardDescription>
                  Informații în timp real despre aderența pacienților, nivelurile de durere și obiectivele de recuperare
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Programe de Exerciții</CardTitle>
                <CardDescription>
                  Programe de recuperare personalizabile cu demonstrații video și memento-uri automate
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cum Funcționează KinetoFlow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Începeți în câteva minute și transformați-vă practica astăzi
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Creați Cont</h3>
              <p className="text-gray-600">Creați-vă contul și configurați profilul practicii dumneavoastră</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Adăugați Pacienți</h3>
              <p className="text-gray-600">Importați pacienții existenți sau adăugați alți noi individual</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Creați Programe</h3>
              <p className="text-gray-600">Configurați programe de recuperare personalizate pentru fiecare pacient</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Monitorizați Progresul</h3>
              <p className="text-gray-600">Monitorizați aderența și ajustați programele pe baza datelor reale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Beneficii pentru Terapeuți
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Economisiți Timp</h3>
                    <p className="text-gray-600">Monitorizarea automată reduce munca administrativă cu până la 70%</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Rezultate Mai Bune</h3>
                    <p className="text-gray-600">Aderența îmbunătățită duce la timpi de recuperare mai rapizi</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Decizii Bazate pe Date</h3>
                    <p className="text-gray-600">Informațiile în timp real ajută la optimizarea planurilor de tratament</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Beneficii pentru Pacienți
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Activity className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Instrucțiuni Clare</h3>
                    <p className="text-gray-600">Demonstrațiile video asigură efectuarea corectă a exercițiilor</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Conectare Constantă</h3>
                    <p className="text-gray-600">Conexiune permanentă cu terapeutul dumneavoastră pe parcursul recuperării</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Motivație</h3>
                    <p className="text-gray-600">Monitorizarea progresului și obiectivele vă mențin motivați</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recunoscut de Terapeuți de Top
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aflați ce spun profesioniștii din domeniul medical despre KinetoFlow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "KinetoFlow a revoluționat modul în care monitorizez progresul pacienților. Doar informațiile despre aderență au transformat practica mea."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Ana Popescu</p>
                    <p className="text-sm text-gray-600">Kinetoterapeut</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Pacienții mei iubesc videoclipurile cu exerciții și memento-urile. Conformitatea s-a îmbunătățit dramatic de când folosim KinetoFlow."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Mihai Ionescu</p>
                    <p className="text-sm text-gray-600">Medicină Sportivă</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Panoul de analize îmi oferă informații pe care nu le-am avut niciodată. Acum pot ajusta tratamentele pe baza datelor reale, nu doar a intuiției."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Maria Radu</p>
                    <p className="text-sm text-gray-600">Specialist Reabilitare</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Prețuri Simple și Transparente
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Începeți gratuit și scalați pe măsură ce practica dumneavoastră crește
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  0<span className="text-lg text-gray-600">€/lună</span>
                </div>
                <CardDescription>Perfect pentru practicieni individuali</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Până la 10 pacienți</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Analize de bază</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suport prin email</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-600 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Cel Mai Popular</span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Profesional</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  79<span className="text-lg text-gray-600">€/lună</span>
                </div>
                <CardDescription>Pentru practici în creștere</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Pacienți nelimitați</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Analize avansate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suport prioritar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Programe personalizate</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  Personalizat<span className="text-lg text-gray-600"></span>
                </div>
                <CardDescription>Pentru clinici mari</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Tot ce include Professional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Integrări personalizate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suport dedicat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Training și implementare</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-xl font-semibold">KinetoFlow</span>
              </div>
              <p className="text-gray-400">
                Transformarea kinetoterapiei prin monitorizare inteligentă a pacienților și urmărirea recuperării.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produs</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Caracteristici</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prețuri</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Securitate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hartă Rutieră</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Companie</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Despre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cariere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Confidențialitate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termeni</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conformitate GDPR</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Protecția Datelor</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KinetoFlow. Toate drepturile rezervate.</p>
            <p className="mt-2 text-xs text-gray-500">Realizat de Otilia Stratu în cadrul proiectului ODA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
