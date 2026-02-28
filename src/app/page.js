'use client';

import { useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  profileData,
  projects,
  experiences,
  education,
  certifications,
} from '@/lib/data';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Terminal,
  Crosshair,
  Cpu,
  Award,
  Instagram,
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [time, setTime] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  // Custom HUD Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener('mousemove', moveCursor);

    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toISOString().split('T')[1].slice(0, 8) + ' Z');
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  // Observer untuk Sidebar Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <main className='bg-black min-h-screen text-zinc-300 font-sans selection:bg-orange-500 selection:text-black cursor-none overflow-x-hidden relative'>
      {/* SCANLINES & CRT NOISE OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className='fixed inset-0 z-40 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20'></div>

      {/* CUSTOM CROSSHAIR CURSOR */}
      <motion.div
        className='fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] items-center justify-center text-orange-500 mix-blend-screen hidden md:flex'
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <Crosshair size={24} strokeWidth={1.5} />
      </motion.div>

      {/* TOP HUD BAR */}
      <div className='fixed top-0 left-0 w-full h-8 border-b border-orange-500/20 bg-black/80 backdrop-blur-md z-40 items-center justify-between px-4 font-mono text-[10px] md:text-xs text-orange-500/70 uppercase tracking-widest hidden md:flex'>
        <div className='flex gap-6'>
          <span>SYS.STATUS: ONLINE</span>
          <span className='animate-pulse text-orange-400'>REC [●]</span>
        </div>
        <div className='flex gap-6'>
          <span>LOC: 06°58'26"S 107°37'49"E</span>
          <span>UPTIME: {time}</span>
        </div>
      </div>

      {/* TECHNICAL SIDEBAR */}
      <nav className='fixed left-0 top-0 h-screen w-16 md:w-20 flex-col items-center justify-center gap-1 z-30 border-r border-zinc-900 bg-black/50 backdrop-blur-xl hidden md:flex'>
        {['home', 'about', 'projects', 'certifications', 'contact'].map(
          (item, idx) => (
            <a
              key={item}
              href={`#${item}`}
              className='relative group flex items-center justify-center w-full py-8 cursor-none border-l-2 transition-colors duration-300'
              style={{
                borderLeftColor:
                  activeSection === item ? '#f97316' : 'transparent',
              }}
            >
              <span
                className={`font-mono text-[10px] md:text-xs uppercase tracking-widest origin-center -rotate-90 transition-colors duration-300 ${activeSection === item ? 'text-orange-500 font-bold' : 'text-zinc-600 group-hover:text-zinc-400'}`}
              >
                0{idx + 1}_{item.slice(0, 3)}
              </span>
            </a>
          ),
        )}
      </nav>

      {/* MAIN CONTENT */}
      <div className='flex-1 md:ml-20 pt-8 relative z-10 px-4 md:px-12'>
        {/* SECTION 1: HOME/INITIALIZE */}
        <section
          id='home'
          className='min-h-[90vh] flex flex-col justify-center border-b border-zinc-900/50 pb-20 pt-10'
        >
          <div className='max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='lg:col-span-7 flex flex-col justify-center relative'
            >
              <div className='text-[10px] font-mono text-zinc-600 mb-6 flex flex-col gap-1 uppercase'>
                <span>{'>'} INITIALIZING KERNEL... OK</span>
                <span>{'>'} MOUNTING MODULES....</span>
                <span className='text-orange-500 text--xl'>
                  {'>'} ACCESS GRANTED. WELCOME.
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white mb-4'>
                <span className='text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-800'>
                  TUBAGUS FITRAN
                </span>
                <br />
                BADRUTTAMAM.
              </h1>

              <h2 className='text-xl md:text-3xl font-mono text-zinc-300 uppercase tracking-widest mb-8 border-l-4 border-orange-500 pl-4'>
                SOFTWARE ENGINEER
              </h2>

              <div className='flex flex-col md:flex-row gap-8 items-start md:items-center border-t border-zinc-900 pt-6'>
                <a
                  href='/cv.pdf'
                  download
                  className='group relative inline-flex items-center gap-4 px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-widest font-mono text-sm hover:bg-white transition-colors cursor-none overflow-hidden shrink-0'
                >
                  <span className='absolute inset-0 w-full h-full bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out skew-x-12'></span>
                  <Terminal size={18} />
                  <span>Execute_CV.exe</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='lg:col-span-5 relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] border border-zinc-800 bg-zinc-900/20 p-4 group cursor-none mt-10 lg:mt-0'
            >
              <div className='absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-orange-500'></div>
              <div className='absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-orange-500'></div>
              <div className='absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-orange-500'></div>
              <div className='absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-orange-500'></div>

              <div className='w-full h-full bg-zinc-900 relative overflow-hidden flex items-center justify-center grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-[1.02] border border-zinc-800/50'>
                <img
                  src='/profile.jpg'
                  alt='Profile'
                  className='w-full h-full object-cover opacity-100 mix-blend-normal md:opacity-80 md:mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700'
                />

                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none'></div>
                <div className='absolute inset-0 border border-orange-500/20 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay pointer-events-none'></div>

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-orange-500/30 rounded-full flex-col items-center justify-center z-20 opacity-0 md:opacity-50 group-hover:opacity-0 transition-opacity pointer-events-none hidden md:flex'>
                  <div className='w-1 h-1 bg-orange-500 rounded-full'></div>
                </div>

                <motion.div
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  className='absolute top-0 left-0 w-full h-1 bg-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,1)] z-30 pointer-events-none'
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: ARCHIVE/ABOUT */}
        <section
          id='about'
          className='py-24 border-b border-zinc-900/50 relative'
        >
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center gap-4 mb-16'>
              <span className='w-8 h-8 bg-orange-500 flex items-center justify-center text-black font-bold font-mono text-sm'>
                02
              </span>
              <h2 className='text-2xl font-black uppercase tracking-widest text-white'>
                Data_Archive // Profil
              </h2>
              <div className='h-[1px] flex-1 bg-zinc-800 ml-4'></div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='bg-zinc-900/30 border border-zinc-800 p-8 font-mono relative group hover:border-orange-500/50 transition-colors cursor-none'
              >
                <Cpu
                  className='absolute top-4 right-4 text-zinc-700 group-hover:text-orange-500 transition-colors'
                  size={24}
                />

                <p className='text-orange-500 text-xs mb-4 uppercase'>
                  {'>'} BIO_DATA_STREAM
                </p>
                <p className='text-zinc-400 text-sm leading-relaxed mb-8'>
                  {profileData.about}
                </p>

                <div className='border-t border-zinc-800 pt-6 mb-8'>
                  <p className='text-orange-500 text-xs mb-4 uppercase'>
                    {'>'} EDU_LOGS
                  </p>
                  <div className='space-y-4'>
                    {education.map((edu, idx) => (
                      <div key={idx} className='flex flex-col'>
                        <span className='text-white font-bold'>
                          {edu.institution}
                        </span>
                        <span className='text-zinc-400 text-xs'>
                          {edu.degree}
                        </span>
                        <span className='text-orange-500/80 text-[10px] mt-1'>
                          [{edu.year}]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='border-t border-zinc-800 pt-6'>
                  <p className='text-orange-500 text-xs mb-4 uppercase'>
                    {'>'} ACTIVE_SKILLS
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {[
                      'Next.js',
                      'React',
                      'Tailwind CSS',
                      'Framer Motion',
                      'Figma',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className='px-2 py-1 bg-black border border-zinc-700 text-zinc-300 text-xs uppercase hover:border-orange-500 hover:text-orange-500 transition-colors'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className='space-y-4'>
                <p className='font-mono text-xs text-orange-500 uppercase mb-2'>
                  {'>'} EXP_LOGS
                </p>
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className='border border-zinc-800 bg-black p-6 flex flex-col md:flex-row gap-6 md:items-center hover:bg-zinc-900/50 hover:border-orange-500/50 transition-colors cursor-none group'
                  >
                    <div className='font-mono text-xs text-zinc-500 min-w-[130px] group-hover:text-orange-500 transition-colors'>
                      [{exp.year}]
                    </div>
                    <div>
                      <h4 className='text-lg font-bold text-white uppercase tracking-wider mb-1'>
                        {exp.title}
                      </h4>
                      <p className='text-orange-500/80 font-mono text-xs mb-2 uppercase'>
                        {exp.company}
                      </p>
                      <p className='text-zinc-500 text-sm leading-relaxed'>
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEPLOYMENTS/PROJECTS */}
        <section id='projects' className='py-24 border-b border-zinc-900/50'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center gap-4 mb-16'>
              <span className='w-8 h-8 bg-orange-500 flex items-center justify-center text-black font-bold font-mono text-sm'>
                03
              </span>
              <h2 className='text-2xl font-black uppercase tracking-widest text-white'>
                Deployments // Karya
              </h2>
              <div className='h-[1px] flex-1 bg-zinc-800 ml-4'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {projects.map((project, idx) => {
                const isActive = activeProject === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className='group relative border border-zinc-800 bg-black aspect-[4/3] overflow-hidden cursor-none'
                  >
                    <div className='absolute inset-0 bg-orange-500/20 transition-opacity z-20 mix-blend-color-dodge pointer-events-none opacity-0 md:group-hover:opacity-100'></div>

                    <div className='absolute inset-0 bg-zinc-900 flex items-center justify-center z-0'>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full h-full object-cover transition-all duration-700 opacity-80 grayscale-0 md:grayscale md:opacity-30 md:group-hover:grayscale-0 md:group-hover:opacity-10'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 md:group-hover:opacity-0'></div>
                    </div>

                    <div
                      className={`absolute bottom-8 left-8 z-20 transition-opacity duration-500 md:group-hover:opacity-0 flex flex-col items-start ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                      <p className='text-orange-500 font-mono text-xs mb-2 bg-black/50 inline-block px-2 py-1 backdrop-blur-sm shadow-sm'>
                        [{project.year}]
                      </p>
                      <h3 className='text-3xl font-black text-white uppercase tracking-tighter drop-shadow-md mb-4'>
                        {project.title}
                      </h3>
                      <button
                        onClick={() => setActiveProject(idx)}
                        className='md:hidden px-4 py-2 border border-orange-500 text-orange-500 text-xs font-mono uppercase tracking-widest bg-black/50 backdrop-blur-sm active:bg-orange-500 active:text-black pointer-events-auto shadow-lg'
                      >
                        VIEW DETAILS
                      </button>
                    </div>

                    <div
                      className={`absolute inset-0 bg-black/95 transition-transform duration-500 ease-in-out z-30 p-8 flex flex-col justify-between border-t border-orange-500 md:group-hover:translate-y-0 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                      <div className='flex flex-col h-full'>
                        <div className='flex justify-between items-start mb-4'>
                          <div className='flex flex-wrap gap-2'>
                            <span className='text-orange-500 font-mono text-[10px] border border-orange-500/30 px-2 py-1'>
                              {project.tech}
                            </span>
                            <span className='text-zinc-400 font-mono text-[10px] border border-zinc-700 bg-zinc-900 px-2 py-1'>
                              {project.role}
                            </span>
                          </div>

                          <div className='flex items-center gap-4'>
                            <button
                              onClick={() => setActiveProject(null)}
                              className='md:hidden text-zinc-500 hover:text-white pointer-events-auto font-mono text-xs uppercase tracking-widest'
                            >
                              [X] CLOSE
                            </button>
                            <a
                              href={project.url || '#'}
                              onClick={(e) => e.stopPropagation()}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='cursor-pointer md:cursor-none hover:scale-110 transition-transform pointer-events-auto'
                            >
                              <ArrowUpRight
                                size={24}
                                className='text-orange-500 shrink-0'
                              />
                            </a>
                          </div>
                        </div>

                        <h3 className='text-2xl font-black text-white uppercase tracking-tighter mb-4'>
                          {project.title}
                        </h3>

                        <div className='overflow-y-auto pr-2 custom-scrollbar flex-1 mb-4 pointer-events-auto'>
                          <p className='text-zinc-400 font-mono text-xs md:text-sm leading-relaxed'>
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className='font-mono text-[10px] text-zinc-600 uppercase flex justify-between pt-4 border-t border-zinc-900 shrink-0'>
                        <span>STATUS: DEPLOYED</span>
                        <span>ID: 00{idx + 1}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: CERTIFICATIONS */}
        <section
          id='certifications'
          className='py-24 border-b border-zinc-900/50'
        >
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center gap-4 mb-16'>
              <span className='w-8 h-8 bg-orange-500 flex items-center justify-center text-black font-bold font-mono text-sm'>
                04
              </span>
              <h2 className='text-2xl font-black uppercase tracking-widest text-white'>
                Data_Record // Sertifikasi
              </h2>
              <div className='h-[1px] flex-1 bg-zinc-800 ml-4'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className='group relative border border-zinc-800 bg-black aspect-[4/3] overflow-hidden cursor-none'
                >
                  <div className='absolute top-4 left-4 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-3 py-1 border border-orange-500/50 flex items-center gap-2'>
                    <Award size={14} className='text-orange-500' />
                    <span className='text-orange-500 font-mono text-[10px] uppercase'>
                      VERIFIED
                    </span>
                  </div>

                  <img
                    src={cert.image}
                    alt={cert.title}
                    className='w-full h-full object-cover transition-all duration-700 opacity-60 grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105'
                  />

                  <div className='absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(249,115,22,0.1)_50%,transparent_100%)] bg-[length:100%_4px] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none'></div>

                  <div className='absolute inset-x-0 bottom-0 bg-black/90 md:bg-black/95 border-t border-orange-500 p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-30'>
                    <p className='text-orange-500 font-mono text-xs uppercase text-center leading-relaxed drop-shadow-md'>
                      {cert.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: NETWORK/CONTACT */}
        <section id='contact' className='py-24 pb-32'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center gap-4 mb-16'>
              <span className='w-8 h-8 bg-orange-500 flex items-center justify-center text-black font-bold font-mono text-sm'>
                05
              </span>
              <h2 className='text-2xl font-black uppercase tracking-widest text-white'>
                Comms_Link // Kontak
              </h2>
              <div className='h-[1px] flex-1 bg-zinc-800 ml-4'></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='border border-orange-500/30 bg-orange-500/5 p-8 md:p-12 text-center relative overflow-hidden group cursor-none'
            >
              <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50'></div>

              <h3 className='text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6'>
                ESTABLISH CONNECTION.
              </h3>
              <p className='font-mono text-sm text-zinc-400 mb-10 max-w-xl mx-auto'>
                AWAITING INPUT. TERSEDIA UNTUK KOLABORASI, FREELANCE, ATAU
                DISKUSI TEKNOLOGI LEBIH LANJUT.
              </p>

              <div className='flex flex-wrap justify-center gap-4'>
                <a
                  href={profileData.socials.github || '#'}
                  target={profileData.socials.github ? '_blank' : '_self'}
                  className='w-16 h-16 border border-zinc-700 bg-black flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-none group-hover:bg-zinc-900'
                >
                  <Github size={24} />
                </a>
                <a
                  href={profileData.socials.linkedin}
                  target='_blank'
                  className='w-16 h-16 border border-zinc-700 bg-black flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-none group-hover:bg-zinc-900'
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={profileData.socials.instagram}
                  target='_blank'
                  className='w-16 h-16 border border-zinc-700 bg-black flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors cursor-none group-hover:bg-zinc-900'
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={`mailto:${profileData.email}`}
                  className='px-8 h-16 border border-zinc-700 bg-black flex items-center justify-center font-mono text-sm uppercase hover:border-orange-500 hover:text-orange-500 transition-colors cursor-none group-hover:bg-zinc-900 gap-2 w-full md:w-auto mt-4 md:mt-0'
                >
                  <Mail size={18} /> INITIATE_EMAIL
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
