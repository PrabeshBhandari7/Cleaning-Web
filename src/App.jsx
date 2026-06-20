import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Check,
  Star,
  MessageSquare,
  MapPin,
  Home,
  Briefcase,
  Leaf,
  ChevronRight,
  ArrowRight,
  Send,
  Phone,
  Mail,
  Menu,
  X,
  Sliders,
  DollarSign,
  Droplet,
  Trash2,
  BookOpen,
  Lock,
  Plus,
  Edit2,
} from 'lucide-react';

// Import images from assets
import heroImg from './assets/hero_clean_space.png';
import residentialImg from './assets/residential_clean.png';
import officeImg from './assets/office_clean.png';
import deepImg from './assets/deep_clean.png';
import washroomImg from './assets/washroom_clean.png';
import cityImg from './assets/city_clean.png';
import roadImg from './assets/road_clean.png';

// Custom Simple & Clean Logo doing cleaning (Spray bottle spraying mist with sparkles)
const CleanLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-brand-orange animate-pulse"
  >
    {/* Spray Bottle neck and nozzle */}
    <path d="M8 9V6a2 2 0 0 1 2-2h1.5a1.5 1.5 0 0 1 1.5 1.5V9" />
    <path d="M13 4.5h2V6h-2" />
    {/* Trigger */}
    <path d="M15 6v1.5a1.5 1.5 0 0 1-1.5 1.5H13" />
    {/* Bottle Body */}
    <path d="M7 9h8.5a1 1 0 0 1 1 1.2L15 17.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5L5.5 10.2A1 1 0 0 1 7 9z" />
    {/* Sparkle (Clean representation) */}
    <path d="M19 4l.5.5-.5.5-.5-.5z" fill="currentColor" stroke="none" />
    <path d="M21 7l.8.8-.8.8-.8-.8z" fill="currentColor" stroke="none" />
    {/* Spray mist droplets */}
    <circle cx="19" cy="10" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="22" cy="12" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="20" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// Map icon strings to Lucide components
const getIconById = (id) => {
  switch (id) {
    case 'home':
      return <Home className="w-5 h-5 text-white" />;
    case 'office':
      return <Briefcase className="w-5 h-5 text-white" />;
    case 'deep':
      return <Sparkles className="w-5 h-5 text-white" />;
    case 'washroom':
      return <Droplet className="w-5 h-5 text-white" />;
    case 'city':
      return <MapPin className="w-5 h-5 text-white" />;
    case 'road':
      return <Trash2 className="w-5 h-5 text-white" />;
    default:
      return <Sparkles className="w-5 h-5 text-white" />;
  }
};

// Map image strings to assets
const getImageById = (id) => {
  if (!id) return deepImg;
  if (id.startsWith('data:') || id.startsWith('http://') || id.startsWith('https://')) {
    return id;
  }
  switch (id) {
    case 'residential':
      return residentialImg;
    case 'office':
      return officeImg;
    case 'deep':
      return deepImg;
    case 'washroom':
      return washroomImg;
    case 'city':
      return cityImg;
    case 'road':
      return roadImg;
    default:
      return deepImg;
  }
};

const defaultServicesList = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    desc: 'Detailed dusting, scrubbing, and sanitizing for apartments and family homes.',
    price: 120, // Base price in USD
    image: residentialImg,
    imageKey: 'residential',
    badge: 'Detailed home care',
    iconId: 'home',
    icon: <Home className="w-5 h-5 text-white" />,
  },
  {
    id: 'office',
    title: 'Office Cleaning',
    desc: 'Organized and disinfected work desks, restrooms, and reception halls.',
    price: 250,
    image: officeImg,
    imageKey: 'office',
    badge: 'Sanitized workplaces',
    iconId: 'office',
    icon: <Briefcase className="w-5 h-5 text-white" />,
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    desc: 'Heavy-duty restore cleaning targeting baseboards, filters, and behind appliances.',
    price: 180,
    image: deepImg,
    imageKey: 'deep',
    badge: 'Pristine restoration',
    iconId: 'deep',
    icon: <Sparkles className="w-5 h-5 text-white" />,
  },
  {
    id: 'washroom',
    title: 'Washroom Disinfection',
    desc: 'Complete wall-to-floor bleaching, grout scrubbing, and biological sanitization.',
    price: 70,
    image: washroomImg,
    imageKey: 'washroom',
    badge: 'Hygienic restrooms',
    iconId: 'washroom',
    icon: <Droplet className="w-5 h-5 text-white" />,
  },
  {
    id: 'city',
    title: 'City & Municipal Clean',
    desc: 'Public park sweeps, municipal trash removal, and local square power washing.',
    price: 450,
    image: cityImg,
    imageKey: 'city',
    badge: 'Community spaces',
    iconId: 'city',
    icon: <MapPin className="w-5 h-5 text-white" />,
  },
  {
    id: 'road',
    title: 'Road Sweeping & Washing',
    desc: 'Heavy road sweeper broom cleaning and high-pressure asphalt wash.',
    price: 380,
    image: roadImg,
    imageKey: 'road',
    badge: 'Clean thoroughfares',
    iconId: 'road',
    icon: <Trash2 className="w-5 h-5 text-white" />,
  },
  {
    id: 'construction',
    title: 'Post-Construction Detail',
    desc: 'Removing brick dust, paint marks, plaster smears, and structural cleanup.',
    price: 320,
    image: deepImg,
    imageKey: 'deep',
    badge: 'Dust & debris clearance',
    iconId: 'deep',
    icon: <Check className="w-5 h-5 text-white" />,
  },
  {
    id: 'moveout',
    title: 'Move-In / Move-Out Clean',
    desc: 'End-of-tenancy scrubbing to secure security deposits and welcome new tenants.',
    price: 220,
    image: residentialImg,
    imageKey: 'residential',
    badge: 'Ready for tenancy',
    iconId: 'home',
    icon: <Home className="w-5 h-5 text-white" />,
  },
  {
    id: 'carpet',
    title: 'Carpet & Upholstery Steam',
    desc: 'High-temp steam soil extraction for carpets, sofas, and office seating.',
    price: 90,
    image: officeImg,
    imageKey: 'office',
    badge: 'Steam soil extraction',
    iconId: 'deep',
    icon: <Sparkles className="w-5 h-5 text-white" />,
  },
];

function App() {
  const nameInputRef = useRef(null);

  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Before/After State
  const [isAfter, setIsAfter] = useState(true);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'residential',
    size: '2-3bed',
    frequency: 'weekly',
  });

  const [calculatedPrice, setCalculatedPrice] = useState(120);
  const [bookingPlaced, setBookingPlaced] = useState(false);
  const [placedBookingDetails, setPlacedBookingDetails] = useState(null);
  const [formHighlight, setFormHighlight] = useState(false);

  // Blog modal state
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Currency State (USD vs Dubai AED)
  const [currency, setCurrency] = useState('AED');

  // Admin Security & Dashboard State
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview' | 'services' | 'add-service' | 'bookings'
  const [bookings, setBookings] = useState([]);

  // Dynamic Service State from Backend API
  const [services, setServices] = useState(defaultServicesList);

  // New service form fields inside admin dashboard
  const [newService, setNewService] = useState({
    title: '',
    desc: '',
    price: '',
    badge: '',
    iconId: 'deep',
    imageKey: 'deep',
  });

  // Custom photo upload state
  const [photoSourceType, setPhotoSourceType] = useState('predefined'); // 'predefined' | 'upload'
  const [uploadedBase64, setUploadedBase64] = useState('');
  const fileInputRef = useRef(null);

  // Fetch helper to sync services with backend
  const fetchServices = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/services');
      const data = await res.json();
      if (data.success && data.data) {
        setServices(
          data.data.map((s) => ({
            ...s,
            icon: getIconById(s.iconId),
            image: getImageById(s.imageKey),
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Fetch helper to sync bookings with backend
  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/bookings');
      const data = await res.json();
      if (data.success && data.data) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  // Formatting helper for currency converter
  const formatPrice = (usdAmount) => {
    if (currency === 'USD') {
      return `$${usdAmount}`;
    } else {
      // Dubai exchange rate: 1 USD = 3.67 AED
      return `AED ${Math.round(usdAmount * 3.67)}`;
    }
  };

  // Blog articles details
  const blogList = [
    {
      id: 1,
      title: '5 Tips for a Dust-Free Home',
      short: 'Simple habits you can adopt daily to minimize dust buildup in your common rooms.',
      image: residentialImg,
      content: `Keeping a home dust-free feels like an uphill battle, but adopting a few simple habits can make a dramatic difference:
      
      1. Use Microfiber Cloths: Standard feather dusters only spread dust around. Microfiber traps and locks dust particles.
      2. Wash Bedding Weekly: Bedding is a major contributor to dead skin cell dust. Wash sheets and pillowcases in hot water once a week.
      3. Clean from Top to Bottom: Always dust ceiling fans and high shelves first so falling particles land on uncleaned floors.
      4. Groom Pets Frequently: Pet dander accumulates quickly. Groom your pets outdoors or in a designated, easy-to-clean area.
      5. Vacuum with HEPA Filters: Ensure your vacuum cleaner traps allergens instead of releasing them back into your indoor air.`,
    },
    {
      id: 2,
      title: 'Office Sanitization Guide',
      short:
        'A checklist for office managers to keep teams healthy and productive during cold seasons.',
      image: officeImg,
      content: `A clean office is key to high productivity and reduced sick days. Use this checklist during peak flu seasons:
      
      1. Focus on High-Touch Points: Door handles, light switches, keyboards, copier panels, and kitchen taps should be disinfected multiple times daily.
      2. Sanitize Breakroom Sponge: Sponges harbor germs. Microwave wet sponges for one minute or replace them weekly.
      3. Implement a Clean-Desk Policy: Keep desks free of clutter so cleaning crews can easily wipe down and sanitize computer peripherals and desks.
      4. Hand Sanitizer Stations: Place gel dispensers in common hallways, conference rooms, and reception entries.
      5. Air Circulation: Keep HVAC filters replaced to trap dust and clean indoor air.`,
    },
    {
      id: 3,
      title: 'Eco-Friendly Cleaners',
      short: 'Why switching to plant-based cleaners is better for your home air quality.',
      image: deepImg,
      content: `Traditional chemical cleaners get the job done, but at what cost to your health? Here's why green products are superior:
      
      1. Zero Volatile Organic Compounds (VOCs): Green formulas lack harsh synthetic fumes, protecting your family and pets from respiratory irritations.
      2. 100% Biodegradable: Plant-based ingredients degrade naturally without poisoning groundwater or municipal systems.
      3. Natural Scents: Essential oil extracts (like citrus, lavender, and pine) leave a pleasant aroma without synthetic perfumes.
      4. Safe for Sensitive Skin: Reducing exposure to strong acids or chlorine bleach prevents chemical burns and contact dermatitis.`,
    },
  ];

  // Pricing calculation logic
  const calculatePrice = () => {
    const selectedService = services.find((s) => s.id === formData.serviceType);
    let basePrice = selectedService ? selectedService.price : 120;

    // Size multiplier
    let sizeMultiplier = 1;
    if (formData.size === 'studio') sizeMultiplier = 0.8;
    if (formData.size === 'large') sizeMultiplier = 1.4;
    if (formData.size === 'office') sizeMultiplier = 2.0;

    // Frequency discounts
    let discount = 1.0;
    if (formData.frequency === 'weekly') discount = 0.8; // 20% off
    if (formData.frequency === 'biweekly') discount = 0.85; // 15% off
    if (formData.frequency === 'monthly') discount = 0.9; // 10% off

    return Math.round(basePrice * sizeMultiplier * discount);
  };

  // Recalculate price on select change
  useEffect(() => {
    setCalculatedPrice(calculatePrice());
  }, [formData, services]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Select a service from the cards and scroll to booking form
  const handleSelectServiceFromCard = (serviceId) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceId }));

    // Smooth scroll to booking section
    const targetElement = document.getElementById('booking-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Flash form block
    setFormHighlight(true);
    setTimeout(() => setFormHighlight(false), 2000);

    // Focus input
    if (nameInputRef.current) {
      setTimeout(() => nameInputRef.current.focus(), 800);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceType: formData.serviceType,
          size: formData.size,
          frequency: formData.frequency,
          totalPrice: calculatedPrice,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPlacedBookingDetails({
          ...data.data,
          date: new Date(data.data.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });
        setBookingPlaced(true);
        fetchBookings(); // sync state in admin panel
      } else {
        alert(data.message || 'Failed to register your quote.');
      }
    } catch (err) {
      console.error('Error placing booking quote:', err);
      alert('Network error placing booking quote. Please verify your connection.');
    }
  };

  // Handle smooth scroll for navigation buttons/links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 5 Clicks Admin Easter Egg trigger logic
  const handleLogoClick = (e) => {
    e.preventDefault();
    setLogoClickCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 5) {
        if (isAdminLoggedIn) {
          setShowAdminDashboard(true);
        } else {
          setShowAdminLogin(true);
        }
        return 0; // Reset count
      }
      return nextCount;
    });
  };

  // Reset clicks counter after 3 seconds of inactivity
  useEffect(() => {
    if (logoClickCount > 0) {
      const timer = setTimeout(() => setLogoClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
      setAdminUsername('');
      setAdminPassword('');
      setAdminError('');
    } else {
      setAdminError('Invalid credentials. Authorized Admin only.');
    }
  };

  // Admin function: Delete a service type (Backend Connected)
  const handleDeleteService = async (serviceId) => {
    if (services.length <= 1) {
      alert('Cannot delete the last remaining service.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this cleaning service?')) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local list
        fetchServices();
        // If active form service was deleted, fallback to remaining
        if (formData.serviceType === serviceId) {
          const remaining = services.filter((s) => s.id !== serviceId);
          setFormData((prev) => ({ ...prev, serviceType: remaining[0].id }));
        }
      } else {
        alert(data.message || 'Failed to delete service.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Admin function: Update a service's base price in local state (for fast responsive typing)
  const handleUpdatePrice = (serviceId, value) => {
    const numericValue = Number(value) || 0;
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return { ...s, price: numericValue };
        }
        return s;
      })
    );
  };

  // Admin function: Save updated rate to the backend
  const handleSavePrice = async (serviceId, value) => {
    const numericValue = Number(value) || 0;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: numericValue }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to update base rate on server.');
        fetchServices(); // revert
      }
    } catch (error) {
      console.error('Error updating service price:', error);
      fetchServices();
    }
  };

  // Admin function: Handle custom local photo upload to base64
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size exceeds 2MB limit. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Admin function: Add new service (Backend Connected)
  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) {
      alert('Please provide a title and base price.');
      return;
    }

    const priceNum = Number(newService.price) || 0;
    const finalImageKey = photoSourceType === 'upload' ? uploadedBase64 : newService.imageKey;

    if (photoSourceType === 'upload' && !uploadedBase64) {
      alert('Please select a photo file to upload or switch to predefined photos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newService.title,
          desc:
            newService.desc ||
            'Premium custom cleaning service tailored by workspace administrator.',
          price: priceNum,
          badge: newService.badge || 'Professional service',
          iconId: newService.iconId,
          imageKey: finalImageKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices(); // Reload services from server
        // Reset fields
        setNewService({
          title: '',
          desc: '',
          price: '',
          badge: '',
          iconId: 'deep',
          imageKey: 'deep',
        });
        setUploadedBase64('');
      } else {
        alert(data.message || 'Failed to create service type.');
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-slate-700 antialiased font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo with 5-click easter egg detector */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <CleanLogo />
            <span className="font-display font-black text-2xl tracking-wide text-brand-green">
              Cleaning<span className="text-brand-orange">.Web</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, 'services')}
              className="hover:text-brand-green transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="hover:text-brand-green transition-colors"
            >
              Why Us
            </a>
            <a
              href="#comparison"
              onClick={(e) => handleSmoothScroll(e, 'comparison')}
              className="hover:text-brand-green transition-colors"
            >
              Visuals
            </a>
            <a
              href="#blogs"
              onClick={(e) => handleSmoothScroll(e, 'blogs')}
              className="hover:text-brand-green transition-colors"
            >
              Clean Living
            </a>
            {isAdminLoggedIn && (
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md border border-brand-orange/20 animate-pulse hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
              >
                Admin Panel
              </button>
            )}
          </nav>

          {/* Call / Book / Currency Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'AED' : 'USD')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-brand-border bg-slate-50 hover:bg-slate-100 text-xs font-bold text-brand-green hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Currency:</span>
              <span className="text-brand-orange">
                {currency === 'USD' ? 'USD ($)' : 'AED (د.إ)'}
              </span>
            </button>
            <a
              href="#booking-section"
              onClick={(e) => handleSmoothScroll(e, 'booking-section')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-orange text-white hover:bg-brand-orange-hover hover:scale-105 active:scale-95 transition-all shadow-md shadow-brand-orange/15"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-border bg-white px-6 py-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-semibold text-slate-600">
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, 'services')}
                className="py-2 border-b border-slate-50 hover:text-brand-green"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="py-2 border-b border-slate-50 hover:text-brand-green"
              >
                Why Us
              </a>
              <a
                href="#comparison"
                onClick={(e) => handleSmoothScroll(e, 'comparison')}
                className="py-2 border-b border-slate-50 hover:text-brand-green"
              >
                Visuals
              </a>
              <a
                href="#blogs"
                onClick={(e) => handleSmoothScroll(e, 'blogs')}
                className="py-2 hover:text-brand-green"
              >
                Clean Living
              </a>
              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowAdminDashboard(true);
                  }}
                  className="py-2 border-t border-slate-100 text-left font-bold text-brand-orange"
                >
                  Admin Control Panel
                </button>
              )}
            </nav>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`flex-grow py-2 text-center text-xs font-bold rounded-lg border transition-all ${
                  currency === 'USD'
                    ? 'border-brand-green bg-brand-green/5 text-brand-green'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('AED')}
                className={`flex-grow py-2 text-center text-xs font-bold rounded-lg border transition-all ${
                  currency === 'AED'
                    ? 'border-brand-green bg-brand-green/5 text-brand-green'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                AED (د.إ)
              </button>
            </div>
            <a
              href="#booking-section"
              onClick={(e) => handleSmoothScroll(e, 'booking-section')}
              className="block w-full text-center py-3 rounded-xl font-bold bg-brand-orange text-white"
            >
              Book Now
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 space-y-6">
          <h1 className="text-4xl sm:text-6xl font-display font-black text-brand-green leading-tight">
            Pure Spaces, <br />
            <span className="text-brand-orange">Professionally</span> Cleaned
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
            Reliable, eco-friendly, and professional home, office, and municipal cleaning services.
            Book in seconds, track in real-time, and enjoy a pristine environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#booking-section"
              onClick={(e) => handleSmoothScroll(e, 'booking-section')}
              className="px-8 py-4 rounded-xl font-bold bg-brand-green text-white hover:bg-brand-green-hover text-center shadow-lg shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Book Service
            </a>
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, 'services')}
              className="px-8 py-4 rounded-xl font-bold border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-center transition-all text-slate-700"
            >
              Our Services
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4 border-t border-brand-border max-w-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                JS
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700">
                MT
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-700">
                AM
              </div>
            </div>
            <div className="text-xs">
              <div className="flex items-center text-amber-500 gap-0.5 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-slate-800 ml-1">4.9/5 Rating</span>
              </div>
              <span className="text-slate-500 font-medium">From 10,000+ Cleaned Spaces</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:col-span-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-2xl bg-slate-100">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
            <img
              src={heroImg}
              alt="Sparkling clean space hero illustration"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (FEATURES) */}
      <section id="about" className="bg-white py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Why Choose Cleaning-Web?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              Why Our Cleaners Keep Your Workspace Pristine
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">
                Green Cleaning Products
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Protecting your loved ones and pets. We use certified biodegradable and non-toxic
                plant-based formulas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">
                Vetted Professionals
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                All of our team members are background checked, fully insured, and highly trained.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">
                Bespoke Scheduling
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Flexible cleaning programs tailored to your schedule, whether weekly, bi-weekly, or
                monthly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-green mb-2">
                Satisfaction Guarantee
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                If you are not 100% satisfied with our service, we'll return and reclean the area
                for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (SERVICES SHOWCASE - DYNAMIC STATE) */}
      <section id="services" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Our Service Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              Tailored Services for Every Environment
            </h2>
            <p className="text-slate-500 text-sm">
              Click on any service card below to automatically select it in the calculator and book!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleSelectServiceFromCard(service.id)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-brand-border cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  {/* Floating Action Hint */}
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest bg-brand-orange text-white px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    Book This <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <div className="flex justify-between items-end text-white">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                          {service.icon || <Sparkles className="w-5 h-5 text-white" />}
                        </div>
                        <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                          {service.badge}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl">{service.title}</h3>
                      <p className="text-[11px] text-slate-300 max-w-[18rem] line-clamp-1 group-hover:line-clamp-none transition-all mt-1">
                        {service.desc}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-xs text-slate-300 block">From</span>
                      <span className="text-base font-black bg-brand-orange px-3 py-1 rounded-full block mt-0.5">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISUAL TRANSFORMATION & STATS PLAN */}
      <section id="comparison" className="bg-white py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Text and stats side */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Our Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              See the Transformation
            </h2>
            <p className="text-slate-500 leading-relaxed">
              We pay attention to details other cleaners miss. Switch between Before & After modes
              to inspect the high standard of cleanliness our teams deliver in bathrooms, parks, and
              homes.
            </p>

            <div className="flex gap-4 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setIsAfter(false)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all ${
                  !isAfter
                    ? 'bg-white text-brand-green shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Before Cleaning
              </button>
              <button
                onClick={() => setIsAfter(true)}
                className={`flex-grow py-3 rounded-lg font-bold text-sm transition-all ${
                  isAfter
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                After Cleaning
              </button>
            </div>

            {/* List pricing info dynamically using services state */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              {services.slice(0, 4).map((s) => (
                <div key={s.id} className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-500">{s.title}</span>
                  <span className="text-brand-green font-extrabold">{formatPrice(s.price)}</span>
                </div>
              ))}
            </div>

            {/* Features checkmarks */}
            <ul className="grid grid-cols-2 gap-3 pt-4 text-xs font-semibold text-brand-green">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Free inspection first visit
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Vetted professionals only
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Fully bonded & insured
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-orange" /> Pro grade supplies
              </li>
            </ul>
          </div>

          {/* Interactive slider side */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-xl bg-slate-100">
              {/* BEFORE state */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-widest">
                  Before
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Messy & Dusty Environments
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Stained surfaces, cluttered rooms, and accumulated dust.
                </p>
              </div>

              {/* AFTER state */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-end p-8 ${
                  isAfter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'saturate(1.1) brightness(1.15) contrast(1.05)',
                }}
              >
                {/* Simulated sparkles */}
                <div className="absolute top-1/4 left-1/3 w-6 h-6 animate-pulse text-yellow-300">
                  <Sparkles className="w-full h-full" />
                </div>
                <div className="absolute top-12 right-1/4 w-8 h-8 animate-bounce text-yellow-200">
                  <Sparkles className="w-full h-full" />
                </div>

                <span className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-brand-green text-white text-xs font-bold uppercase tracking-widest">
                  After Cleaning.Web
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  ✨ Sanitized & Sparkling Workspace
                </h3>
                <p className="text-slate-200 text-sm mt-1">
                  Disinfected countertops, organized furniture, and completely dust-free air.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS / SEEN ON */}
      <section className="bg-slate-50 py-12 border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-around gap-8 opacity-60">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            As seen on:
          </span>
          <div className="font-display font-black text-xl text-slate-500 tracking-wider">
            CLEAN & CO.
          </div>
          <div className="font-display font-black text-xl text-slate-500 tracking-wider">
            PURE & SIMPLE
          </div>
          <div className="font-display font-black text-xl text-slate-500 tracking-wider">
            ECO-SHINE
          </div>
        </div>
      </section>

      {/* BLOG / GUIDES SECTION */}
      <section id="blogs" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16 max-w-xl mx-auto">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
              Latest News & Blogs
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              Clean Living Guides
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogList.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-brand-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-slate-200 relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-bold text-lg text-brand-green">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{blog.short}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orange-hover cursor-pointer"
                  >
                    Read Full Article <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION (INTERACTIVE FORM WITH DYNAMIC OPTION LIST) */}
      <section
        id="booking-section"
        className="bg-white py-20 border-t border-brand-border scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-green">
              Secure Your Pristine Space Today
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Tell us about your space and select a date. We'll match you with the best professional
              cleaning team.
            </p>
            <div className="flex justify-center gap-6 pt-2 text-xs font-semibold text-brand-green">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-orange" /> 100% Happiness Guaranteed
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-orange" /> Free Cancel up to 24h prior
              </span>
            </div>
          </div>

          <div
            className={`border rounded-3xl p-6 md:p-10 shadow-lg relative transition-all duration-500 ${
              formHighlight
                ? 'bg-brand-orange/5 border-brand-orange scale-[1.01] ring-4 ring-brand-orange/10'
                : 'bg-brand-bg border-brand-border'
            }`}
          >
            {bookingPlaced ? (
              // Success Screen / Booking Receipt Simulation
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-brand-green">
                    Booking Confirmed!
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Thank you, {placedBookingDetails.name}. Your cleaning session has been scheduled
                    successfully.
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-white border border-brand-border rounded-2xl p-6 text-left space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Order ID:</span>
                    <strong className="text-slate-700">{placedBookingDetails.id}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Cleaning Type:</span>
                    <strong className="text-slate-700 uppercase">
                      {services.find((s) => s.id === placedBookingDetails.serviceType)?.title ||
                        placedBookingDetails.serviceType}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Frequency:</span>
                    <strong className="text-slate-700 uppercase">
                      {placedBookingDetails.frequency}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Scheduled Date:</span>
                    <strong className="text-slate-700">{placedBookingDetails.date}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-400">Assigned Pro:</span>
                    <strong className="text-slate-700">{placedBookingDetails.cleaner}</strong>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-400 font-bold">Total Price paid:</span>
                    <strong className="text-brand-orange text-lg font-black">
                      {formatPrice(placedBookingDetails.price)}
                    </strong>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setBookingPlaced(false);
                      setFormData({
                        name: '',
                        email: '',
                        serviceType: services[0]?.id || 'residential',
                        size: '2-3bed',
                        frequency: 'weekly',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-green text-white hover:bg-brand-green-hover transition-colors cursor-pointer"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            ) : (
              // Form Layout
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      ref={nameInputRef}
                      placeholder="e.g., John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g., john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Service Type (Dynamic Option mapping) */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 block">
                      Service Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 focus:outline-none focus:border-brand-green text-sm"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Size */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 block">
                      Home/Office/Area Size
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 focus:outline-none focus:border-brand-green text-sm"
                    >
                      <option value="studio">Small Area / Studio / 1 Bed</option>
                      <option value="2-3bed">Medium Area / 2 - 3 Beds</option>
                      <option value="large">Large Area (4+ Beds / Parks)</option>
                      <option value="office">Corporate / Municipal Block</option>
                    </select>
                  </div>

                  {/* Frequency */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 block">Frequency</label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border bg-white text-slate-800 focus:outline-none focus:border-brand-green text-sm"
                    >
                      <option value="weekly">Weekly (Save 20%)</option>
                      <option value="biweekly">Bi-weekly (Save 15%)</option>
                      <option value="monthly">Monthly (Save 10%)</option>
                      <option value="once">One-time service</option>
                    </select>
                  </div>
                </div>

                {/* Estimate Quote display inside form */}
                <div className="bg-white border border-brand-border p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">
                      Estimated Billing Quote
                    </span>
                    <span className="text-xs text-emerald-600 font-medium">
                      All cleaner rates, supplies & taxes included.
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-black text-brand-green">
                      {formatPrice(calculatedPrice)}
                    </span>
                    <span className="text-slate-400 text-xs block">/ visit</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-brand-orange hover:bg-brand-orange-hover hover:scale-[1.01] active:scale-[0.99] transition-all text-white shadow-lg shadow-brand-orange/15 cursor-pointer"
                >
                  Book Service
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-brand-border py-16 text-slate-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, 'root')}
              className="flex items-center gap-2.5 group"
            >
              <CleanLogo />
              <span className="font-display font-black text-xl tracking-wide text-brand-green">
                Cleaning<span className="text-brand-orange">.Web</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[16rem]">
              Sparkling professional cleans for residential, commercial, municipal, and industrial
              environments. Fully bonded and insured.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="tel:18005550199"
                className="p-2 rounded-lg bg-brand-bg hover:bg-brand-green/10 text-brand-green hover:text-brand-green-hover transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@cleaningweb.com"
                className="p-2 rounded-lg bg-brand-bg hover:bg-brand-green/10 text-brand-green hover:text-brand-green-hover transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Our Services
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              {services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => handleSelectServiceFromCard(s.id)}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="hover:text-brand-orange transition-colors"
                >
                  About Our Cleaners
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  onClick={(e) => handleSmoothScroll(e, 'comparison')}
                  className="hover:text-brand-orange transition-colors"
                >
                  Quality Standards
                </a>
              </li>
              <li>
                <a
                  href="#blogs"
                  onClick={(e) => handleSmoothScroll(e, 'blogs')}
                  className="hover:text-brand-orange transition-colors"
                >
                  Clean Living Guides
                </a>
              </li>
              <li>
                <a
                  href="#booking-section"
                  onClick={(e) => handleSmoothScroll(e, 'booking-section')}
                  className="hover:text-brand-orange transition-colors"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-widest text-brand-green mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-500">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" /> 100 Cleaning Way, NY
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" /> +1 (800) SPARKLE
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" /> support@cleaningweb.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal links */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Cleaning.Web. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Vetted Portal
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Booking button */}
      <a
        href="#booking-section"
        onClick={(e) => handleSmoothScroll(e, 'booking-section')}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center shadow-2xl hover:scale-115 transition-transform"
        title="Go to secure booking calculator"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* GORGEOUS BLOG OVERLAY MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2 text-brand-green font-semibold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-brand-orange" /> Clean Living Guides
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="h-48 relative">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h3 className="font-display font-black text-2xl text-brand-green">
                {selectedBlog.title}
              </h3>
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {selectedBlog.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => {
                  setSelectedBlog(null);
                  handleSmoothScroll({ preventDefault: () => {} }, 'booking-section');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-green text-white hover:bg-brand-green-hover transition-all"
              >
                Book Cleaning Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EASTER EGG ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-3xl p-8 max-w-sm w-full border border-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto transition-transform hover:rotate-12 duration-300">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-800 tracking-tight">
                Admin Panel Login
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Authorized Personnel Only
              </p>
            </div>

            {adminError && (
              <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-semibold animate-pulse">
                <ShieldCheck className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Username
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-green/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminUsername('');
                    setAdminPassword('');
                    setAdminError('');
                  }}
                  className="flex-1 py-3 rounded-xl text-xs font-extrabold border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl text-xs font-extrabold bg-brand-green text-white hover:bg-brand-green-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-brand-green/10 cursor-pointer"
                >
                  Verify Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL ADMIN CONTROL PANEL DASHBOARD (ROBIN HOLESINSKY REFERENCE) */}
      {showAdminDashboard && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-50 rounded-3xl w-full max-w-6xl border border-slate-200/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] flex flex-row my-8 h-[85vh] animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
            {/* SIDEBAR NAVIGATION */}
            <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col justify-between shrink-0 p-6">
              <div className="space-y-8">
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5">
                  <CleanLogo />
                  <span className="font-display font-black text-lg tracking-wider text-slate-800 uppercase">
                    Cleaning<span className="text-brand-orange">.Admin</span>
                  </span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-500">
                  <button
                    onClick={() => setAdminActiveTab('overview')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer ${
                      adminActiveTab === 'overview'
                        ? 'bg-slate-100 text-brand-green shadow-sm'
                        : 'hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Overview</span>
                  </button>
                  <button
                    onClick={() => setAdminActiveTab('services')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer ${
                      adminActiveTab === 'services'
                        ? 'bg-slate-100 text-brand-green shadow-sm'
                        : 'hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Active Services</span>
                  </button>
                  <button
                    onClick={() => setAdminActiveTab('add-service')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer ${
                      adminActiveTab === 'add-service'
                        ? 'bg-slate-100 text-brand-green shadow-sm'
                        : 'hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                  <button
                    onClick={() => setAdminActiveTab('bookings')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left cursor-pointer ${
                      adminActiveTab === 'bookings'
                        ? 'bg-slate-100 text-brand-green shadow-sm'
                        : 'hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Bookings Log</span>
                  </button>
                </nav>
              </div>

              {/* Profile Card at bottom of sidebar */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand-green text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                    AD
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800 leading-tight">
                      Admin Manager
                    </h5>
                    <button
                      onClick={() => {
                        setIsAdminLoggedIn(false);
                        setShowAdminDashboard(false);
                      }}
                      className="text-[10px] text-slate-400 font-semibold hover:text-red-500 transition-colors uppercase tracking-wider"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* CONTENT AREA */}
            <main className="flex-grow p-8 overflow-y-auto bg-slate-50 flex flex-col">
              {/* Content Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 mb-6 shrink-0">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setShowAdminDashboard(false)}
                    className="p-1 rounded-lg hover:bg-slate-200 transition-all text-slate-400 hover:text-slate-700 cursor-pointer"
                    title="Back to website"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>
                  <h2 className="text-xl font-display font-black text-slate-800 tracking-tight">
                    {adminActiveTab === 'overview' && 'Overview'}
                    {adminActiveTab === 'services' && 'Active Services'}
                    {adminActiveTab === 'add-service' && 'Add Cleaning Type'}
                    {adminActiveTab === 'bookings' && 'Bookings Log'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowAdminDashboard(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm rounded-xl transition-all cursor-pointer"
                >
                  Close Panel
                </button>
              </div>

              {/* Dynamic Views */}
              <div className="flex-1 space-y-6">
                {adminActiveTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Stat Cards Row */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Stat 1 */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm space-y-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Total Revenue
                        </span>
                        <h3 className="text-3xl font-display font-black text-slate-800">
                          {formatPrice(bookings.reduce((sum, b) => sum + b.totalPrice, 0))}
                        </h3>
                      </div>
                      {/* Stat 2 */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm space-y-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Active Bookings
                        </span>
                        <h3 className="text-3xl font-display font-black text-slate-800">
                          {bookings.filter((b) => b.status === 'scheduled').length}
                        </h3>
                      </div>
                      {/* Stat 3 */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm space-y-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Service Categories
                        </span>
                        <h3 className="text-3xl font-display font-black text-slate-800">
                          {services.length}
                        </h3>
                      </div>
                    </div>

                    {/* Secondary Row (Recent Bookings & Quick Pricing) */}
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      {/* Left Side: Recent Bookings */}
                      <div className="lg:col-span-8 bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm space-y-4">
                        <h4 className="font-display font-black text-md text-slate-800 border-b border-slate-100 pb-2">
                          Recent Bookings
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                                <th className="py-2.5">Customer</th>
                                <th className="py-2.5">Service</th>
                                <th className="py-2.5">Date</th>
                                <th className="py-2.5 text-right">Amount</th>
                                <th className="py-2.5 text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                              {bookings
                                .slice(-5)
                                .reverse()
                                .map((b) => (
                                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3">
                                      <div>
                                        <span className="block font-bold text-slate-800">
                                          {b.name}
                                        </span>
                                        <span className="block text-[10px] text-slate-400">
                                          {b.email}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 capitalize">
                                      {services.find((s) => s.id === b.serviceType)?.title ||
                                        b.serviceType}
                                    </td>
                                    <td className="py-3 text-slate-400">{b.date}</td>
                                    <td className="py-3 text-right font-bold text-slate-800">
                                      {formatPrice(b.totalPrice)}
                                    </td>
                                    <td className="py-3 text-center">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                                          b.status === 'scheduled'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-slate-100 text-slate-600'
                                        }`}
                                      >
                                        {b.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right Side: Quick Pricing View */}
                      <div className="lg:col-span-4 bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm space-y-4">
                        <h4 className="font-display font-black text-md text-slate-800 border-b border-slate-100 pb-2">
                          Pricing Quick View
                        </h4>
                        <div className="space-y-3.5">
                          {services.slice(0, 5).map((s) => (
                            <div key={s.id} className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center text-white shrink-0 shadow-sm">
                                  {s.icon || <Sparkles className="w-3.5 h-3.5" />}
                                </div>
                                <span className="font-bold text-slate-700">{s.title}</span>
                              </div>
                              <span className="font-black text-brand-green">
                                {formatPrice(s.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {adminActiveTab === 'services' && (
                  <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <h4 className="font-display font-black text-md text-slate-800">
                        Manage Active Services ({services.length})
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Rates in Base USD ($)
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((s) => (
                        <div
                          key={s.id}
                          className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex justify-between items-center gap-4 hover:border-slate-300 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-200 relative">
                              <img
                                src={s.image}
                                alt={s.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] text-brand-orange uppercase font-bold tracking-wider block">
                                {s.badge}
                              </span>
                              <h5 className="font-display font-bold text-sm text-slate-800 leading-tight">
                                {s.title}
                              </h5>
                              <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[12rem]">
                                {s.desc}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <div className="w-20">
                              <label className="text-[8px] text-slate-400 uppercase font-bold block mb-0.5">
                                Base ($)
                              </label>
                              <div className="relative rounded-lg border border-slate-200 bg-white px-2 py-0.5 flex items-center shadow-inner">
                                <span className="text-xs text-slate-400 font-bold">$</span>
                                <input
                                  type="number"
                                  value={s.price}
                                  onChange={(e) => handleUpdatePrice(s.id, e.target.value)}
                                  onBlur={(e) => handleSavePrice(s.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.target.blur();
                                    }
                                  }}
                                  className="w-full pl-0.5 bg-transparent text-xs font-black text-slate-700 focus:outline-none"
                                  title="Press Enter or click away to save"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteService(s.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {adminActiveTab === 'add-service' && (
                  <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm max-w-xl">
                    <h4 className="font-display font-black text-md text-slate-800 border-b border-slate-100 pb-2 mb-4">
                      Add New Cleaning Category
                    </h4>
                    <form
                      onSubmit={handleAddServiceSubmit}
                      className="space-y-4 text-xs font-semibold text-slate-600"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Service Name */}
                        <div className="space-y-1">
                          <label>Service Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Washroom Sanitation"
                            value={newService.title}
                            onChange={(e) =>
                              setNewService((prev) => ({ ...prev, title: e.target.value }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                          />
                        </div>

                        {/* Base Price */}
                        <div className="space-y-1">
                          <label>Base Price (USD $) *</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g., 70"
                            value={newService.price}
                            onChange={(e) =>
                              setNewService((prev) => ({ ...prev, price: e.target.value }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Sub-Badge */}
                        <div className="space-y-1">
                          <label>Sub-Badge Text</label>
                          <input
                            type="text"
                            placeholder="e.g., Deep sanitize"
                            value={newService.badge}
                            onChange={(e) =>
                              setNewService((prev) => ({ ...prev, badge: e.target.value }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                          />
                        </div>

                        {/* Service Icon */}
                        <div className="space-y-1">
                          <label className="block">Service Icon</label>
                          <select
                            value={newService.iconId}
                            onChange={(e) =>
                              setNewService((prev) => ({ ...prev, iconId: e.target.value }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                          >
                            <option value="home">Home (Residential)</option>
                            <option value="office">Briefcase (Office)</option>
                            <option value="deep">Sparkles (Deep)</option>
                            <option value="washroom">Droplet (Washroom)</option>
                            <option value="city">MapPin (City)</option>
                            <option value="road">Trash2 (Road)</option>
                          </select>
                        </div>

                        {/* Image upload toggle */}
                        <div className="space-y-1">
                          <label className="block">Photo Source</label>
                          <select
                            value={photoSourceType}
                            onChange={(e) => setPhotoSourceType(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                          >
                            <option value="predefined">Predefined Library</option>
                            <option value="upload">Upload Custom Photo</option>
                          </select>
                        </div>
                      </div>

                      {/* Hidden general file input to be triggered via ref */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handlePhotoUpload(e);
                          if (e.target.files && e.target.files[0]) {
                            setPhotoSourceType('upload');
                          }
                          e.target.value = '';
                        }}
                        className="hidden"
                      />

                      {/* Conditionally show Photo Dropzone or predefined options */}
                      <div className="space-y-1">
                        <label className="block">Photo Selection *</label>
                        {photoSourceType === 'predefined' ? (
                          <div className="flex gap-2">
                            <select
                              value={newService.imageKey}
                              onChange={(e) =>
                                setNewService((prev) => ({ ...prev, imageKey: e.target.value }))
                              }
                              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                            >
                              <option value="residential">Cozy Bedroom (Residential)</option>
                              <option value="office">Corporate Workplace (Office)</option>
                              <option value="deep">Sparkling Counters (Deep Clean)</option>
                              <option value="washroom">Clean Bathroom (Washroom)</option>
                              <option value="city">Walkway Park (City Clean)</option>
                              <option value="road">Street Sweeper (Road Clean)</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold cursor-pointer text-xs transition-all flex items-center gap-1.5 shrink-0"
                            >
                              <Plus className="w-4 h-4 text-brand-orange" />
                              Add Photo
                            </button>
                          </div>
                        ) : (
                          <div>
                            {!uploadedBase64 ? (
                              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/20 hover:border-brand-green/45 hover:bg-slate-50/50 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                  <Plus className="w-5 h-5 text-brand-orange" />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-[11px] font-bold text-slate-700">
                                    Upload your custom cleaning category photo
                                  </p>
                                  <p className="text-[9px] text-slate-400 font-medium">
                                    Supports JPG, PNG up to 2MB
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg text-[10px] font-black transition-all shadow-sm cursor-pointer mt-1"
                                >
                                  Select Local Image
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 bg-slate-100 shadow-sm">
                                  <img
                                    src={uploadedBase64}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                    Custom Image Loaded
                                  </div>
                                  <div className="flex flex-col gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => fileInputRef.current?.click()}
                                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-800 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                      Change Photo
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUploadedBase64('');
                                        setPhotoSourceType('predefined');
                                      }}
                                      className="px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 hover:text-red-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                      Remove & Use Library
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label>Service Description</label>
                        <textarea
                          placeholder="Brief description of the cleaning scope..."
                          rows="3"
                          value={newService.desc}
                          onChange={(e) =>
                            setNewService((prev) => ({ ...prev, desc: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-brand-green text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-brand-orange text-white font-extrabold hover:bg-brand-orange-hover hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-orange/15 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Create Category
                      </button>
                    </form>
                  </div>
                )}

                {adminActiveTab === 'bookings' && (
                  <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-sm space-y-4">
                    <h4 className="font-display font-black text-md text-slate-800 border-b border-slate-100 pb-2">
                      Full Bookings Database ({bookings.length})
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="py-3">Booking ID</th>
                            <th className="py-3">Customer</th>
                            <th className="py-3">Service Category</th>
                            <th className="py-3">Area Size</th>
                            <th className="py-3">Frequency</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Staff Pro</th>
                            <th className="py-3 text-right">Total Price</th>
                            <th className="py-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                          {[...bookings].reverse().map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3.5 font-bold text-slate-700">{b.id}</td>
                              <td className="py-3.5">
                                <div>
                                  <span className="block font-bold text-slate-800">{b.name}</span>
                                  <span className="block text-[10px] text-slate-400">
                                    {b.email}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3.5 capitalize">
                                {services.find((s) => s.id === b.serviceType)?.title ||
                                  b.serviceType}
                              </td>
                              <td className="py-3.5 uppercase text-slate-500 font-bold">
                                {b.size}
                              </td>
                              <td className="py-3.5 uppercase text-[10px] font-bold text-slate-500">
                                {b.frequency}
                              </td>
                              <td className="py-3.5 text-slate-400">{b.date}</td>
                              <td className="py-3.5 text-slate-500">{b.cleaner || 'Unassigned'}</td>
                              <td className="py-3.5 text-right font-black text-slate-800">
                                {formatPrice(b.totalPrice)}
                              </td>
                              <td className="py-3.5 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                                    b.status === 'scheduled'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
