import React, { useState, useEffect } from 'react';
import { 
  Trees, 
  Sprout, 
  BookOpen, 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  ShieldCheck, 
  Award, 
  Globe, 
  Server, 
  Lock, 
  X, 
  Filter, 
  ChevronRight,
  Phone,
  Mail,
  Heart,
  Droplets,
  Activity,
  Home,
  Menu,
  Download,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Search,
  Building,
  Check
} from 'lucide-react';

// Official Uploaded Parnharit Foundation Logo (High Resolution Hexagonal Emblem)
const PARNHARIT_OFFICIAL_LOGO = 'https://images.canvas.google/uploaded/bg%20removed%201.png';

// Initial Event & Gallery Data
const INITIAL_EVENTS = [
  {
    id: '1',
    title: '10,000 Tree Sapling Plantation Drive in Jhunjhunu',
    category: 'Tree Plantation',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
    description: 'Community-wide native tree plantation drive in Manota Jatan and surrounding villages of Jhunjhunu district, Rajasthan.',
    location: 'Manota Jatan, Jhunjhunu, Rajasthan'
  },
  {
    id: '2',
    title: 'Clean RO Water Filtration Installation',
    category: 'Clean Water',
    date: '2026-02-22',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1000',
    description: 'Setting up village water purification filtration units providing free access to safe drinking water for over 500 rural families.',
    location: 'Manota Jatan Community Center'
  },
  {
    id: '3',
    title: 'Free Preventive Health & Diagnostic Camp',
    category: 'Health',
    date: '2026-01-18',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000',
    description: 'Mobile medical checkup team provided free diagnostic tests, general health consultations, and essential medicines to rural elders.',
    location: 'District Health Center, Jhunjhunu'
  },
  {
    id: '4',
    title: 'Smart Digital Education & School Kit Distribution',
    category: 'Education',
    date: '2026-02-05',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000',
    description: 'Distributing eco-friendly school kits, books, and setting up interactive learning modules in government primary schools.',
    location: 'Government Primary School, Jhunjhunu'
  },
  {
    id: '5',
    title: 'Organic Farming & Sustainable Soil Seminar',
    category: 'Agriculture',
    date: '2026-03-01',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=1000',
    description: 'Guiding local smallholder farmers on zero-budget natural farming, bio-composting, and water-efficient drip irrigation.',
    location: 'Parnharit Agro Center, Rajasthan'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('parnharit_official_events_v2');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Official NGO Contact Information
  const CONTACT = {
    email: 'parnharit@gmail.com',
    phone: '8299869119',
    phoneFormatted: '+91 82998 69119',
    address: 'Manota Jatan, Jhunjhunu, Rajasthan, India',
    domain: 'www.parnharit.com',
    url: 'https://www.parnharit.com'
  };

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    cityState: 'Jhunjhunu, Rajasthan',
    role: 'Volunteer',
    interests: [],
    comments: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [registeredUser, setRegisteredUser] = useState(null);

  // Gallery Filters and Lightbox State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Admin Controls State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    category: 'Tree Plantation',
    date: '',
    image: '',
    description: '',
    location: ''
  });

  // Hosting & Domain Setup Guide Modal
  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('parnharit_official_events_v2', JSON.stringify(events));
  }, [events]);

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required.';
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[\s-+]/g, ''))) {
      errors.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.cityState.trim()) errors.cityState = 'City & State are required.';
    if (formData.interests.length === 0) errors.interests = 'Select at least one pillar area.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        ...formData,
        id: 'PARN-' + Math.floor(100000 + Math.random() * 900000),
        registeredAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      setRegisteredUser(newUser);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123' || adminPasscode === 'parnharit') {
      setIsAdmin(true);
      setShowAdminLoginModal(false);
      setAdminPasscode('');
    } else {
      alert('Invalid Admin Passcode! Password is: admin123');
    }
  };

  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      title: '',
      category: 'Tree Plantation',
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
      description: '',
      location: 'Manota Jatan, Jhunjhunu, Rajasthan'
    });
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt) => {
    setEditingEvent(evt);
    setEventFormData({ ...evt });
    setEventModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventFormData.title || !eventFormData.description) {
      alert('Please complete the title and description.');
      return;
    }

    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...eventFormData, id: ev.id } : ev));
    } else {
      const newEv = {
        ...eventFormData,
        id: Date.now().toString()
      };
      setEvents([newEv, ...events]);
    }
    setEventModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event/photo from the gallery?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const resetToDefaultEvents = () => {
    if (window.confirm('Reset gallery to official default events?')) {
      setEvents(INITIAL_EVENTS);
    }
  };

  const filteredEvents = events.filter(e => {
    const matchesCategory = selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-600 selection:text-white">
      
      {}
      <div className="bg-emerald-950 text-slate-200 text-xs py-2 px-4 border-b border-emerald-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{CONTACT.email}</span>
            </a>
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CONTACT.phoneFormatted}</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-300/90">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{CONTACT.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-900 text-amber-300 font-mono text-[11px] px-2.5 py-0.5 rounded border border-emerald-700 font-bold tracking-tight">
              {CONTACT.domain}
            </span>
            <button
              onClick={() => setShowDeploymentGuide(true)}
              className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold text-[11px] bg-teal-900/90 px-2.5 py-0.5 rounded border border-amber-400/40 transition hover:border-amber-400"
            >
              <Globe className="w-3 h-3 text-amber-300" /> Hosting & Domain Guide
            </button>
          </div>
        </div>
      </div>

      {}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white shadow-xl border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Top-Left Official Uploaded Logo */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-1 bg-white/95 rounded-xl shadow-lg border-2 border-amber-400/80 group-hover:scale-105 transition-transform duration-300">
              <img 
                src={PARNHARIT_OFFICIAL_LOGO} 
                alt="Parnharit Foundation Official Logo" 
                className="h-12 w-auto object-contain filter drop-shadow"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-200 via-white to-amber-300 bg-clip-text text-transparent">
                PARNHARIT
              </span>
              <span className="text-[10px] font-bold block tracking-widest uppercase text-teal-300 -mt-1">
                FOUNDATION NGO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-emerald-950/80 p-1.5 rounded-full border border-teal-800/60 backdrop-blur-md">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'register', label: 'Registration & Volunteer', icon: Users },
              { id: 'gallery', label: 'Works & Events Gallery', icon: Calendar },
              { id: 'about', label: 'About & Pillars', icon: BookOpen },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 shadow-lg scale-105' 
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-400 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold text-amber-300">Admin Mode</span>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="text-xs text-slate-300 hover:text-white underline ml-1"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLoginModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-teal-200 bg-teal-900/80 hover:bg-teal-800 border border-teal-700/80 transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Admin
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-emerald-900/90 text-white border border-teal-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-emerald-950 border-t border-teal-800 px-4 py-4 space-y-2 shadow-2xl">
            {[
              { id: 'home', label: 'Home Page', icon: Home },
              { id: 'register', label: 'Registration Page', icon: Users },
              { id: 'gallery', label: 'Works & Events Gallery', icon: Calendar },
              { id: 'about', label: 'About & Contact Us', icon: BookOpen },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive ? 'bg-amber-400 text-emerald-950 font-bold shadow-md' : 'text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-grow">
        
        {}
        {activeTab === 'home' && (
          <div>
            {/* Hero Banner with Uploaded Emblem */}
            <section className="relative bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
              
              <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
                
                {/* Large Logo Emblem Showcase */}
                <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-amber-400/50 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <img 
                    src={PARNHARIT_OFFICIAL_LOGO} 
                    alt="Parnharit Foundation Emblem" 
                    className="h-32 sm:h-44 w-auto object-contain filter drop-shadow-xl"
                  />
                </div>

                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-teal-900/90 text-amber-300 border border-teal-700/80 mb-6 shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Registered NGO • Manota Jatan, Jhunjhunu, Rajasthan
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                  Empowering Rural Lives Through <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                    Education, Pure Water, Health & Development
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
                  Parnharit Foundation is dedicated to driving sustainable rural progress in Manota Jatan, Jhunjhunu, and across Rajasthan through holistic social welfare programs.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setActiveTab('register')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Join As Volunteer / Member <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="px-8 py-4 rounded-xl bg-teal-900/90 hover:bg-teal-800 text-white font-bold text-sm border border-teal-600/80 transition-all flex items-center gap-2 shadow-lg"
                  >
                    View Photos & Work Gallery
                  </button>
                </div>
              </div>
            </section>

            {/* Official NGO Core Pillars */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
              <div className="text-center mb-12">
                <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs">As Emblazoned On Our Emblem</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">Parnharit Core Pillars</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Education',
                    icon: BookOpen,
                    color: 'from-blue-600 to-indigo-700',
                    desc: 'Digital literacy, school stationery distribution, and educational support for primary children.'
                  },
                  {
                    title: 'Pure Water',
                    icon: Droplets,
                    color: 'from-sky-500 to-teal-600',
                    desc: 'Installing RO water purification units and riverbed conservation in water-scarce rural belts.'
                  },
                  {
                    title: 'Sustainable Agriculture',
                    icon: Sprout,
                    color: 'from-emerald-600 to-green-700',
                    desc: 'Promoting organic farming, bio-composting, soil health, and drip irrigation techniques.'
                  },
                  {
                    title: 'Health & Wellness',
                    icon: Activity,
                    color: 'from-rose-500 to-red-600',
                    desc: 'Organizing free diagnostic health camps, medical checkups, and elder care in villages.'
                  }
                ].map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between group">
                      <div>
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.title}</h3>
                        <p className="text-slate-600 text-xs leading-relaxed">{pillar.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                        <span>Parnharit Mission</span>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Ground Presence & Headquarters Section */}
            <section className="bg-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-emerald-900">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">Headquarters & Ground Action</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">Operating From Jhunjhunu, Rajasthan</h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Our foundation actively works from Manota Jatan in Jhunjhunu district, Rajasthan, executing projects in clean drinking water, tree plantation, and primary school assistance.
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3 bg-emerald-900/60 p-4 rounded-xl border border-emerald-800">
                      <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-semibold">Registered Address</strong>
                        <span className="text-slate-300 text-xs">{CONTACT.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-emerald-900/60 p-4 rounded-xl border border-emerald-800">
                      <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-semibold">Direct Mobile / WhatsApp</strong>
                        <a href={`tel:${CONTACT.phone}`} className="text-teal-300 hover:underline text-xs">{CONTACT.phoneFormatted} ({CONTACT.phone})</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-emerald-900/60 p-4 rounded-xl border border-emerald-800">
                      <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white font-semibold">Official Email ID</strong>
                        <a href={`mailto:${CONTACT.email}`} className="text-sky-300 hover:underline text-xs">{CONTACT.email}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl border-2 border-amber-400/40 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl"></div>
                  <img src={PARNHARIT_OFFICIAL_LOGO} alt="Parnharit Logo" className="h-28 mx-auto mb-4 object-contain filter drop-shadow" />
                  <h3 className="text-2xl font-black text-slate-900">Get Registered Today</h3>
                  <p className="text-slate-600 text-xs mt-2 mb-6">
                    Join Parnharit Foundation as a Volunteer, Donor, or Partner and get your official printable membership badge instantly.
                  </p>
                  <button
                    onClick={() => setActiveTab('register')}
                    className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm shadow-lg transition"
                  >
                    Open Registration Form
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {}
        {activeTab === 'register' && (
          <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Official NGO Registration
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Join Parnharit Foundation
              </h1>
              <p className="text-slate-600 mt-2 text-sm max-w-xl mx-auto">
                Register as a Volunteer, Member, or Partner in Manota Jatan, Jhunjhunu, Rajasthan.
              </p>
            </div>

            {registeredUser ? (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-200 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Registration Successful!</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Thank you, <strong className="text-slate-900">{registeredUser.fullName}</strong>. You are now an official registered member of Parnharit Foundation.
                </p>

                {/* Printable Membership ID Badge */}
                <div className="mt-8 max-w-md mx-auto bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden border-2 border-amber-400 text-left">
                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-teal-800/80">
                    <div className="flex items-center gap-3">
                      <img src={PARNHARIT_OFFICIAL_LOGO} alt="Parnharit Logo" className="h-12 w-auto bg-white p-1 rounded-xl shadow" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-amber-300">Parnharit Foundation</p>
                        <p className="text-[10px] text-teal-200">Manota Jatan, Jhunjhunu • NGO</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-teal-900 text-amber-300 px-2 py-0.5 rounded border border-teal-700 font-bold">
                      {registeredUser.id}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-[10px] uppercase text-emerald-300 font-semibold">Member Full Name</p>
                      <p className="text-base font-bold text-white tracking-wide">{registeredUser.fullName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] uppercase text-emerald-300 font-semibold">Role Type</p>
                        <p className="text-amber-300 font-semibold">{registeredUser.role}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-300 font-semibold">Contact No</p>
                        <p className="text-slate-200 font-medium">{registeredUser.mobile}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-emerald-300 font-semibold">City & State</p>
                      <p className="text-xs text-slate-200">{registeredUser.cityState}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-teal-800/80 flex justify-between items-center text-[10px] text-teal-300">
                    <span>Registered: {registeredUser.registeredAt}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Award className="w-3.5 h-3.5" /> Official Member Card
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Print / Download Badge
                  </button>
                  <button
                    onClick={() => {
                      setRegisteredUser(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        mobile: '',
                        cityState: 'Jhunjhunu, Rajasthan',
                        role: 'Volunteer',
                        interests: [],
                        comments: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
                  >
                    New Registration
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        formErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-500/30 focus:border-emerald-600'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="parnharit@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-500/30 focus:border-emerald-600'
                      }`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="8299869119"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        formErrors.mobile ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-500/30 focus:border-emerald-600'
                      }`}
                    />
                    {formErrors.mobile && <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                      City & State *
                    </label>
                    <input
                      type="text"
                      placeholder="Manota Jatan, Jhunjhunu, Rajasthan"
                      value={formData.cityState}
                      onChange={e => setFormData({ ...formData, cityState: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                        formErrors.cityState ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-500/30 focus:border-emerald-600'
                      }`}
                    />
                    {formErrors.cityState && <p className="text-red-500 text-xs mt-1">{formErrors.cityState}</p>}
                  </div>
                </div>

                {/* Role selection */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    Registration Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Volunteer', 'Donor', 'Environmentalist', 'Partner'].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setFormData({ ...formData, role: r })}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-center ${
                          formData.role === r
                            ? 'bg-emerald-950 text-amber-300 border-emerald-950 shadow-md'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Checkboxes */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    Pillar Interest Areas *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Education Support & School Supplies',
                      'Clean RO Water Plant Distribution',
                      'Organic Farming & Agriculture',
                      'Health Checkup & Diagnostic Camps',
                      'Tree Plantation & Environmental Conservation'
                    ].map((interest) => {
                      const isChecked = formData.interests.includes(interest);
                      return (
                        <div
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-3 rounded-xl border text-xs font-medium cursor-pointer flex items-center gap-3 transition ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400'
                          }`}>
                            {isChecked && <CheckCircle className="w-3 h-3" />}
                          </div>
                          <span>{interest}</span>
                        </div>
                      );
                    })}
                  </div>
                  {formErrors.interests && <p className="text-red-500 text-xs mt-1">{formErrors.interests}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                    Message or Voluntary Contribution Offer
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us how you would like to participate in Jhunjhunu projects..."
                    value={formData.comments}
                    onChange={e => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-base shadow-lg shadow-amber-500/20 transition hover:scale-[1.01]"
                >
                  Submit Official Registration
                </button>
              </form>
            )}
          </div>
        )}

        {}
        {activeTab === 'gallery' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-emerald-700 font-bold uppercase tracking-widest text-xs">Parnharit Field Work Gallery</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                  Photos & Events
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Glimpses of tree plantation drives, water filtration initiatives, health camps, and school distribution.
                </p>
              </div>

              {/* Admin Bar */}
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <>
                    <button
                      onClick={handleOpenAddEvent}
                      className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold text-xs flex items-center gap-2 shadow-md transition"
                    >
                      <Plus className="w-4 h-4" /> Add New Photo / Event
                    </button>
                    <button
                      onClick={resetToDefaultEvents}
                      className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs transition"
                      title="Reset to default events"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAdminLoginModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-300 transition"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-700" /> Admin Edit Mode
                  </button>
                )}
              </div>
            </div>

            {/* Gallery Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1 mr-2">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {['All', 'Tree Plantation', 'Clean Water', 'Health', 'Education', 'Agriculture'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-emerald-950 text-amber-300 shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/90 group flex flex-col justify-between hover:shadow-xl transition">
                  <div>
                    {/* Event Photo */}
                    <div className="relative h-56 overflow-hidden bg-slate-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-800">
                        {evt.category}
                      </span>

                      {/* Admin Controls Overlay */}
                      {isAdmin && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-amber-400/40">
                          <button
                            onClick={() => handleOpenEditEvent(evt)}
                            className="p-1.5 text-amber-300 hover:text-amber-200 rounded hover:bg-white/20 transition"
                            title="Edit Event"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-white/20 transition"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {evt.date}
                        </span>
                        {evt.location && (
                          <span className="flex items-center gap-1 truncate max-w-[160px]">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" /> {evt.location}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-700 transition">
                        {evt.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveLightbox(evt)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Photo Lightbox
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-sm font-medium">No photo entries found in this category or search query.</p>
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'about' && (
          <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center">
              <img src={PARNHARIT_OFFICIAL_LOGO} alt="Parnharit Foundation Emblem" className="h-32 mx-auto mb-4 object-contain filter drop-shadow-md" />
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                NGO Profile & Mission
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                About Parnharit Foundation
              </h1>
              <p className="text-slate-600 mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
                Headquartered in Manota Jatan, Jhunjhunu, Rajasthan. Working continuously to empower rural families through clean water, tree plantations, free health services, and education.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">Official Registered Information</h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <strong className="block text-slate-500 text-xs uppercase mb-1">Organization Name</strong>
                  <span className="font-bold text-slate-900 text-base">PARNHARIT FOUNDATION</span>
                </div>
                <div>
                  <strong className="block text-slate-500 text-xs uppercase mb-1">Official Website</strong>
                  <a href={CONTACT.url} target="_blank" rel="noreferrer" className="font-bold text-teal-700 hover:underline flex items-center gap-1">
                    {CONTACT.domain} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <strong className="block text-slate-500 text-xs uppercase mb-1">Email Address</strong>
                  <a href={`mailto:${CONTACT.email}`} className="font-bold text-emerald-800 hover:underline">{CONTACT.email}</a>
                </div>
                <div>
                  <strong className="block text-slate-500 text-xs uppercase mb-1">Phone Contact</strong>
                  <a href={`tel:${CONTACT.phone}`} className="font-bold text-emerald-800 hover:underline">{CONTACT.phoneFormatted} ({CONTACT.phone})</a>
                </div>
                <div className="sm:col-span-2">
                  <strong className="block text-slate-500 text-xs uppercase mb-1">Headquarters Address</strong>
                  <span className="font-semibold text-slate-800">{CONTACT.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      
      {/* 1. Photo Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 sm:h-80 relative bg-slate-900">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {activeLightbox.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">{activeLightbox.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-600" /> {activeLightbox.date}</span>
                {activeLightbox.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-600" /> {activeLightbox.location}</span>}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{activeLightbox.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Admin Login Modal */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Admin Login</h3>
              <p className="text-xs text-slate-500 mt-1">Enter passcode to add, edit, or remove photos in gallery.</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Passcode: admin123"
                  value={adminPasscode}
                  onChange={e => setAdminPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-bold rounded-xl text-sm transition"
              >
                Unlock Admin Mode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEventModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {editingEvent ? 'Edit Gallery Photo Entry' : 'Add New Photo / Event'}
            </h3>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventFormData.title}
                  onChange={e => setEventFormData({ ...eventFormData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={eventFormData.category}
                    onChange={e => setEventFormData({ ...eventFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  >
                    <option value="Tree Plantation">Tree Plantation</option>
                    <option value="Clean Water">Clean Water</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={e => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={eventFormData.image}
                  onChange={e => setEventFormData({ ...eventFormData, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={eventFormData.location}
                  onChange={e => setEventFormData({ ...eventFormData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={eventFormData.description}
                  onChange={e => setEventFormData({ ...eventFormData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition"
              >
                Save Gallery Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Host & Domain Setup Modal */}
      {showDeploymentGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-teal-800">
            <button
              onClick={() => setShowDeploymentGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Server className="w-8 h-8 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold text-white">How to Host & Connect www.parnharit.com</h2>
                <p className="text-xs text-teal-300">Complete guide to hosting and setting up custom domain DNS</p>
              </div>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-400" /> 1. Free Hosting on Vercel or Netlify
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Upload this application file to a GitHub repository named <code className="bg-slate-950 px-1 rounded text-amber-300">parnharit-ngo</code>.</li>
                  <li>Log into <strong className="text-white">Vercel.com</strong> or <strong className="text-white">Netlify.com</strong> with GitHub and click <strong>Import Repository</strong>.</li>
                  <li>Click <strong>Deploy</strong> to get an instant free web link (e.g. <code className="text-emerald-400">parnharit.vercel.app</code>).</li>
                </ol>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-amber-300 text-base mb-2 flex items-center gap-2">
                  <Server className="w-4 h-4 text-teal-400" /> 2. Map DNS for www.parnharit.com
                </h3>
                <p className="text-slate-300 mb-3">
                  Log into your domain provider DNS settings panel (GoDaddy / Hostinger / Namecheap) for <strong className="text-white">parnharit.com</strong> and add these 2 DNS records:
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400 font-bold">
                    <span>RECORD TYPE</span>
                    <span>HOST / NAME</span>
                    <span>VALUE / TARGET</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>A Record</span>
                    <span>@</span>
                    <span>76.76.21.21</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>CNAME</span>
                    <span>www</span>
                    <span>cname.vercel-dns.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-amber-300 text-base mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> 3. Automatic Free SSL Security
                </h3>
                <p className="text-slate-300">
                  Vercel or Netlify will automatically generate a free SSL certificate for <strong className="text-white">https://www.parnharit.com</strong> within 15 minutes of DNS propagation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={PARNHARIT_OFFICIAL_LOGO} alt="Parnharit Logo" className="h-10 w-auto bg-white p-1 rounded-lg" />
              <span className="text-xl font-black text-white">PARNHARIT FOUNDATION</span>
            </div>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Serving communities across Rajasthan in Education, Pure Water, Sustainable Agriculture, and Health.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">Official Contact Details</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CONTACT.phone}`} className="hover:underline">{CONTACT.phoneFormatted} ({CONTACT.phone})</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">Domain & Hosting Guide</h4>
            <p className="text-xs text-emerald-300/80 mb-3">
              Official Website Domain: <strong className="text-white">{CONTACT.domain}</strong>
            </p>
            <button
              onClick={() => setShowDeploymentGuide(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold rounded-xl shadow transition"
            >
              Domain Setup Guide (www.parnharit.com)
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-400">
          <p>© {new Date().getFullYear()} Parnharit Foundation. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Manota Jatan, Jhunjhunu, Rajasthan, India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}