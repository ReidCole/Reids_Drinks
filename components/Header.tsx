import Image from "next/image";
import Link from "next/link";
import logoImg from "../public/logo/logo.png";
import { BsCart, BsDoorOpen, BsHouse, BsList, BsPerson } from "react-icons/bs";
import HeaderSearchbar from "./HeaderSearchbar";
import Sidebar from "./Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Header: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  return (
    <>
      <header className="bg-emerald-300 p-2 flex flex-row items-center gap-2 h-14">
        <button
          className="md:hidden"
          data-cy="header-sidebarbtn"
          onClick={() => setSidebarVisible((prev) => !prev)}
        >
          <BsList className="w-8 h-8" />
        </button>

        <Link passHref href="/">
          <a className="flex shrink-0 w-10 h-10 relative">
            <Image
              src={logoImg}
              quality={100}
              layout="fill"
              alt="reid's drinks logo"
              data-cy="header-logo"
              priority
            />
          </a>
        </Link>

        <HeaderSearchbar />

        <Link passHref href="/">
          <a className="gap-1 items-center whitespace-nowrap hidden md:flex md:flex-row p-2 bg-emerald-700 text-white rounded-lg ">
            <BsHouse className="w-7 h-7" />
            Home
          </a>
        </Link>
        <Link passHref href="/cart">
          <a className="gap-1 items-center whitespace-nowrap hidden md:flex md:flex-row p-2 bg-emerald-700 text-white rounded-lg ">
            <BsCart className="w-7 h-7" />
            Cart
          </a>
        </Link>
        {authContext && authContext.user ? (
          <Link passHref href="/account">
            <a className="flex-row gap-1 items-center whitespace-nowrap hidden md:flex md:flex-row p-2 bg-emerald-700 text-white rounded-lg ">
              <BsPerson className="w-7 h-7" />
              Account
            </a>
          </Link>
        ) : (
          <Link passHref href="/signin">
            <a className="flex-row gap-1 items-center whitespace-nowrap hidden md:flex md:flex-row p-2 bg-emerald-700 text-white rounded-lg ">
              <BsPerson className="w-7 h-7" />
              Sign In
            </a>
          </Link>
        )}

        {authContext && authContext.user && (
          <button
            onClick={() => authContext.signOut()}
            className="flex-row gap-1 items-center whitespace-nowrap hidden md:flex md:flex-row p-2 bg-emerald-700 text-white rounded-lg "
          >
            <BsDoorOpen className="w-7 h-7" />
            Sign Out
          </button>
        )}
      </header>
      <Sidebar isVisible={sidebarVisible} setIsVisible={setSidebarVisible} />
    </>
  );
};

export default Header;
