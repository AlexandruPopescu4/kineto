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
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Patient Recovery with
            <span className="text-blue-600"> Smart Monitoring</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Improve patient adherence and gain complete visibility into recovery progress. 
            The modern physiotherapy platform that connects therapists and patients like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Patient Recovery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for modern physiotherapy practices
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  Centralized patient profiles with comprehensive recovery tracking and progress monitoring
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>
                  Real-time insights into patient adherence, pain levels, and recovery milestones
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Exercise Programs</CardTitle>
                <CardDescription>
                  Customizable recovery programs with video demonstrations and automated reminders
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
              How KinetoFlow Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and transform your practice today
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and set up your practice profile</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Patients</h3>
              <p className="text-gray-600">Import existing patients or add new ones individually</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Programs</h3>
              <p className="text-gray-600">Design personalized recovery programs for each patient</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor adherence and adjust programs based on real data</p>
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
                Benefits for Therapists
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Save Time</h3>
                    <p className="text-gray-600">Automated tracking reduces administrative work by up to 70%</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Better Outcomes</h3>
                    <p className="text-gray-600">Improved adherence leads to faster recovery times</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Data-Driven Decisions</h3>
                    <p className="text-gray-600">Real-time insights help optimize treatment plans</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Benefits for Patients
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Activity className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Clear Guidance</h3>
                    <p className="text-gray-600">Video demonstrations ensure exercises are performed correctly</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Stay Connected</h3>
                    <p className="text-gray-600">Constant connection with your therapist throughout recovery</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Motivation</h3>
                    <p className="text-gray-600">Progress tracking and milestones keep you motivated</p>
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
              Trusted by Leading Therapists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what healthcare professionals are saying about KinetoFlow
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
                  "KinetoFlow has revolutionized how I track patient progress. The adherence insights alone have transformed my practice."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Sarah Chen</p>
                    <p className="text-sm text-gray-600">Physical Therapist</p>
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
                  "My patients love the exercise videos and reminders. Compliance has improved dramatically since we started using KinetoFlow."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Michael Roberts</p>
                    <p className="text-sm text-gray-600">Sports Medicine</p>
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
                  "The analytics dashboard gives me insights I never had before. I can now adjust treatments based on real data, not just intuition."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Dr. Emily Johnson</p>
                    <p className="text-sm text-gray-600">Rehab Specialist</p>
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as your practice grows
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  $0<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription>Perfect for solo practitioners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Up to 10 patients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Basic analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Email support</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-600 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  $79<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription>For growing practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited patients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Custom programs</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  Custom<span className="text-lg text-gray-600"></span>
                </div>
                <CardDescription>For large clinics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Everything in Pro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Custom integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Training & onboarding</span>
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
                Transforming physiotherapy with smart patient monitoring and recovery tracking.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KinetoFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
