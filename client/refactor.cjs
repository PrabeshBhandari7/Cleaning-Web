const fs = require('fs');

try {
  let code = fs.readFileSync('src/App.jsx', 'utf8');

  // Convert Windows line endings to Unix for easier processing
  code = code.replace(/\r\n/g, '\n');

  const returnIndex = code.indexOf('  return (\n    <div className="min-h-screen');
  
  if (returnIndex !== -1) {
    const topPart = code.substring(0, returnIndex);
    
    const imports = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';\n`;

    const newReturn = `  return (
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
          <Route path="/" element={<Home services={services} formatPrice={formatPrice} isAfter={isAfter} setIsAfter={setIsAfter} />} />
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
`;
    
    const finalCode = topPart.replace("import AdminDashboard from './components/admin/AdminDashboard';", "import AdminDashboard from './components/admin/AdminDashboard';\n" + imports) + newReturn;

    fs.writeFileSync('src/App.jsx', finalCode);
    console.log("Refactoring complete");
  } else {
    console.log("Could not find the return statement to replace");
  }
} catch (error) {
  console.error("Error during refactoring:", error);
}
