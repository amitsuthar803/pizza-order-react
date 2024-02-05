import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  //  here we do is first select the cart then calculate the value inside the selector it is good practice when we use redux
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="bg-stone-800 flex items-center justify-between text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base">
      <p
        className="text-stone-300 space-x-4 
      sm:space-x-4
      font-semibold "
      >
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
