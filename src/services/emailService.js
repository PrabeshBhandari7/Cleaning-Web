import emailjs from '@emailjs/browser';

/**
 * Sends a notification email when a booking is created or updated.
 * Uses EmailJS with environment variables, falls back to simulated mode if variables are missing.
 * 
 * Required Vite environment variables (add to .env):
 * VITE_EMAILJS_SERVICE_ID
 * VITE_EMAILJS_TEMPLATE_ID
 * VITE_EMAILJS_PUBLIC_KEY
 */
export const sendBookingNotification = async (bookingDetails) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const templateParams = {
    booking_id: bookingDetails.id || 'N/A',
    customer_name: bookingDetails.name,
    customer_email: bookingDetails.email,
    service_type: bookingDetails.serviceType,
    area_size: bookingDetails.size || 'N/A',
    frequency: bookingDetails.frequency || 'once',
    price: bookingDetails.totalPrice || bookingDetails.price,
    date: bookingDetails.date || new Date().toLocaleDateString(),
    assigned_cleaner: bookingDetails.cleaner || 'Unassigned',
  };

  // Check if we have the configuration
  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      '⚠️ EmailJS keys are missing from environment variables (.env). ' +
      'Simulating email delivery in development mode.'
    );
    console.log('--- SIMULATED EMAIL CONTENT ---');
    console.log('To: Admin & Customer');
    console.log('Template Parameters:', templateParams);
    console.log('--------------------------------');
    
    // Return a simulated successful response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, text: 'OK (Simulated)' });
      }, 1000);
    });
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('✉️ EmailJS response:', response);
    return response;
  } catch (error) {
    console.error('❌ EmailJS failed to send email:', error);
    throw error;
  }
};
