import React from 'react';
import { Sparkles, Zap, Bot, Building2, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [firstLineComplete, setFirstLineComplete] = React.useState(false);
  const [secondLineComplete, setSecondLineComplete] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer1 = setTimeout(() => setFirstLineComplete(true), 2500);
    const timer2 = setTimeout(() => setSecondLineComplete(true), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleInitialize = () => {
    if (email.trim()) {
      navigate('/initialize', { state: { email } });
    } else {
      navigate('/initialize');
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/icon-brain.png" 
                alt="Talisman AI"
                className="w-6 h-6"
              />
              <span className="text-xl font-bold tracking-wider">TALISMAN.AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#about" className="nav-link">About</a>
              <button onClick={handleContactClick} className="nav-link">Contact</button>
              <button onClick={handleContactClick} className="button-primary">
                Book a Call
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="nav-link block px-3 py-2">Features</a>
              <a href="#about" className="nav-link block px-3 py-2">About</a>
              <button onClick={handleContactClick} className="nav-link block px-3 py-2 w-full text-left">Contact</button>
              <button onClick={handleContactClick} className="button-primary w-full mt-4">
                Book a Call
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 z-0">
          <spline-viewer url="https://prod.spline.design/0vldQrzyzhRCBEZm/scene.splinecode"></spline-viewer>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="animate-float">
            <Sparkles className="w-12 h-12 mx-auto text-blue-400 animate-glow mb-6" />
          </div>
          <div className="space-y-4 mb-6">
            <h1 className={`typewriter typewriter-delay-1 mx-auto text-5xl md:text-7xl font-bold leading-tight ${firstLineComplete ? 'typewriter-complete' : ''}`}>
              Automate Your Business
            </h1>
            <h1 className={`typewriter typewriter-delay-2 mx-auto text-5xl md:text-7xl font-bold leading-tight gradient-text ${secondLineComplete ? 'typewriter-complete' : ''}`}>
              with Artificial Intelligence
            </h1>
          </div>
          <div className="glass-card max-w-2xl mx-auto p-6 mb-8">
            <p className="text-xl text-gray-400">
              Transform your CRM workflow with cutting-edge AI automation. Streamline operations, boost efficiency, and drive growth.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <button onClick={handleContactClick} className="button-primary w-full">
              Book a Call
            </button>
            <div className="flex w-full gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-400"
              />
              <button onClick={handleInitialize} className="button-primary whitespace-nowrap">
                Initialize <ArrowRight className="inline-block ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-navy-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Features for Modern Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <Zap className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Agent</h3>
              <p className="text-gray-400">
                24/7 Intelligent Support Systems with advanced natural language processing capabilities
              </p>
            </div>
            <div className="feature-card">
              <Bot className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Phone Agent</h3>
              <p className="text-gray-400">
                Customer Service with Virtual Assistant in phone calls for your business
              </p>
            </div>
            <div className="feature-card">
              <Building2 className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Social Media Automation</h3>
              <p className="text-gray-400">
                Leave the management of your automated social networks to the experts in Artificial Intelligence and recover valuable time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join leading companies that trust TALISMAN.AI for their automation needs.
          </p>
          <button onClick={handleContactClick} className="button-primary inline-flex items-center">
            Schedule a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Attribution */}
      <div className="text-center text-gray-500 text-xs py-4">
        <a 
          href="https://es.vecteezy.com/png-gratis/inteligencia-artificial" 
          className="hover:text-gray-400 transition-colors"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Artificial Intelligence PNGs by Vecteezy
        </a>
      </div>
    </div>
  );
}