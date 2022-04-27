import Link from "next/link";
import { useRouter } from "next/router";
import { ElementType } from "react";

type Props = {
  href: string;
  text: string;
  Icon: ElementType;
  onClick?: () => void;
};

const SidebarLink: React.FC<Props> = ({ href, text, Icon, onClick }) => {
  const router = useRouter();

  if (onClick)
    return (
      <button
        data-cy="sidebar-link"
        className="flex flex-row items-center px-2 py-4 text-xl gap-2"
        onClick={onClick}
      >
        <Icon className="w-7 h-7" />
        {text}
      </button>
    );

  return (
    <Link href={href} passHref>
      <a
        data-cy="sidebar-link"
        className={
          "flex flex-row items-center px-2 py-4 text-xl gap-2 " +
          (router.pathname == href ? "font-bold bg-green-200" : "")
        }
      >
        <Icon className="w-7 h-7" />
        {text}
      </a>
    </Link>
  );
};

export default SidebarLink;
