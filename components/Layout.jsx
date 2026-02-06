// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';

// export default function Layout({ children, title, description }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navItems = [
//     { label: 'All players', href: '/players' },
//     { label: 'batsman', href: '/players/batsman' },
//     { label: 'bowler', href: '/players/bowler' },
//     { label: 'allrounder', href: '/players/allrounder' },
//   ];

//   return (
//     <>
//       {mounted && (
//         <head>
//           <title>{title || 'T20 Indian Cricket Stats'}</title>
//           <meta name="description" content={description || 'Indian T20 cricket statistics and player information'} />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <meta charSet="utf-8" />
//         </head>
//       )}

//       <div className="min-h-screen bg-white flex flex-col">
//         <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
//           <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//             <Link href="/" className="text-xl font-bold text-white no-underline">
//               T20 Stats
//             </Link>

//             <button
//               onClick={toggleMenu}
//               className="md:hidden p-2 hover:bg-slate-800 rounded-md transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>

//             <div className="hidden md:flex gap-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="text-sm font-medium hover:text-slate-300 transition-colors no-underline text-white"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {mounted && isMenuOpen && (
//             <div className="md:hidden bg-slate-800 border-t border-slate-700">
//               <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className="text-sm font-medium hover:text-slate-300 transition-colors no-underline text-white"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </nav>

//         <main className="flex-grow container mx-auto px-4 py-8">
//           {children}
//         </main>

       
//       </div>
//     </>
//   );
// }


'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Layout({ children, title, description }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const siteTitle = title || 'T20 Indian Cricket Stats';
  const siteDescription =
    description || 'Indian T20 cricket statistics and player information';
  const ogImage = '/images/allrounder.jpg';

  const navItems = [
    { label: 'All players', href: '/players' },
    { label: 'Batsman', href: '/players/batsman' },
    { label: 'Bowler', href: '/players/bowler' },
    { label: 'Allrounder', href: '/players/allrounder' },
  ];

  return (
    <>
      {/* SEO & Metadata */}
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="T20 Indian Cricket Stats" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Navigation */}
        <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white no-underline">
              T20 Stats
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-slate-300 transition-colors no-underline text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800 border-t border-slate-700">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium hover:text-slate-300 transition-colors no-underline text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
}
