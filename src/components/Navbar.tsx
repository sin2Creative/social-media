import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex h-24 items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link className="font-bold text-xl text-blue-600" href={"/"}>
          SIN2SOCIAL
        </Link>
      </div>
      {/* CENTER */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600 text-sm">
          <Link href={"/"} className="flex gap-2 items-center">
            <Image
              src={"/home.png"}
              width={16}
              height={16}
              className="w-4 h-4"
              alt="Home"
            />
            <span>Home</span>
          </Link>
          <Link href={"/"} className="flex gap-2 items-center">
            <Image
              src={"/friends.png"}
              width={16}
              height={16}
              className="w-4 h-4"
              alt="Friends"
            />
            <span>Friends</span>
          </Link>
          <Link href={"/"} className="flex gap-2 items-center">
            <Image
              src={"/stories.png"}
              width={16}
              height={16}
              className="w-4 h-4"
              alt="Stories"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src={"/search.png"} height={14} width={14} alt="" />
        </div>
      </div>
      {/* RIGHT */}
      <div className="lg:flex w-[30%] flex items-center gap-4 justify-end">
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src={"/people.png"} width={24} height={24} alt="people" />
            </div>
            <div className="cursor-pointer">
              <Image
                src={"/messages.png"}
                width={20}
                height={20}
                alt="people"
              />
            </div>
            <div className="cursor-pointer">
              <Image
                src={"/notifications.png"}
                width={20}
                height={20}
                alt="people"
              />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src={"/noavatar.png"} alt="" width={20} height={20} />
              <Link href={"/sign-in"} className="ml-2">
                LogIn/Register
              </Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
