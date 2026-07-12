'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitWaitlist } from '@/app/actions';

export default function WaitlistForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    websiteExperience: 'never',
    goalsOption: 'portfolio',
    timeCommitment: 'yes',
    profileLink: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [queuePosition, setQueuePosition] = useState(148);
  const [isMocked, setIsMocked] = useState(false);

  useEffect(() => {
    const savedPos = localStorage.getItem('earlio_queue_pos');
    if (savedPos) {
      const pos = parseInt(savedPos, 10);
      setTimeout(() => setQueuePosition(pos), 0);
    } else {
      const randomStart = Math.floor(Math.random() * 50) + 120;
      localStorage.setItem('earlio_queue_pos', randomStart.toString());
      setTimeout(() => setQueuePosition(randomStart), 0);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.college) {
      setStatus('error');
      setErrorMessage('Please fill in name, email, and college/status.');
      return;
    }
    setStatus('idle');
    setErrorMessage('');
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Map form fields to waitlist schema
      const skillString = `WebDev Foundations (Exp: ${formData.websiteExperience}, Goal: ${formData.goalsOption}, Commitment: ${formData.timeCommitment}, Link: ${formData.profileLink || 'none'})`;
      
      const response = await submitWaitlist({
        name: formData.name,
        email: formData.email,
        college: formData.college,
        skill: skillString,
      });
      
      if (response.success) {
        setStatus('success');
        setIsMocked(!!response.isMocked);
        
        const existing = JSON.parse(localStorage.getItem('earlio_local_signups') || '[]');
        existing.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('earlio_local_signups', JSON.stringify(existing));
        
        const nextPos = queuePosition + 1;
        setQueuePosition(nextPos);
        localStorage.setItem('earlio_queue_pos', nextPos.toString());
      } else {
        setStatus('error');
        setErrorMessage(response.message);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.div
            key="application-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="card p-6 sm:p-10 !rounded-xl relative overflow-hidden"
          >
            {/* Header info */}
            <div className="mb-6 border-b border-[#1A2234] pb-6">
              <div className="flex items-center gap-2 text-[#7667F5] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Cohort 01 Application (Step {step} of 2)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F7F8FA] mt-2">
                Apply for the Launch Cohort
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B0C0] mt-2 leading-relaxed">
                Cohort 01 is limited to 15 learners so project work can be reviewed closely.
              </p>
            </div>

            {/* Step 1 Form */}
            {step === 1 ? (
              <form onSubmit={nextStep} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] placeholder-slate-700 focus:outline-none focus:border-[#7667F5]/50 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] placeholder-slate-700 focus:outline-none focus:border-[#7667F5]/50 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    College / Current Status
                  </label>
                  <input
                    type="text"
                    name="college"
                    id="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="IIT Madras, Stanford, Student, or Freelancer"
                    required
                    className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] placeholder-slate-700 focus:outline-none focus:border-[#7667F5]/50 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="websiteExperience" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    Have you built a website before?
                  </label>
                  <div className="relative">
                    <select
                      name="websiteExperience"
                      id="websiteExperience"
                      value={formData.websiteExperience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] appearance-none focus:outline-none focus:border-[#7667F5]/50 transition-colors cursor-pointer text-sm font-medium"
                    >
                      <option value="never">Never</option>
                      <option value="beginner">Beginner</option>
                      <option value="projects">Built a few projects</option>
                      <option value="freelance">Freelance experience</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707B90]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 px-6 btn-primary flex items-center justify-center gap-2 cursor-pointer font-bold text-sm"
                >
                  Next Step: Commitment & Goals
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="goalsOption" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    What do you hope to achieve after this cohort?
                  </label>
                  <div className="relative">
                    <select
                      name="goalsOption"
                      id="goalsOption"
                      value={formData.goalsOption}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] appearance-none focus:outline-none focus:border-[#7667F5]/50 transition-colors cursor-pointer text-sm font-medium"
                    >
                      <option value="portfolio">Build my portfolio</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                      <option value="job">Job</option>
                      <option value="skill">Learn a new skill</option>
                      <option value="business">Start a business</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707B90]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeCommitment" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    Can you commit 1–2 hours daily for four weeks?
                  </label>
                  <div className="relative">
                    <select
                      name="timeCommitment"
                      id="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] appearance-none focus:outline-none focus:border-[#7667F5]/50 transition-colors cursor-pointer text-sm font-medium"
                    >
                      <option value="yes">Yes, I can commit this time fully.</option>
                      <option value="no">No, I cannot commit this daily duration.</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#707B90]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="profileLink" className="block text-[10px] font-mono font-semibold text-[#707B90] uppercase tracking-wider mb-2">
                    Link to LinkedIn or Portfolio (Optional)
                  </label>
                  <input
                    type="url"
                    name="profileLink"
                    id="profileLink"
                    value={formData.profileLink}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-[#080B14] border border-[#222B3D] rounded-lg text-[#F7F8FA] placeholder-slate-700 focus:outline-none focus:border-[#7667F5]/50 transition-colors text-sm"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-3.5 border border-[#222B3D] text-xs font-mono text-[#A7B0C0] hover:text-[#F7F8FA] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex-1 py-3.5 px-6 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 font-bold text-sm cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Cohort Application
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 border-t border-[#1A2234] pt-4 text-center">
              <div className="text-[10px] font-mono text-[#707B90] uppercase tracking-wider font-semibold">Application Process</div>
              <div className="flex justify-between items-center max-w-xs mx-auto mt-2 text-[10px] text-[#707B90] font-mono">
                <span>1. Submit</span>
                <span className="text-[#222B3D]">→</span>
                <span>2. Review</span>
                <span className="text-[#222B3D]">→</span>
                <span>3. Interview</span>
                <span className="text-[#222B3D]">→</span>
                <span>4. Decided</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="card p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#22C99A]/10 border border-[#22C99A]/20 rounded-full flex items-center justify-center text-[#22C99A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#F7F8FA] mb-3">
              Application Logged
            </h3>
            <p className="text-[#A7B0C0] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Thank you, <span className="text-[#F7F8FA] font-medium">{formData.name}</span>. Your application for Website Development Foundations Cohort 01 is recorded. We will review your responses and contact you at <span className="text-[#F7F8FA] font-medium">{formData.email}</span> shortly.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
              <div className="bg-[#0D1220] border border-[#222B3D] rounded-xl p-4">
                <div className="text-[10px] text-[#707B90] uppercase tracking-wider font-mono">Queue Position</div>
                <div className="text-xl font-bold text-[#7667F5] mt-1">#{queuePosition}</div>
              </div>
              <div className="bg-[#0D1220] border border-[#222B3D] rounded-xl p-4">
                <div className="text-[10px] text-[#707B90] uppercase tracking-wider font-mono">Status</div>
                <div className="text-xs font-semibold text-[#22C99A] mt-2 flex items-center justify-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C99A] animate-pulse" />
                  PENDING_REVIEW
                </div>
              </div>
            </div>

            <div className="text-xs">
              {isMocked ? (
                <span className="bg-blue-500/10 text-blue-300 px-3 py-1.5 rounded-full border border-blue-500/20 text-[10px] font-mono">
                  MOCK_MODE_SAVED_LOCAL
                </span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/20 text-[10px] font-mono">
                  SUPABASE_DB_INSERTED
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setFormData({ name: '', email: '', college: '', websiteExperience: 'never', goalsOption: 'portfolio', timeCommitment: 'yes', profileLink: '' });
                setStep(1);
                setStatus('idle');
              }}
              className="mt-6 text-xs text-[#7667F5] hover:text-[#8B7CF6] font-medium transition-colors cursor-pointer block mx-auto font-mono uppercase"
            >
              Apply another user
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
