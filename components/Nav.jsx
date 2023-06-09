"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import AppProvider from "./AppProvider";

const Nav = () => {
  const router = useRouter();
  const authContext = useContext(AppProvider);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
    authContext.setAppContext(null)
    router.push("/")
}

  return (
    <nav className='flex-between w-full mb-16 pt-3 sticky top-0 z-50'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Restaurants App</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {(authContext.appContext) ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/add-restaurant' className='black_btn'>
              Add Restaurant
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/icons/user.png'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {
                <Link href="/signin"
                  type='button'
                  className='black_btn mr-2'
                >
                  Sign In
                </Link>
}{
                <Link href="/signup"
                type='button'
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mr-2'
              >
                Sign Up
              </Link>
              }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {(authContext.appContext)? (
          <div className='flex'>
            <Image
              src='/assets/icons/user.png'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/add-restaurant'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {
                <Link
                  href="/signin"
                  className='black_btn mr-2'
                >
                  Sign In
                </Link>
}{
                <Link
                href="/signup"
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white mr-2'
              >
                Sign Up
              </Link>
              }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
