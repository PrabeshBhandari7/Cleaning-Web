import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BlogDetail({ blogList }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const selectedBlog = blogList.find((b) => b.id.toString() === id);

  useEffect(() => {
    // Scroll to top when this view mounts
    window.scrollTo(0, 0);
  }, []);

  if (!selectedBlog) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-display font-black text-brand-green mb-4">Blog Not Found</h2>
        <Link to="/blogs" className="text-brand-orange hover:underline font-bold">Return to Clean Living Guides</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{selectedBlog.title} | Platinum Smile</title>
        <meta name="description" content={selectedBlog.short} />
      </Helmet>
      
      <section className="py-20 bg-brand-bg relative min-h-[80vh]">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate('/blogs')}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-orange transition-colors"
          >
            <X className="w-4 h-4" /> Back to Blogs
          </button>
          
          <div className="bg-white rounded-3xl shadow-xl w-full overflow-hidden">
            <div className="h-64 sm:h-96 relative bg-slate-100">
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h2 className="absolute bottom-6 left-6 right-6 text-2xl sm:text-5xl font-display font-black text-white leading-tight">
                {selectedBlog.title}
              </h2>
            </div>
            
            <div className="p-8 sm:p-12 space-y-8">
              <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                {selectedBlog.short}
              </p>
              
              <div className="h-px bg-slate-100 w-full"></div>
              
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-loose whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
