'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Check, 
  ChevronDown,
  Terminal,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import WaitlistForm from '@/components/WaitlistForm';
import Image from 'next/image';

/* ─── FAQ Component ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#1A2234] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 font-semibold text-[#F7F8FA] hover:text-[#7667F5] transition-colors focus:outline-none cursor-pointer group"
      >
        <span className="text-base sm:text-lg pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#707B90] group-hover:text-[#7667F5] transition-all duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#7667F5]' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] text-[#A7B0C0] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ Data ─── */
const faqItems = [
  { 
    question: "Do I need previous coding experience to apply?", 
    answer: "No. Website Development Foundations is designed for absolute beginners. We focus on layouts, structure, and deploying your first web pages from scratch." 
  },
  { 
    question: "What is the time commitment required?", 
    answer: "You should plan to dedicate about 1 to 2 hours per day for four weeks. This includes reviewing daily concepts and completing corresponding tasks." 
  },
  { 
    question: "How is this different from a self-paced video course?", 
    answer: "Earlio is completely project-driven. You don't just watch videos; you execute daily tasks, receive real mentor feedback on your actual project files, and compile a public portfolio. You exit with deployed projects instead of certificates." 
  },
  { 
    question: "Is there a fee for Cohort 01?", 
    answer: "For our initial validation pilot, we are selecting 15 learners. Fee details and potential sponsorships will be shared with applicants who qualify for the final selection interview." 
  },
  { 
    question: "Are internships or jobs guaranteed?", 
    answer: "No. Earlio builds your practical ability and matches you with real project frameworks. Securing a contract, job, or internship depends on your portfolio strength, outreach efforts, and client alignment." 
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<'restaurant' | 'gym' | 'portfolio'>('gym');

  // Unified interactive workspace mock project data
  const projectMockData = {
    restaurant: {
      title: "Restaurant Website",
      status: "COMPLETED",
      statusColor: "text-green",
      tasks: [
        { label: "Design Homepage Layout", status: "done" },
        { label: "Build Navigation Component", status: "done" },
        { label: "Create Pricing Section", status: "done" },
        { label: "Responsive Layout Testing", status: "done" }
      ],
      feedback: "Navigation is clean. Spacing corrected on tablet sizes. Good deployment audit.",
      deployment: "restaurant-demo.earlio.app",
      progress: "100%",
      width: "w-full"
    },
    gym: {
      title: "Gym Website",
      status: "IN REVIEW",
      statusColor: "text-purple",
      tasks: [
        { label: "Design Homepage Layout", status: "done" },
        { label: "Build Navigation Component", status: "done" },
        { label: "Create Pricing Section", status: "doing" },
        { label: "Responsive Layout Testing", status: "todo" }
      ],
      feedback: "Good component structure. Optimize spacing on tablet screens.",
      deployment: "Ready for publishing",
      progress: "43%",
      width: "w-[43%]"
    },
    portfolio: {
      title: "Portfolio Website",
      status: "UPCOMING",
      statusColor: "text-[#707B90]",
      tasks: [
        { label: "Design Homepage Layout", status: "todo" },
        { label: "Build Navigation Component", status: "todo" },
        { label: "Create Pricing Section", status: "todo" },
        { label: "Responsive Layout Testing", status: "todo" }
      ],
      feedback: "Awaiting start of task block. Initial template loaded.",
      deployment: "Locked",
      progress: "0%",
      width: "w-0"
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B14] text-[#A7B0C0] overflow-hidden font-sans antialiased">
      
      {/* Restrained dot grid background */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0 opacity-20" />

      {/* Subtle background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] glow-purple-soft opacity-30" />
      </div>

      {/* ─── Header Navigation ─── */}
      <header className="sticky top-0 z-50 flat-nav">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-1">
            <Image src="/logo-v2.jpg" alt="Earlio Logo" width={36} height={36} className="shrink-0 object-contain -mr-2" />
            <span className="text-lg font-bold tracking-tight text-[#F7F8FA]">earlio</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#707B90]" aria-label="Main Navigation">
            <a href="#why-exists" className="hover:text-[#F7F8FA] transition-colors">Why Earlio</a>
            <a href="#product-centerpiece" className="hover:text-[#F7F8FA] transition-colors">The Workspace</a>
            <a href="#what-you-get" className="hover:text-[#F7F8FA] transition-colors">What You Get</a>
            <a href="#syllabus" className="hover:text-[#F7F8FA] transition-colors">Syllabus</a>
            <a href="#roadmap" className="hover:text-[#F7F8FA] transition-colors">Roadmap</a>
          </nav>
          <a href="#apply" className="btn-primary px-4 py-2 text-xs font-semibold tracking-wider transition-all">
            Apply for Cohort 01
          </a>
        </div>
      </header>

      {/* ═══════════════════════ SECTION 1: HERO SECTION ═══════════════════════ */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 max-w-xl">
              <span className="tag mb-6 font-mono text-[10px] uppercase">
                <Sparkles className="w-3 h-3 text-[#7667F5]" />
                Building Now: Website Development Cohort 01
              </span>
              
              <h1 className="text-4xl sm:text-[3rem] font-bold leading-[1.1] tracking-tight text-[#F7F8FA] mb-6">
                Learning should lead<br />
                <span className="title-gradient">somewhere.</span>
              </h1>
              
              <p className="text-base text-[#A7B0C0] leading-relaxed">
                Earlio is building a platform where learning doesn&apos;t end with a certificate. Students practice skills, complete real projects, build proof of their abilities, and prepare for meaningful opportunities.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a href="#apply" className="btn-primary px-6 py-3.5 text-sm text-center flex items-center justify-center gap-2 font-semibold">
                  Apply for Cohort 01
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#product-centerpiece" className="btn-secondary px-5 py-3.5 text-sm text-center font-medium">
                  See the Workspace
                </a>
              </div>
            </div>

            {/* Software-realistic Hero Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-[#0D1220] border border-[#222B3D] rounded-xl p-5 shadow-xl text-left font-sans">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/20 border border-[#eab308]/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30" />
                    <span className="text-xs font-mono font-semibold text-[#707B90] ml-2">EARLIO</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7667F5] uppercase tracking-wider font-semibold">
                    Website Development Foundations
                  </span>
                </div>

                <div className="space-y-4">
                  {/* User greeting */}
                  <div className="flex justify-between items-center bg-[#111827] border border-[#222B3D] p-3 rounded-lg">
                    <div>
                      <div className="text-[10px] font-mono text-[#707B90] uppercase">Welcome Back</div>
                      <div className="text-sm font-bold text-[#F7F8FA]">Good morning, Dinesh.</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#707B90] border border-[#222B3D] px-2 py-0.5 rounded">
                      Week 2 of 4
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="bg-[#111827] border border-[#222B3D] p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#707B90] uppercase tracking-wider">
                      <span>Current Project</span>
                      <span className="text-[#F7F8FA] font-bold">Restaurant Website</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2.5 text-[#A7B0C0]">
                        <span className="text-xs font-mono text-emerald-400 font-bold">✓</span>
                        <span>Design Homepage Layout</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#A7B0C0]">
                        <span className="text-xs font-mono text-emerald-400 font-bold">✓</span>
                        <span>Build Navigation</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#F7F8FA]">
                        <span className="text-xs font-mono text-[#7667F5] font-bold">●</span>
                        <span className="font-semibold">Create Pricing Section</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#707B90]">
                        <span className="text-xs font-mono text-[#707B90]">○</span>
                        <span>Responsive Testing</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Box */}
                  <div className="bg-[#111827] border border-[#222B3D] p-3 rounded-lg text-xs space-y-1.5">
                    <span className="text-[10px] font-mono text-[#707B90] uppercase block">Reviewer Feedback</span>
                    <p className="text-[#A7B0C0] leading-relaxed italic">
                      &quot;Excellent progress. Improve spacing on tablet screens.&quot;
                    </p>
                  </div>

                  {/* Progress log */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#707B90] bg-[#111827] border border-[#222B3D] px-3 py-2 rounded-lg">
                    <span>Portfolio Progress</span>
                    <span className="text-[#7667F5] font-bold">3 of 7 Deliverables Complete</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: JOURNEY COMPARE ─── */}
      <section id="why-exists" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              A Direct Comparison
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              How the structured Earlio process compares to standard passive course consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Typical Journey */}
            <div className="card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-4 mb-6">
                  <h3 className="text-sm font-mono text-[#707B90] uppercase tracking-wider font-semibold">Typical Learning Journey</h3>
                  <span className="text-[10px] font-mono text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded uppercase font-semibold">Solo</span>
                </div>

                <div className="space-y-6 pl-4 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#222B3D]">
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">1. Learn</h4>
                    <p className="text-xs text-[#707B90] mt-1">Watch dozens of hours of video lectures and code-alongs.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">2. Finish Course</h4>
                    <p className="text-xs text-[#707B90] mt-1">Answer simple quizzes to download a PDF completion certificate.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">3. Figure Out The Next Step Alone</h4>
                    <p className="text-xs text-[#707B90] mt-1">Left to figure out portfolio hosting, positioning, and pitches without guidance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earlio Journey */}
            <div className="card p-6 sm:p-8 flex flex-col justify-between border-[#7667F5]/30">
              <div>
                <div className="flex items-center justify-between border-b border-[#1A2234] pb-4 mb-6">
                  <h3 className="text-sm font-mono text-[#7667F5] uppercase tracking-wider font-semibold">The Earlio Journey</h3>
                  <span className="text-[10px] font-mono text-[#22C99A] bg-[#22C99A]/10 px-2 py-0.5 rounded uppercase font-semibold">Supported</span>
                </div>

                <div className="space-y-4 pl-4 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#222B3D]">
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#22C99A]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">Learn → Practice → Build</h4>
                    <p className="text-xs text-[#A7B0C0] mt-1">Review short concepts, run exercises in the workspace sandbox, and build actual project components.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#22C99A]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">Portfolio</h4>
                    <p className="text-xs text-[#A7B0C0] mt-1">Sync your reviewed code files to an interactive web portfolio on your personal subdomain.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#22C99A]" />
                    <h4 className="text-xs font-bold text-[#F7F8FA]">Prepare → Pursue</h4>
                    <p className="text-xs text-[#A7B0C0] mt-1">Package your skills with a structured outreach toolkit, and start applying for real opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PRODUCT CENTERPIECE WORKSPACE ─── */}
      <section id="product-centerpiece" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">Platform Interface</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              The Earlio Workspace
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              A clean sandbox interface showing real website project files, active reviewer feedback, and deployment status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left project selector tabs */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-2">
              {[
                { id: 'restaurant', name: "Restaurant Website", status: "✓ Complete" },
                { id: 'gym', name: "Gym Website", status: "● In Progress" },
                { id: 'portfolio', name: "Portfolio Website", status: "○ Upcoming" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p.id as 'restaurant' | 'gym' | 'portfolio')}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedProject === p.id 
                      ? 'bg-[#111827] border-[#7667F5]/40 text-[#F7F8FA]' 
                      : 'border-transparent hover:bg-[#111827]/40 text-[#707B90]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold">{p.name}</span>
                    <span className={`text-[10px] font-mono ${
                      p.status.startsWith('✓') ? 'text-[#22C99A]' : p.status.startsWith('●') ? 'text-[#7667F5]' : 'text-[#707B90]'
                    }`}>{p.status}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Interactive Mockup Workspace preview */}
            <div className="lg:col-span-8 card bg-[#0D1220] border border-[#222B3D] p-6 flex flex-col justify-between min-h-[400px]">
              
              {/* Workspace Header */}
              <div className="border-b border-[#1A2234] pb-4 mb-4 flex items-center justify-between text-xs text-[#707B90] font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#7667F5]" />
                  PROJECT: {projectMockData[selectedProject].title.toUpperCase()}
                </span>
                <span className={projectMockData[selectedProject].statusColor}>
                  STATUS: {projectMockData[selectedProject].status}
                </span>
              </div>

              {/* Workspace Content */}
              <div className="space-y-5 flex-1 flex flex-col justify-center">
                <div className="space-y-4">
                  {/* Task list inside */}
                  <div>
                    <span className="text-[10px] font-mono text-[#707B90] uppercase tracking-wider block mb-2.5">Project Tasks</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {projectMockData[selectedProject].tasks.map((task, idx) => (
                        <div key={idx} className="bg-[#111827] border border-[#222B3D] p-3 rounded-lg flex items-center justify-between">
                          <span className="text-[#A7B0C0] font-medium">{task.label}</span>
                          <span className={`font-mono text-[10px] ${
                            task.status === 'done' ? 'text-[#22C99A]' : task.status === 'doing' ? 'text-[#7667F5]' : 'text-[#707B90]'
                          }`}>
                            {task.status.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback block */}
                  <div className="bg-[#080B14] border border-[#222B3D] p-4 rounded-lg">
                    <span className="text-[10px] font-mono text-[#707B90] uppercase tracking-wider block mb-1">Mentor Feedback</span>
                    <p className="text-xs text-[#A7B0C0] leading-relaxed italic">
                      &quot;{projectMockData[selectedProject].feedback}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Workspace Footer details */}
              <div className="border-t border-[#1A2234] pt-4 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-[#707B90] font-mono">
                <div className="flex items-center gap-3">
                  <span>Deployment:</span>
                  <span className="text-[#F7F8FA] font-medium bg-[#111827] px-2 py-0.5 rounded border border-[#222B3D]">
                    {projectMockData[selectedProject].deployment}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Progress:</span>
                  <div className="w-24 h-1.5 bg-[#111827] rounded-full overflow-hidden border border-[#222B3D]">
                    <div className={`h-full bg-[#7667F5] ${projectMockData[selectedProject].width}`} />
                  </div>
                  <span className="text-[#F7F8FA]">{projectMockData[selectedProject].progress}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHAT YOU'LL LEAVE WITH ─── */}
      <section id="what-you-get" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">Outcome Driven</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              What You&apos;ll Leave With
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              Students complete this cohort with tangible assets to showcase their capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Personal Portfolio Website", desc: "A professional portfolio showcasing your projects, layouts, and skills." },
              { title: "Local Business Website", desc: "An optimized landing page designed for a local service brand." },
              { title: "Startup Landing Page", desc: "A clean, high-conversion landing page structure with modern sections." },
              { title: "Live Deployed Websites", desc: "All projects deployed and publicly accessible on custom subdomains." },
              { title: "Project Documentation", desc: "Detailed, structured documentation explaining your development workflow." },
              { title: "Professional Starter Toolkit", desc: "Includes your portfolio link, project documentation, outreach templates, and resume guidance." }
            ].map((item, idx) => (
              <div key={idx} className="card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#7667F5]/10 border border-[#7667F5]/20 flex items-center justify-center text-[#7667F5] mb-4">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#F7F8FA]">{item.title}</h3>
                  <p className="text-xs text-[#707B90] mt-2.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: WHAT YOU'LL LEARN ─── */}
      <section id="syllabus" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">Curriculum Breakdown</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              What You&apos;ll Learn
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              The core foundations needed to build and launch modern, responsive websites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Responsive Layouts",
              "UI Fundamentals",
              "Website Structure",
              "Deployment Basics",
              "Version Control Concepts",
              "Accessibility Basics",
              "Modern Development Tools"
            ].map((skill, idx) => (
              <div key={idx} className="bg-[#0D1220] border border-[#222B3D] p-4 rounded-lg flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-[#22C99A]/10 border border-[#22C99A]/20 flex items-center justify-center text-[#22C99A] font-mono text-[10px] font-bold">
                  0{idx+1}
                </div>
                <span className="text-xs font-semibold text-[#F7F8FA]">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: WHY WE STARTED HERE ─── */}
      <section className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card p-8 sm:p-10 border-[#222B3D] bg-[#0D1220]/60">
            <h2 className="text-xl sm:text-2xl font-bold text-[#F7F8FA] mb-4">
              Why We Started Here
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B0C0] leading-relaxed">
              We chose website development because it allows learners to build visible, practical outcomes from day one. Every lesson contributes directly to a real project that can be reviewed, improved, deployed, and shared. It is the ideal starting point for validating Earlio&apos;s practical learning model before expanding into additional digital skills.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: ROADMAP & TRANSPARENCY ─── */}
      <section id="roadmap" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              Roadmap & Current Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Left Card: Pilot Info */}
            <div className="lg:col-span-5 bg-[#0D1220] border border-[#222B3D] p-6 rounded-xl flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#707B90] uppercase tracking-wider font-semibold block mb-3">Current Status</span>
                <div className="text-sm font-medium text-[#A7B0C0]">
                  We are building Earlio with our first pilot program:
                </div>
                
                <div className="space-y-3 mt-5">
                  <div className="bg-[#111827] border border-[#222B3D] p-3 rounded-lg">
                    <span className="text-[9px] font-mono text-[#707B90] uppercase font-bold">Pilot Capacity</span>
                    <div className="text-sm font-bold text-[#F7F8FA] mt-0.5">15 Learners</div>
                  </div>
                  <div className="bg-[#111827] border border-[#222B3D] p-3 rounded-lg">
                    <span className="text-[9px] font-mono text-[#707B90] uppercase font-bold">Current Stage</span>
                    <div className="text-sm font-bold text-[#F7F8FA] mt-0.5">Initial Pilot Phase (Cohort 01)</div>
                  </div>
                  <div className="bg-[#111827] border border-[#222B3D] p-3 rounded-lg">
                    <span className="text-[9px] font-mono text-[#707B90] uppercase font-bold">Building Now</span>
                    <div className="text-sm font-bold text-[#7667F5] mt-0.5">Website Development Cohort 01</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Roadmap Timeline */}
            <div className="lg:col-span-7 card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#707B90] uppercase tracking-wider font-semibold block mb-6">Company Roadmap</span>
                
                <div className="space-y-6 pl-4 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#1A2234]">
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#7667F5]" />
                    <h4 className="text-xs font-mono font-bold text-[#7667F5] uppercase">Today</h4>
                    <p className="text-xs text-[#F7F8FA] font-medium mt-1">Launch our first Website Development Cohort.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#707B90]" />
                    <h4 className="text-xs font-mono font-bold text-[#707B90] uppercase">Next</h4>
                    <p className="text-xs text-[#A7B0C0] mt-1">Improve the experience using feedback from early learners.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[16px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#707B90]" />
                    <h4 className="text-xs font-mono font-bold text-[#707B90] uppercase">Future</h4>
                    <p className="text-xs text-[#A7B0C0] mt-1">Expand Earlio into additional practical, project-based learning pathways guided by learner feedback and market demand.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: WHO THIS IS FOR ─── */}
      <section className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">Target Audience</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight">
              Who This Is For
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              This cohort is designed for learners building their first professional portfolio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              "College students",
              "Fresh graduates",
              "Career switchers",
              "Self-learners"
            ].map((audience, idx) => (
              <div key={idx} className="bg-[#0D1220] border border-[#222B3D] p-5 rounded-lg text-center font-medium">
                <span className="text-xs text-[#F7F8FA] block">{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: TEAM SECTION ─── */}
      <section className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">The Story</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F8FA] tracking-tight font-display">
              The Story Behind Earlio
            </h2>
          </div>

          <div className="max-w-2xl mx-auto bg-[#0D1220] border border-[#222B3D] p-8 rounded-xl flex flex-col items-center space-y-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#7667F5] p-0.5 bg-[#111827] shrink-0 shadow-lg shadow-[#7667F5]/10">
              <Image 
                src="/dinesh-s.jpeg" 
                alt="Dinesh S. - Founder of Earlio" 
                width={112}
                height={112}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#F7F8FA] tracking-tight">Dinesh S.</h3>
              <p className="text-xs text-[#7667F5] font-mono mt-1 uppercase tracking-wide font-semibold">Founder</p>
            </div>
            <div className="text-xs sm:text-sm text-[#A7B0C0] leading-relaxed space-y-4 text-left">
              <p>
                During college, I noticed the same pattern repeatedly. Students completed courses, earned certificates, and learned valuable skills, but many still didn&apos;t know what to build, how to create a portfolio, or how to prove they were ready for internships, freelance work, or jobs.
              </p>
              <p>
                I faced the same challenge myself. Learning wasn&apos;t the hardest part—applying those skills to real projects was. That experience became the foundation of Earlio.
              </p>
              <p>
                We&apos;re building a platform where learning goes beyond videos and certificates. Learners complete structured projects, receive feedback, build proof of their abilities, and graduate with a portfolio that reflects what they can actually do.
              </p>
              <p>
                We&apos;re starting with a Website Development Foundations pilot for 15 learners to validate and refine this learning model before expanding into other practical digital skills.
              </p>
              <p className="font-medium text-[#F7F8FA] text-center pt-2">
                Our goal is simple: help learners turn knowledge into real work and real opportunities.
              </p>
            </div>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#A7B0C0] hover:text-[#F7F8FA] flex items-center gap-1 pt-2">
              LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: FAQ AND APPLICATION ─── */}
      <section id="apply" className="relative z-10 py-16 sm:py-24 border-t border-[#1A2234]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <span className="tag mb-4 mx-auto font-mono text-[10px] uppercase">FAQ</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F7F8FA]">Common Questions</h2>
          </div>
          
          <div className="card p-6 sm:p-8 mb-16 border-[#222B3D] bg-[#0D1220]/60">
            {faqItems.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#F7F8FA] tracking-tight">
              Apply for Cohort 01
            </h2>
            <p className="mt-3 text-sm text-[#A7B0C0] leading-relaxed">
              Submit your details to apply for the inaugural Website Development Foundations cohort.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-[#1A2234] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-8 border-b border-[#1A2234] pb-8 mb-8">
            <div>
              <div className="flex items-center gap-1">
                <Image src="/logo-v2.jpg" alt="Earlio Logo" width={32} height={32} className="shrink-0 object-contain -mr-1.5" />
                <span className="text-base font-bold text-[#F7F8FA]">earlio</span>
              </div>
              <p className="text-xs text-[#707B90] mt-3 italic font-semibold">Learning should lead somewhere.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs text-[#707B90]">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[#F7F8FA] uppercase tracking-wider text-[10px] font-mono">Company</span>
                <a href="#why-exists" className="hover:text-[#F7F8FA] transition-colors">About</a>
                <a href="#roadmap" className="hover:text-[#F7F8FA] transition-colors">Current Stage</a>
                <a href="#roadmap" className="hover:text-[#F7F8FA] transition-colors">Roadmap</a>
                <a href="#apply" className="hover:text-[#F7F8FA] transition-colors">FAQ</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[#F7F8FA] uppercase tracking-wider text-[10px] font-mono">Programs</span>
                <a href="#syllabus" className="hover:text-[#F7F8FA] transition-colors">Website Development Foundations</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[#F7F8FA] uppercase tracking-wider text-[10px] font-mono">Legal</span>
                <a href="#" className="hover:text-[#F7F8FA] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#F7F8FA] transition-colors">Terms</a>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[#F7F8FA] uppercase tracking-wider text-[10px] font-mono">Social</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F8FA] transition-colors">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7F8FA] transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#707B90] font-mono">
            <span>© 2026 Earlio Technologies</span>
            <span>Made with precision</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
