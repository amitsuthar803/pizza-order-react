import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      Delete
    </Button>
  );
}

export default DeleteItem;
