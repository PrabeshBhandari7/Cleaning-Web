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
} from 'lucide-react';

import { sendBookingNotification } from './services/emailService';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';



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
    id: 'building',
    title: 'Building Cleaning Services',
    desc: 'Comprehensive cleaning for entire buildings, ensuring pristine common areas and exteriors.',
    price: 500,
    image: cityImg,
    imageKey: 'city',
    badge: 'Complete Building Care',
    iconId: 'city',
    icon: <MapPin className="w-5 h-5 text-white" />,
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
    icon: <Home className="w-5 h-5 text-white" />,
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
    icon: <Briefcase className="w-5 h-5 text-white" />,
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
    icon: <Sparkles className="w-5 h-5 text-white" />,
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
    icon: <Home className="w-5 h-5 text-white" />,
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
    icon: <Sparkles className="w-5 h-5 text-white" />,
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
    icon: <Droplet className="w-5 h-5 text-white" />,
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
    icon: <Home className="w-5 h-5 text-white" />,
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
    icon: <Briefcase className="w-5 h-5 text-white" />,
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
    icon: <MapPin className="w-5 h-5 text-white" />,
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
    phone: '',
    email: '',
    serviceType: 'residential',
    propertyType: 'villa',
    message: '',
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
    let basePrice = selectedService ? selectedService.price : 150;

    // Property Type multiplier
    let sizeMultiplier = 1;
    if (formData.propertyType === 'apartment') sizeMultiplier = 1.0;
    if (formData.propertyType === 'villa') sizeMultiplier = 1.5;
    if (formData.propertyType === 'office') sizeMultiplier = 1.2;
    if (formData.propertyType === 'commercial') sizeMultiplier = 2.0;
    if (formData.propertyType === 'warehouse') sizeMultiplier = 2.5;

    let discount = 1.0;

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
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.serviceType,
          propertyType: formData.propertyType,
          message: formData.message,
          totalPrice: calculatedPrice,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
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

        // Dispatch EmailJS email notification
        try {
          await sendBookingNotification(details);
        } catch (emailErr) {
          console.error('Email notification failed to dispatch:', emailErr);
        }

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

  const handleAdminLoginSubmit = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
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
    <Router>
      <Routes>
        <Route element={
          <Layout 
            CleanLogo={CleanLogo}
            handleLogoClick={handleLogoClick}
            isAdminLoggedIn={isAdminLoggedIn}
            setShowAdminDashboard={setShowAdminDashboard}
            setShowAdminLogin={setShowAdminLogin}
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
          <Route path="/blogs" element={<Blogs blogList={blogList} setSelectedBlog={setSelectedBlog} />} />
          <Route path="/contact" element={<Contact formData={formData} handleInputChange={handleInputChange} handleBookingSubmit={handleBookingSubmit} services={services} formHighlight={formHighlight} bookingPlaced={bookingPlaced} setBookingPlaced={setBookingPlaced} placedBookingDetails={placedBookingDetails} setFormData={setFormData} formatPrice={formatPrice} nameInputRef={nameInputRef} />} />
        </Route>
      </Routes>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin 
          adminUsername={adminUsername}
          setAdminUsername={setAdminUsername}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          handleAdminLoginSubmit={handleAdminLoginSubmit}
          setShowAdminLogin={setShowAdminLogin}
          adminError={adminError}
        />
      )}

      {/* Admin Dashboard Overlay */}
      {showAdminDashboard && (
        <AdminDashboard 
          setShowAdminDashboard={setShowAdminDashboard}
          adminActiveTab={adminActiveTab}
          setAdminActiveTab={setAdminActiveTab}
          bookings={bookings}
          services={services}
          handleDeleteService={handleDeleteService}
          handleUpdatePrice={handleUpdatePrice}
          handleSavePrice={handleSavePrice}
          newService={newService}
          setNewService={setNewService}
          photoSourceType={photoSourceType}
          setPhotoSourceType={setPhotoSourceType}
          uploadedBase64={uploadedBase64}
          handlePhotoUpload={handlePhotoUpload}
          handleAddServiceSubmit={handleAddServiceSubmit}
          formatPrice={formatPrice}
        />
      )}

      {/* Blog Detail Overlay Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedBlog(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-800 hover:bg-white shadow-sm transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 sm:h-80 relative bg-slate-100">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h2 className="absolute bottom-6 left-6 right-6 text-2xl sm:text-4xl font-display font-black text-white leading-tight">
                {selectedBlog.title}
              </h2>
            </div>
            <div className="p-6 sm:p-10 space-y-6">
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {selectedBlog.short}
              </p>
              <div className="h-px bg-slate-100 w-full"></div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-loose whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
