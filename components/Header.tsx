import Image from "next/image";
import Link from "next/link";
import logoImg from "../public/logo/logo.png";
import { BsList } from "react-icons/bs";
import HeaderSearchbar from "./HeaderSearchbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  return (
    <>
      <header className="bg-green-300 p-2 flex flex-row items-center gap-2 h-14">
        <button data-cy="header-sidebarbtn" onClick={() => setSidebarVisible((prev) => !prev)}>
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
      </header>
      <Sidebar isVisible={sidebarVisible} setIsVisible={setSidebarVisible} />
    </>
  );
};

export default Header;
