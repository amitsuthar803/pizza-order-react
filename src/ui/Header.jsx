import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="bg-yellow-500  justify-between flex items-center uppercase border-b border-stone-200  px-4 py-3 sm:px-6">
      <Link className="tracking-widest" to="/">
        Pizza Factory Co.
      </Link>
      <SearchOrder></SearchOrder>
      <Username />
    </header>
  );
}

export default Header;
