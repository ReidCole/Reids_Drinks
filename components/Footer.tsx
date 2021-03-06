import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-800 text-white p-2 text-center flex flex-col gap-2 md:text-lg md:px-4 md:py-6">
      <p>Made by Reid Cole</p>
      <p>
        This website is not a real store. It is a sample website made to showcase my skills as a web
        developer. See my{" "}
        <Link passHref href="https://reidcole.me/">
          <a className="text-emerald-300 underline">portfolio site</a>
        </Link>{" "}
        for more of my samples.
      </p>
    </footer>
  );
};

export default Footer;
