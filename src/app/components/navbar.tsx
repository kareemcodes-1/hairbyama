'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ShoppingBasket, User, LogOut, Package, Menu, X } from 'lucide-react';
import CartModal from './modals/cart-modal';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

gsap.registerPlugin(SplitText);

const LIGHT_ROUTES = ['/', '/about'];

const Navbar: React.FC = () => {
  const navRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navLogo = useRef<(HTMLAnchorElement | null)>(null);
  const navCart = useRef<(HTMLDivElement | null)>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openCartModal, setOpenCartModal] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pathname = usePathname();

  const isLight = !scrolled && LIGHT_ROUTES.some(
    route => route === '/' ? pathname === '/' : pathname.startsWith(route)
  );

  const links: { label: string; href: string }[] = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {openCartModal && (
        <CartModal openCartModal={openCartModal} setOpenCartModal={setOpenCartModal} />
      )}

      <header
        className={`fixed top-0 left-0 w-full right-0 z-[100] py-[1rem] lg:py-[1.7rem] px-[1.5rem] lg:px-[3rem] transition-all duration-500 ${
          scrolled ? 'bg-white shadow-md border' : isLight ? 'bg-transparent' : 'bg-white'
        }`}
      >
        <nav className="flex items-center justify-between w-full relative">

          {/* Logo */}
          <Link
            href="/"
            className={`text-[1.2rem] lg:text-[1.5rem] gin !font-[300] transition z-[110] ${
              menuOpen ? 'text-white' : isLight ? 'text-white' : 'text-black'
            }`}
            ref={navLogo}
          >
            hairsbyama
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-[6rem] ml-auto">
            <div className="flex items-center gap-[2rem]">
              {links.map((link, index) => (
                <Link
                  ref={(el) => { navRefs.current[index] = el; }}
                  href={link.href}
                  key={index}
                  className={`text-[.975rem] fk uppercase transition ${
                    isLight ? 'text-white hover:text-pink-400' : 'text-black hover:text-pink-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart + User */}
            <div className="flex items-center gap-[1rem]">
              <div
                ref={navCart}
                className={`text-[.975rem] uppercase cursor-pointer transition ${
                  isLight ? 'text-white hover:text-pink-400' : 'text-black hover:text-pink-400'
                }`}
                onClick={() => setOpenCartModal(true)}
              >
                <ShoppingBasket strokeWidth={2} />
              </div>

              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`transition outline-none ${
                        isLight ? 'text-white hover:text-pink-400' : 'text-black hover:text-pink-400'
                      }`}
                    >
                      <User strokeWidth={2} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] rounded-xl p-1">
                    <div className="px-2 py-1.5 mb-1">
                      <p className="text-[0.7rem] uppercase text-black/40 tracking-wide truncate">
                        {session.user.name || session.user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2 text-[0.825rem] uppercase cursor-pointer">
                        <User size={14} />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2 text-[0.825rem] uppercase cursor-pointer">
                        <Package size={14} />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="flex items-center gap-2 text-[0.825rem] uppercase cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <LogOut size={14} />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/auth/login"
                  className={`text-[.975rem] uppercase transition ${
                    isLight ? 'text-white hover:text-pink-400' : 'text-black hover:text-pink-400'
                  }`}
                >
                  <User strokeWidth={2} />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden items-center gap-4 z-[110]">
            {/* Cart icon */}
            <button
              className={`transition ${
                menuOpen ? 'text-white' : isLight ? 'text-white' : 'text-black'
              }`}
              onClick={() => setOpenCartModal(true)}
              aria-label="Open cart"
            >
              <ShoppingBasket strokeWidth={2} size={22} />
            </button>

            {/* Hamburger / Close toggle */}
            <button
              className={`transition ${
                menuOpen ? 'text-white' : isLight ? 'text-white' : 'text-black'
              }`}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X strokeWidth={2} size={24} /> : <Menu strokeWidth={2} size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[1000] bg-pink-500 flex flex-col transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Decorative circles */}
        <div className="absolute top-[-5rem] right-[-4rem] w-[16rem] h-[16rem] rounded-full bg-pink-400/40 pointer-events-none" />
        <div className="absolute bottom-[6rem] left-[-5rem] w-[18rem] h-[18rem] rounded-full bg-pink-600/30 pointer-events-none" />

        {/* Nav Links */}
        <div className="flex flex-col justify-center flex-1 px-10 gap-2">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between py-5 border-b border-white/20"
            >
              <span className="text-white text-[2.2rem] font-light tracking-tight uppercase leading-none gin transition-all duration-300 group-hover:translate-x-2">
                {link.label}
              </span>
              <span className="text-white/40 text-[1.5rem] transition-all duration-300 group-hover:text-white group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Section: Auth + Socials */}
        <div className="px-10 pb-12 flex flex-col gap-6">
          {session?.user ? (
            <div className="flex flex-col gap-3">
              <p className="text-white/50 text-[0.7rem] uppercase tracking-widest">
                {session.user.name || session.user.email}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white text-[0.85rem] uppercase tracking-wide hover:text-pink-200 transition"
                >
                  <User size={15} />
                  Profile
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white text-[0.85rem] uppercase tracking-wide hover:text-pink-200 transition"
                >
                  <Package size={15} />
                  Orders
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: '/' }); setMenuOpen(false); }}
                  className="flex items-center gap-2 text-white/60 text-[0.85rem] uppercase tracking-wide hover:text-white transition"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-white text-[0.85rem] uppercase tracking-widest border border-white/30 px-5 py-3 rounded-full w-fit hover:bg-white hover:text-pink-500 transition-all duration-300"
            >
              <User size={16} />
              Sign in
            </Link>
          )}

          <p className="text-white/30 text-[0.7rem] uppercase tracking-widest">
            © {new Date().getFullYear()} Hairsbyama
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;