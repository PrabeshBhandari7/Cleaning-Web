import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blogs({ blogList }) {
  return (
    <>
      <Helmet>
        <title>Clean Living Guides & Blogs | Platinum Smile</title>
        <meta name="description" content="Read our latest guides, tips, and news on maintaining a clean and healthy environment in Dubai." />
      </Helmet>
      
      <section className="py-20 bg-brand-bg">
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
                <Link
                  to={`/blogs/${blog.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orange-hover cursor-pointer"
                >
                  Read Full Article <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
