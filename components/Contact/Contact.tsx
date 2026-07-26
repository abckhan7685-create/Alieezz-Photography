'use client';

import { useState, useEffect } from 'react';
import { submitInquiry } from '@/app/actions/inquiry';

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shootType: 'wedding',
    date: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    const result = await submitInquiry(data);
    
    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    } else {
      setFeedback({ type: 'success', message: `Thank you, ${data.get('name')}. Your inquiry has been received.` });
      setFormData({ name: '', email: '', shootType: 'wedding', date: '', message: '' });
      // Close modal after success after a short delay
      setTimeout(() => {
        setIsModalOpen(false);
        setFeedback(null);
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="contact-massive-section" id="contact">
        <div className="massive-bg-element"></div>
        <div className="section-container">
          <div className="massive-content">
            <span className="section-tag center-tag">Inquiries</span>
            <h2 className="massive-title">
              <span>Let's Create</span>
              <br />
              <span className="gold-text italic-text">Something Timeless.</span>
            </h2>
            <p className="massive-subtitle">
              We take on a strictly limited number of commissions each year to ensure the highest 
              level of dedication to every story.
            </p>
            <button 
              className="inquire-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Check Availability</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Full-Screen Inquiry Modal */}
      <div className={`contact-modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        
        <div className="modal-content-wrapper">
          <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="minimalist-form-container">
            <div className="modal-header">
              <h3>Your Story Begins Here</h3>
              <p>Please share the details of your event below.</p>
            </div>

            <form className="minimalist-form" onSubmit={handleSubmit}>
              <div className="min-input-group">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="What is your full name?" required />
                <label htmlFor="name">Name</label>
              </div>

              <div className="min-input-group">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Where can we reach you?" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="min-form-row">
                <div className="min-input-group">
                  <select id="shootType" name="shootType" value={formData.shootType} onChange={handleChange} required>
                    <option value="wedding">Heritage Wedding</option>
                    <option value="portrait">Fine Art Portrait</option>
                    <option value="cinematic">Cinematic Editorial</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  <label htmlFor="shootType">Shoot Type</label>
                </div>
                
                <div className="min-input-group">
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                  <label htmlFor="date">Proposed Date</label>
                </div>
              </div>

              <div className="min-input-group">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Tell us about your vision, location, and what inspires you..." required></textarea>
                <label htmlFor="message">Project Details</label>
              </div>

              {feedback && (
                <div className={`min-feedback ${feedback.type}`}>
                  {feedback.message}
                </div>
              )}

              <div className="min-submit-wrapper">
                <button type="submit" className="min-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
