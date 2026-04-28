"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CartModal from "./cart-modal";
import useCart from "@/store";
import { useSession, signOut } from "next-auth/react";
import gsap from "gsap";
import { FlipLink } from "@/lib/flip-links";
import { X, ChevronDown } from "lucide-react";

type MenuModalProps = {
  openMenuModal: boolean;
  setOpenMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuModal: React.FC<MenuModalProps> = ({
  openMenuModal,
  setOpenMenuModal,
}) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  useEffect(() => {
    if (!modalRef.current) return;

    if (openMenuModal) {
      gsap.fromTo(
        modalRef.current,
        { x: "-100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [openMenuModal]);

  // Animate account accordion
  useEffect(() => {
    if (!accountMenuRef.current) return;
    if (accountOpen) {
      gsap.fromTo(
        accountMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(accountMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [accountOpen]);

  return (
    <>
      {openCartModal && (
        <CartModal
          openCartModal={openCartModal}
          setOpenCartModal={setOpenCartModal}
        />
      )}

      <div
        ref={modalRef}
        className="fixed top-0 right-0 left-0 h-screen bg-pink-500 z-[360] -translate-x-full"
      >
        <div className="absolute top-[-5rem] right-[-4rem] w-[16rem] h-[16rem] rounded-full bg-pink-400/40 pointer-events-none" />
        <div className="absolute bottom-[6rem] left-[-5rem] w-[18rem] h-[18rem] rounded-full bg-pink-600/30 pointer-events-none" />

        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setOpenMenuModal(false)}
            className="group relative flex items-center justify-center cursor-pointer text-white"
          >
            <X strokeWidth={"1.25px"} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-[1rem] text-white">
          <div className="flex items-start flex-col p-[1rem] lg:mt-[4rem] mt-[10rem] gap-[1rem]">
            <ul className="flex flex-col gap-[3rem] lg:gap-[2rem] font-medium tracking-[.2rem]">
              <Link
                href="/shop"
                onClick={() => setOpenMenuModal(false)}
                className="cursor-pointer xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>SHOP</FlipLink>
              </Link>

              <Link
                href="/about"
                onClick={() => setOpenMenuModal(false)}
                className="cursor-pointer xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>ABOUT</FlipLink>
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpenMenuModal(false)}
                className="cursor-pointer xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>CONTACT</FlipLink>
              </Link>

              {/* Account accordion */}
              <li className="list-none flex flex-col">
                <button
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="cursor-pointer xl:text-[7rem] lg:text-[5rem] text-[3rem] text-left flex items-center gap-3"
                >
                  <FlipLink>ACCOUNT</FlipLink>
                  <ChevronDown
                    className={`transition-transform duration-300 mt-1 ${
                      accountOpen ? "rotate-180" : "rotate-0"
                    }`}
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Accordion content */}
                <div
                  ref={accountMenuRef}
                  className="overflow-hidden h-0 opacity-0 flex flex-col gap-[.75rem] pl-2 pt-2"
                >
                  {session ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setOpenMenuModal(false)}
                        className="text-white/80 hover:text-white text-[1rem] uppercase tracking-widest transition"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setOpenMenuModal(false)}
                        className="text-white/80 hover:text-white text-[1rem] uppercase tracking-widest transition"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-white/60 hover:text-white text-[1rem] uppercase tracking-widest transition text-left"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setOpenMenuModal(false)}
                      className="text-white/80 hover:text-white text-[1rem] uppercase tracking-widest transition"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuModal;