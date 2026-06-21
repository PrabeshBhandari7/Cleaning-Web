import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Platinum Smile Dubai</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <section className="bg-brand-bg py-32 flex flex-col items-center justify-center text-center px-6 min-h-[60vh]">
        <h1 className="text-9xl font-display font-black text-brand-orange mb-4">404</h1>
        <h2 className="text-3xl font-display font-bold text-brand-green mb-6">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-brand-green text-white hover:bg-brand-green-hover transition-colors shadow-lg"
        >
          <Home className="w-5 h-5" />
          Back to Homepage
        </Link>
      </section>
    </>
  );
}
