import DeleteItem from "./DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function CartItem({ item }) {
  // eslint-disable-next-line
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 font-semibold sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>

      <div className="flex justify-between sm:gap-6 items-center">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
