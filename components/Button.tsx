import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  styles: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
};

const Button: React.FC<Props> = ({ children, styles, onClick, href, type }) => {
  if (href) {
    return (
      <Link href={href} passHref>
        <a className={"px-4 py-2 rounded-lg text-center " + styles}>{children}</a>
      </Link>
    );
  }
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={"px-4 py-2 rounded-lg text-center " + styles}
    >
      {children}
    </button>
  );
};

export default Button;
