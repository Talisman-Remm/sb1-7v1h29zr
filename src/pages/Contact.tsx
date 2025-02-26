import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const SERVICES = ['AI Agent', 'AI Phone Agent', 'Social Media Automation'] as const;
const WEBHOOK_URL = 'https://hook.us2.make.com/4mnej2ygadqhb3zafey90j29g125ka3b';

type FormData = {
  fullName: string;
  email: string;
  service: typeof SERVICES[number];
  companyName: string;
  problemDescription: string;
  additionalInfo: string;
};

const initialFormData: FormData = {
  fullName: '',
  email: '',
  service: SERVICES[0],
  companyName: '',
  problemDescription: '',
  additionalInfo: '',
};

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // If email was passed through navigation state, pre-fill it
    if (location.state?.email) {
      setFormData(prev => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  useEffect(() => {
    setCharacterCount(formData.problemDescription.length);
  }, [formData.problemDescription]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!formData.companyName.trim()) {
      toast.error('Please enter your company name');
      return false;
    }

    if (formData.problemDescription.length < 50) {
      toast.error('Problem description must be at least 50 characters');
      return false;
    }

    return true;
  };

  const sendToWebhook = async (data: FormData) => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          service: data.service,
          companyName: data.companyName,
          problemDescription: data.problemDescription,
          additionalInfo: data.additionalInfo,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook submission failed');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      // We don't want to show this error to the user since the Supabase submission succeeded
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // First, submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            service: formData.service,
            company_name: formData.companyName,
            problem_description: formData.problemDescription,
            additional_info: formData.additionalInfo,
            user_agent: navigator.userAgent,
          }
        ]);

      if (error) {
        throw error;
      }

      // If Supabase submission is successful, send to webhook
      await sendToWebhook(formData);

      toast.success('Thank you! We will contact you shortly.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold mb-2">Book a Call</h1>
          <p className="text-gray-400 mb-8">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
                >
                  {SERVICES.map((service) => (
                    <option key={service} value={service} className="bg-navy-900">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-300 mb-2">
                What problems are you looking to solve? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                required
                minLength={50}
                value={formData.problemDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
              />
              <p className="text-sm text-gray-400 mt-1">
                Characters: {characterCount}/50 minimum
              </p>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="text-sm text-gray-400">
              <p>
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
                . We'll handle your information in accordance with our privacy practices.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full flex items-center justify-center"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}