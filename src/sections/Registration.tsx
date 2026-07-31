import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SectionHeading from '../components/SectionHeading';
import { RegistrationFormData } from '../types';
import { CheckCircle, Loader2 } from 'lucide-react';

export const Registration: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const role = watch('role');

  const onSubmit = (data: RegistrationFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log('Form data:', data);
    }, 2000);
  };

  return (
    <section id="register" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading badge="Register" title="Register Now" />
        
        <div className="mt-16">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-success/30 rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-success" />
              </motion.div>
              <h3 className="text-3xl font-space font-bold text-white mb-4">Registration Successful!</h3>
              <p className="text-text">Thank you for registering. We have sent the confirmation details to your email.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Full Name</label>
                    <input
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Email Address</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Phone Number</label>
                    <input
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^\d{10}$/, message: 'Must be 10 digits' }
                      })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all"
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">College / Company</label>
                    <input
                      {...register('college', { required: 'College or Company is required' })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all"
                      placeholder="UIT / ACME Corp"
                    />
                    {errors.college && <p className="text-red-400 text-sm">{errors.college.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Role</label>
                  <div className="relative">
                    <select
                      {...register('role', { required: 'Role is required' })}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all appearance-none"
                    >
                      <option value="" className="bg-dark text-white">Select a role</option>
                      <option value="Student" className="bg-dark text-white">Student</option>
                      <option value="Founder" className="bg-dark text-white">Founder</option>
                      <option value="Investor" className="bg-dark text-white">Investor</option>
                      <option value="Mentor" className="bg-dark text-white">Mentor</option>
                      <option value="Professional" className="bg-dark text-white">Professional</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {errors.role && <p className="text-red-400 text-sm">{errors.role.message}</p>}
                </div>

                {role === 'Founder' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-white/70">Startup Name (Optional)</label>
                    <input
                      {...register('startupName')}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all"
                      placeholder="Your Startup"
                    />
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-4 font-semibold text-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Complete Registration</span>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
