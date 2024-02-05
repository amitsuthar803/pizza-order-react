import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        className="focus:outline-none focus:ring-opacity-50 focus:ring focus:ring-yellow-500 rounded-full px-4 py-2 transition-all duration-300 sm:focus:w-72 text-sm w-28 sm:w-64 placeholder:text-stone-400 "
      ></input>
    </form>
  );
}

export default SearchOrder;
