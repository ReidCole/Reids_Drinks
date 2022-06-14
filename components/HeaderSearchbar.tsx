import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "../pages/product/[id]";

const HeaderSearchbar: React.FC = () => {
  const databaseContext = useContext(DatabaseContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [areResultsOpen, setAreResultsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductListing[]>([]);

  useEffect(() => {
    if (databaseContext === null) return;

    setAreResultsOpen(searchValue.length > 0);

    const filtered = databaseContext.allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchValue, databaseContext]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full h-full rounded-full overflow-hidden flex flex-row relative"
      >
        <input
          className="h-full w-full py-2 px-3 focus:outline-none focus:bg-emerald-700 focus:placeholder:text-gray-300 caret-white focus:text-white"
          data-cy="header-searchbar"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <div className="flex flex-col items-center absolute top-14 left-0 w-full px-6">
        {areResultsOpen && (
          <div className="top-14 bg-white z-10 left-0 right-0 max-h-60 w-full max-w-lg overflow-y-auto overflow-hidden flex flex-col rounded-b-xl shadow-lg">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <Link passHref href={`/product/${p.productId}`} key={p.productId}>
                  <a
                    data-cy="searchbar-link"
                    onClick={() => setSearchValue("")}
                    className="p-2 hover:bg-emerald-200"
                  >
                    {p.title}
                  </a>
                </Link>
              ))
            ) : (
              <p className="p-2">No results</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderSearchbar;
