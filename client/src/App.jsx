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
  Droplet,
  Trash2,
  BookOpen,
  Zap,
} from 'lucide-react';

// EmailJS removed in favor of backend Nodemailer

// API base URL — single source of truth
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://platinumsmilecleaning.com/api' : 'http://localhost:5000/api');

// In-memory JWT store (NOT localStorage — prevents XSS token theft)
// The token is lost on page refresh, requiring the admin to log in again (intentional)
let _adminJwt = null;
const getAdminHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${_adminJwt}`,
});
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/BlogDetail';



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
      return Home;
    case 'office':
      return Briefcase;
    case 'deep':
      return Sparkles;
    case 'washroom':
      return Droplet;
    case 'city':
      return MapPin;
    case 'road':
      return Zap;
    default:
      return Sparkles;
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
    id: 'building',
    title: 'Building Cleaning Services',
    desc: 'Comprehensive cleaning for entire buildings, ensuring pristine common areas and exteriors.',
    price: 500,
    image: cityImg,
    imageKey: 'city',
    badge: 'Complete Building Care',
    iconId: 'city',
    icon: MapPin,
  },
  {
    id: 'residential',
    title: 'Residential Cleaning',
    desc: 'Detailed dusting, scrubbing, and sanitizing for apartments, villas, and family homes.',
    price: 150,
    image: residentialImg,
    imageKey: 'residential',
    badge: 'Detailed home care',
    iconId: 'home',
    icon: Home,
  },
  {
    id: 'commercial',
    title: 'Commercial Cleaning',
    desc: 'Organized and disinfected work desks, restrooms, and reception halls for businesses.',
    price: 300,
    image: officeImg,
    imageKey: 'office',
    badge: 'Sanitized workplaces',
    iconId: 'office',
    icon: Briefcase,
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    desc: 'Heavy-duty restore cleaning targeting baseboards, filters, and behind appliances.',
    price: 250,
    image: deepImg,
    imageKey: 'deep',
    badge: 'Pristine restoration',
    iconId: 'deep',
    icon: Sparkles,
  },
  {
    id: 'moveout',
    title: 'Move-In / Move-Out Cleaning',
    desc: 'End-of-tenancy scrubbing to secure security deposits and welcome new tenants.',
    price: 200,
    image: washroomImg,
    imageKey: 'washroom',
    badge: 'Ready for tenancy',
    iconId: 'home',
    icon: Home,
  },
  {
    id: 'painting',
    title: 'Painting Services',
    desc: 'Professional interior and exterior painting services with premium finishes.',
    price: 400,
    image: officeImg,
    imageKey: 'office',
    badge: 'Premium Finishes',
    iconId: 'deep',
    icon: Sparkles,
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    desc: 'Expert plumbing repairs, installations, and maintenance for homes and offices.',
    price: 150,
    image: washroomImg,
    imageKey: 'washroom',
    badge: 'Expert Repairs',
    iconId: 'washroom',
    icon: Droplet,
  },
  {
    id: 'wallpaper',
    title: 'Wallpaper Installation',
    desc: 'Precision wallpaper installation and removal for a perfect aesthetic upgrade.',
    price: 180,
    image: residentialImg,
    imageKey: 'residential',
    badge: 'Aesthetic Upgrade',
    iconId: 'home',
    icon: Home,
  },
  {
    id: 'carpentry',
    title: 'Carpentry & Wood Flooring',
    desc: 'Custom woodwork, flooring installation, and repairs by skilled carpenters.',
    price: 350,
    image: deepImg,
    imageKey: 'deep',
    badge: 'Skilled Woodwork',
    iconId: 'office',
    icon: Briefcase,
  },
  {
    id: 'plaster',
    title: 'Plaster Works',
    desc: 'High-quality plastering and wall finishing for a smooth, perfect surface.',
    price: 220,
    image: cityImg,
    imageKey: 'city',
    badge: 'Smooth Surfaces',
    iconId: 'city',
    icon: MapPin,
  },
  {
    id: 'decorative',
    title: 'Decorative & Finishing Works',
    desc: 'Final touches, moldings, and decorative accents to elevate your interior design.',
    price: 450,
    image: officeImg,
    imageKey: 'office',
    badge: 'Interior Elevation',
    iconId: 'deep',
    icon: Sparkles,
  },
];

function App() {
  const nameInputRef = useRef(null);

  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Before/After State
  const [isAfter, setIsAfter] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'residential',
    propertyType: 'apartment',
    message: '',
    addons: [],
  });

  const [calculatedPrice, setCalculatedPrice] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingPlaced, setBookingPlaced] = useState(false);
  const [placedBookingDetails, setPlacedBookingDetails] = useState(null);
  const [formHighlight, setFormHighlight] = useState(false);

  // Blog modal state
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Currency State (USD vs Dubai AED)
  const [currency, setCurrency] = useState('AED');

  // Admin Security & Dashboard State
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview' | 'services' | 'add-service' | 'bookings'

  // Dynamic Service State from Backend API
  // allServices: full list including inactive (used by admin panel)
  // services: only active services (used by public pages)
  const [allServices, setAllServices] = useState(defaultServicesList);
  const [servicesLoading, setServicesLoading] = useState(true);
  const services = allServices.filter((s) => s.isActive !== false);

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
  const fetchServices = async (bypassCache = false) => {
    try {
      const url = bypassCache ? `${API_BASE}/services?t=${Date.now()}` : `${API_BASE}/services`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.data) {
        // Store ALL services (including inactive) for admin panel
        setAllServices(
          data.data.map((s) => ({
            ...s,
            icon: getIconById(s.iconId),
            image: getImageById(s.imageKey),
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setServicesLoading(false);
    }
  };

  // Fetch helper to sync bookings with backend (admin only — requires JWT)
  const fetchBookings = async () => {
    if (!_adminJwt) return;
    try {
      const res = await fetch(`${API_BASE}/bookings`, { headers: getAdminHeaders() });
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
    let basePrice = selectedService ? selectedService.price : 150;

    // Property Type multiplier
    let sizeMultiplier = 1;
    if (formData.propertyType === 'apartment') sizeMultiplier = 1.0;
    if (formData.propertyType === 'villa') sizeMultiplier = 1.5;
    if (formData.propertyType === 'office') sizeMultiplier = 1.2;
    if (formData.propertyType === 'commercial') sizeMultiplier = 2.0;
    if (formData.propertyType === 'warehouse') sizeMultiplier = 2.5;

    let base = basePrice * sizeMultiplier;

    // Calculate addons
    if (formData.addons && formData.addons.length > 0) {
      if (formData.addons.includes('fridge')) base += 50;
      if (formData.addons.includes('oven')) base += 50;
      if (formData.addons.includes('balcony')) base += 100;
      if (formData.addons.includes('windows')) base += 150;
    }

    return Math.round(base);
  };

  // Recalculate price on select change
  useEffect(() => {
    setCalculatedPrice(calculatePrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.serviceType,
          propertyType: formData.propertyType,
          message: formData.message,
          addons: formData.addons,
          totalPrice: calculatedPrice,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        const details = {
          ...data.data,
          date: new Date(data.data.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        setPlacedBookingDetails(details);
        setBookingPlaced(true);

        // Backend now handles the email notification automatically.
        fetchBookings(); // sync state in admin panel
      } else {
        alert(data.message || 'Failed to register your quote.');
      }
    } catch (err) {
      console.error('Error placing booking quote:', err);
      alert('Network error placing booking quote. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
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
    // Let the natural link navigate to '/' on a single click.
    // Increment count.
    setLogoClickCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 5) {
        e.preventDefault(); // Prevent default link navigation only when triggering admin
        window.location.href = '/admin/dashboard';
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

  // Admin login — calls the backend API, receives JWT, stores in memory
  const handleAdminLoginSubmit = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        _adminJwt = data.token; // store JWT in memory only
        setIsAdminLoggedIn(true);
        setAdminError('');
        fetchBookings(); // now we have a token, fetch bookings
        return true;
      } else {
        setAdminError(data.message || 'Invalid credentials. Authorized Admin only.');
        return false;
      }
    } catch (err) {
      // Fallback for offline/demo mode using env variables
      const mockUser = import.meta.env.VITE_ADMIN_MOCK_USER;
      const mockPass = import.meta.env.VITE_ADMIN_MOCK_PASS;
      
      if (mockUser && mockPass && username === mockUser && password === mockPass) {
        _adminJwt = 'mock-jwt-token';
        setIsAdminLoggedIn(true);
        setAdminError('');
        return true;
      } else {
        setAdminError('Network error. Please check your connection.');
        return false;
      }
    }
  };

  const handleToggleActiveState = async (serviceId, currentActiveState) => {
    try {
      const res = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify({ isActive: !currentActiveState }),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices(true);
      } else {
        alert(data.message || 'Failed to toggle listing state.');
      }
    } catch (error) {
      console.error('Error toggling active state:', error);
      // Fallback for offline mode
      setAllServices((prev) =>
        prev.map((s) => (s.id === serviceId ? { ...s, isActive: !currentActiveState } : s))
      );
    }
  };

  const handleAddMockBooking = async () => {
    const names = ['Sarah Jenkins', 'Marcus Thorne', 'Elena Rodriguez', 'Jordan Smith', 'Maria Alvez', 'Robert King', 'Lisa Wong'];
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const servicesList = services.map(s => s.id);
    const serviceType = servicesList[Math.floor(Math.random() * servicesList.length)] || 'deep';
    const randomPrice = Math.floor(Math.random() * 300) + 100;
    const date = `2026-06-${Math.floor(Math.random() * 10) + 20}`;

    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedName,
          email: `${selectedName.toLowerCase().replace(' ', '')}@example.com`,
          serviceType: serviceType,
          size: '2-3bed',
          frequency: 'weekly',
          totalPrice: randomPrice,
          status: 'confirmed',
          date: date,
          cleaner: 'Staff Allocated'
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        alert('Mock Booking added successfully!');
      } else {
        alert(data.message || 'Failed to add mock booking.');
      }
    } catch (err) {
      console.error(err);
      // Fallback for offline mode
      const newMockBooking = {
        id: Date.now().toString(),
        name: selectedName,
        email: `${selectedName.toLowerCase().replace(' ', '')}@example.com`,
        serviceType: serviceType,
        size: '2-3bed',
        frequency: 'weekly',
        totalPrice: randomPrice,
        status: 'confirmed',
        date: date,
        cleaner: 'Staff Allocated'
      };
      setBookings(prev => [newMockBooking, ...prev]);
      alert('Mock Booking added successfully (Offline Mode)!');
    }
  };

  const handleUpdateBooking = async (bookingId, updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        return true;
      } else {
        alert(data.message || 'Failed to update booking.');
        return false;
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      // Fallback for offline mode
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ...updatedData } : b));
      return true;
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: getAdminHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        return true;
      } else {
        alert(data.message || 'Failed to delete booking.');
        return false;
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      // Fallback for offline mode
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      return true;
    }
  };

  const handleEditServiceSubmit = async (serviceId, updatedData) => {
    try {
      const res = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices(true);
        alert('Listing updated successfully!');
      } else {
        alert(data.message || 'Failed to update listing.');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      // Fallback for offline mode
      setAllServices(prev => prev.map(s => s.id === serviceId ? { ...s, ...updatedData } : s));
      alert('Listing updated successfully (Offline Mode)!');
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
      const res = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'DELETE',
        headers: getAdminHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices(true);
        if (formData.serviceType === serviceId) {
          const remaining = services.filter((s) => s.id !== serviceId);
          setFormData((prev) => ({ ...prev, serviceType: remaining[0].id }));
        }
      } else {
        alert(data.message || 'Failed to delete service.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      // Fallback for offline mode
      const remaining = allServices.filter((s) => s.id !== serviceId);
      setAllServices(remaining);
      if (formData.serviceType === serviceId && remaining.length > 0) {
        setFormData((prev) => ({ ...prev, serviceType: remaining[0].id }));
      }
    }
  };

  // Admin function: Update a service's base price in local state (for fast responsive typing)
  const handleUpdatePrice = (serviceId, value) => {
    const numericValue = Number(value) || 0;
    setAllServices((prev) =>
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
      const res = await fetch(`${API_BASE}/services/${serviceId}`, {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify({ price: numericValue }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to update base rate on server.');
        fetchServices(true);
      }
    } catch (error) {
      console.error('Error updating service price:', error);
      fetchServices(true);
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
      const res = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: getAdminHeaders(),
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
        fetchServices(true); // Reload services from server
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
      // Fallback for offline mode
      const offlineService = {
        id: 'offline-' + Date.now(),
        title: newService.title,
        desc: newService.desc || 'Premium custom cleaning service tailored by workspace administrator.',
        price: priceNum,
        badge: newService.badge || 'Professional service',
        iconId: newService.iconId,
        imageKey: finalImageKey,
        icon: getIconById(newService.iconId),
        image: getImageById(finalImageKey),
        isActive: true,
      };
      setAllServices(prev => [...prev, offlineService]);
      setNewService({
        title: '',
        desc: '',
        price: '',
        badge: '',
        iconId: 'deep',
        imageKey: 'deep',
      });
      setUploadedBase64('');
      alert('Service added successfully (Offline Mode)!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route element={
          <Layout
            CleanLogo={CleanLogo}
            handleLogoClick={handleLogoClick}
            isAdminLoggedIn={isAdminLoggedIn}
            currency={currency}
            setCurrency={setCurrency}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            services={services}
          />
        }>
          <Route path="/" element={<HomePage services={services} formatPrice={formatPrice} isAfter={isAfter} setIsAfter={setIsAfter} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage services={services} formatPrice={formatPrice} setFormData={setFormData} setFormHighlight={setFormHighlight} nameInputRef={nameInputRef} />} />
          <Route path="/blogs" element={<Blogs blogList={blogList} />} />
          <Route path="/contact" element={<Contact
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleBookingSubmit={handleBookingSubmit}
                    services={services}
                    formHighlight={formHighlight}
                    bookingPlaced={bookingPlaced}
                    setBookingPlaced={setBookingPlaced}
                    placedBookingDetails={placedBookingDetails}
                    setFormData={setFormData}
                    formatPrice={formatPrice}
                    nameInputRef={nameInputRef}
                    isSubmitting={isSubmitting} />} />
          <Route path="/blogs/:id" element={<BlogDetail blogList={blogList} />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={
          isAdminLoggedIn ? <Navigate to="/admin/dashboard" replace /> :
          <AdminLogin
            onSubmit={handleAdminLoginSubmit}
            error={adminError}
            setAdminError={setAdminError}
          />
        } />

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin/dashboard/*" element={
          isAdminLoggedIn ? (
            <AdminDashboard
              bookings={bookings}
              services={allServices}
              formatPrice={formatPrice}
              currency={currency}
              setCurrency={setCurrency}
              onLogout={() => {
                setIsAdminLoggedIn(false);
              }}
              onToggleActiveState={handleToggleActiveState}
              onAddMockBooking={handleAddMockBooking}
              onUpdateBooking={handleUpdateBooking}
              onDeleteBooking={handleDeleteBooking}
              onEditServiceSubmit={handleEditServiceSubmit}
              onUpdatePrice={handleUpdatePrice}
              onSavePrice={handleSavePrice}
              onDeleteService={handleDeleteService}
              newService={newService}
              setNewService={setNewService}
              photoSourceType={photoSourceType}
              setPhotoSourceType={setPhotoSourceType}
              uploadedBase64={uploadedBase64}
              setUploadedBase64={setUploadedBase64}
              fileInputRef={fileInputRef}
              onPhotoUpload={handlePhotoUpload}
              onAddServiceSubmit={handleAddServiceSubmit}
              getAdminHeaders={getAdminHeaders}
            />
          ) : <Navigate to="/admin/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
