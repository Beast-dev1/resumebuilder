import { useState, useEffect } from 'react';

function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when menu is open on mobile
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        `}
      </style>
      <section
        id="section"
        className={`bg-gradient-to-b px-3 sm:px-10 from-[#F0FDF4] via-[#FDFEFF] to-[#ECFDF5] pt-6 h-full ${
          isMenuOpen ? 'overflow-hidden' : ''
        }`}
      >
        <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow-sm max-w-5xl rounded-full mx-auto w-full bg-white">
          <a href="/" className="text-2xl font-bold text-green-600">
            ResumeBuilder
          </a>
          <nav
            id="menu"
            className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full transition-[width] bg-white/50 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal ${
              isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'
            }`}
          >
            <a className="hover:text-green-600 transition" href="#templates">
              Templates
            </a>
            <a className="hover:text-green-600 transition" href="#features">
              Features
            </a>
            <a className="hover:text-green-600 transition" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-green-600 transition" href="#about">
              About
            </a>
            <button
              id="closeMenu"
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                  stroke="#353535"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              className="hidden md:flex bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
              href="/signup"
            >
              Sign up
            </a>
            <button
              id="openMenu"
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center max-w-7xl mx-auto w-full">
          <button
            className="mt-16 mb-6 flex items-center space-x-2 border border-green-600 text-green-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-green-50 transition"
            type="button"
          >
            <span>Create your professional resume in minutes</span>
            <span className="flex items-center justify-center size-6 p-1 rounded-full bg-green-600">
              <svg
                width="14"
                height="11"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <h1 className="text-center text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
            Build your perfect resume with
            <span className="text-green-600"> AI-powered tools</span>
          </h1>
          <p className="mt-4 text-center text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
            Stand out from the crowd with professionally designed templates and
            intelligent content suggestions tailored to your industry.
          </p>
          <button
            className="mt-8 bg-green-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-green-700 transition"
            type="button"
          >
            <span>Start Building Now</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            aria-label="Resume templates preview"
            className="mt-12 flex max-md:overflow-x-auto gap-6 max-w-4xl w-full pb-6"
          >
            <div className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 flex-shrink-0 flex items-center justify-center shadow-md">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 flex-shrink-0 flex items-center justify-center shadow-md">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 flex-shrink-0 flex items-center justify-center shadow-md">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 flex-shrink-0 flex items-center justify-center shadow-md">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 flex-shrink-0 flex items-center justify-center shadow-md">
              <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Hero;
