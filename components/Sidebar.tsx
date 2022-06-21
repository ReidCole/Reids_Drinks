import rdLogo from "../public/logo/rd.png";
import { BsArrowLeft, BsCart, BsDoorOpen, BsHouse, BsPerson } from "react-icons/bs";
import SidebarLink from "./SidebarLink";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ isVisible, setIsVisible }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      {isVisible && (
        <div
          className="bg-black opacity-70 w-screen h-screen fixed top-0 left-0 z-20 md:hidden"
          onClick={() => setIsVisible(false)}
          data-cy="sidebar-background"
        />
      )}

      <div
        className={
          "transition-transform fixed bg-white top-0 left-0 w-60 h-screen flex flex-col z-20 md:hidden " +
          (!isVisible && "-translate-x-60")
        }
        data-cy="sidebar"
      >
        <div className="p-2 flex flex-row items-center h-14">
          <button data-cy="sidebar-backbtn" onClick={() => setIsVisible(false)}>
            <BsArrowLeft className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col">
          <SidebarLink href="/" Icon={BsHouse} text="Home" />
          {authContext && authContext.user ? (
            <SidebarLink href="/account" Icon={BsPerson} text="Account" />
          ) : (
            <SidebarLink
              href={`/signin?prevRoute=${router.asPath}`}
              Icon={BsPerson}
              text="Sign In"
            />
          )}
          <SidebarLink href="/cart" Icon={BsCart} text="Cart" />

          {authContext && authContext.user && (
            <SidebarLink
              href=""
              Icon={BsDoorOpen}
              text="Sign Out"
              onClick={() => authContext.signOut()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
