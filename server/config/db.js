// Mock Database Connection and Seed Data
// In a real application, you would connect to PostgreSQL, MySQL, or MongoDB here.

const defaultServices = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    desc: 'Detailed dusting, scrubbing, and sanitizing for apartments and family homes.',
    price: 120,
    imageKey: 'residential',
    badge: 'Detailed home care',
    iconId: 'home',
  },
  {
    id: 'office',
    title: 'Office Cleaning',
    desc: 'Organized and disinfected work desks, restrooms, and reception halls.',
    price: 250,
    imageKey: 'office',
    badge: 'Sanitized workplaces',
    iconId: 'office',
  },
  {
    id: 'deep',
    title: 'Deep Cleaning',
    desc: 'Heavy-duty restore cleaning targeting baseboards, filters, and behind appliances.',
    price: 180,
    imageKey: 'deep',
    badge: 'Pristine restoration',
    iconId: 'deep',
  },
  {
    id: 'washroom',
    title: 'Washroom Disinfection',
    desc: 'Complete wall-to-floor bleaching, grout scrubbing, and biological sanitization.',
    price: 70,
    imageKey: 'washroom',
    badge: 'Hygienic restrooms',
    iconId: 'washroom',
  },
  {
    id: 'city',
    title: 'City & Municipal Clean',
    desc: 'Public park sweeps, municipal trash removal, and local square power washing.',
    price: 450,
    imageKey: 'city',
    badge: 'Community spaces',
    iconId: 'city',
  },
  {
    id: 'road',
    title: 'Road Sweeping & Washing',
    desc: 'Heavy road sweeper broom cleaning and high-pressure asphalt wash.',
    price: 380,
    imageKey: 'road',
    badge: 'Clean thoroughfares',
    iconId: 'road',
  },
  {
    id: 'construction',
    title: 'Post-Construction Detail',
    desc: 'Removing brick dust, paint marks, plaster smears, and structural cleanup.',
    price: 320,
    imageKey: 'deep',
    badge: 'Dust & debris clearance',
    iconId: 'deep',
  },
  {
    id: 'moveout',
    title: 'Move-In / Move-Out Clean',
    desc: 'End-of-tenancy scrubbing to secure security deposits and welcome new tenants.',
    price: 220,
    imageKey: 'residential',
    badge: 'Ready for tenancy',
    iconId: 'home',
  },
  {
    id: 'carpet',
    title: 'Carpet & Upholstery Steam',
    desc: 'High-temp steam soil extraction for carpets, sofas, and office seating.',
    price: 90,
    imageKey: 'office',
    badge: 'Steam soil extraction',
    iconId: 'deep',
  },
];

const fs = require('fs');
const path = require('path');

const servicesFilePath = path.join(__dirname, 'services.json');

const saveServicesToFile = () => {
  try {
    fs.writeFileSync(servicesFilePath, JSON.stringify(mockDatabase.services, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving services to file:', error);
  }
};

const loadServicesFromFile = () => {
  try {
    if (fs.existsSync(servicesFilePath)) {
      const data = fs.readFileSync(servicesFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading services from file:', error);
  }
  try {
    fs.writeFileSync(servicesFilePath, JSON.stringify(defaultServices, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing initial services.json:', err);
  }
  return defaultServices;
};

const bookingsFilePath = path.join(__dirname, 'bookings.json');

const saveBookingsToFile = () => {
  try {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(mockDatabase.bookings, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving bookings to file:', error);
  }
};

const loadBookingsFromFile = () => {
  const defaultBookings = [
    {
      id: 'CW-84092-DEEP',
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'deep',
      size: '2-3bed',
      frequency: 'weekly',
      totalPrice: 204,
      status: 'scheduled',
      date: '2026-06-24',
      cleaner: 'Sarah Jenkins (⭐️ 4.95)',
    },
    {
      id: 'CW-19283-MOVE',
      name: 'Jane Smith',
      email: 'jane@example.com',
      serviceType: 'residential',
      size: 'studio',
      frequency: 'once',
      totalPrice: 96,
      status: 'completed',
      date: '2026-06-18',
      cleaner: 'Sarah Jenkins (⭐️ 4.95)',
    },
  ];

  try {
    if (fs.existsSync(bookingsFilePath)) {
      const data = fs.readFileSync(bookingsFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading bookings from file:', error);
  }
  try {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(defaultBookings, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing initial bookings.json:', err);
  }
  return defaultBookings;
};

const mockDatabase = {
  bookings: loadBookingsFromFile(),
  services: loadServicesFromFile(),
};

const connectDB = async () => {
  try {
    console.log('📦 Database configuration loaded successfully.');
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, mockDatabase, saveServicesToFile, saveBookingsToFile };

