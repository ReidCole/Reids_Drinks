import { BsSearch } from "react-icons/bs";

const HeaderSearchbar: React.FC = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("your mom");
      }}
      className="w-full h-full rounded-full overflow-hidden flex flex-row"
    >
      <input
        className="h-full w-full py-2 px-3 outline-none"
        data-cy="header-searchbar"
        placeholder="Search..."
      />
      <button className="bg-green-700 text-white pl-2 pr-3 text-xl">
        <BsSearch />
      </button>
    </form>
  );
};

export default HeaderSearchbar;
