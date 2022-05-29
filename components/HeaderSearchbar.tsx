import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "../pages/product/[id]";

const HeaderSearchbar: React.FC = () => {
  const databaseContext = useContext(DatabaseContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [areResultsOpen, setAreResultsOpen] = useState(false);

  useEffect(() => {
    setAreResultsOpen(searchValue.length > 0);
  }, [searchValue]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("your mom");
        }}
        className="w-full h-full rounded-full overflow-hidden flex flex-row relative"
      >
        <input
          className="h-full w-full py-2 px-3 focus:outline-none focus:bg-green-700 focus:placeholder:text-gray-300 caret-white focus:text-white"
          data-cy="header-searchbar"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      {areResultsOpen && databaseContext !== null && databaseContext.allProducts.length > 0 && (
        <div className="absolute top-14 bg-white z-10 left-0 right-0 px-2 mx-6 h-60 overflow-y-scroll flex flex-col border-b-2 border-x-2 rounded-b-lg border-green-700 shadow-lg shadow-gray-700">
          {databaseContext.allProducts
            .filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((p) => (
              <Link passHref href={`/product/${p.productId}`} key={p.productId}>
                <a
                  data-cy="searchbar-link"
                  onClick={() => setAreResultsOpen(false)}
                  className="py-2"
                >
                  {p.title}
                </a>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default HeaderSearchbar;
