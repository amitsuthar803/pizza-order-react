/* eslint-disable no-unused-vars */
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    // renaming status to addressStatus
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalprice = totalCartPrice + priorityPrice;

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-8">
        {`Ready to order? Let's go!`}
      </h2>

      {/* <Form method="POST" action="/order/new"> */}

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            className="input grow"
            defaultValue={username ? username : null}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              className="input w-full  "
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700  bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700  bg-red-100 p-2 rounded-md">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[4px] top-[4px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* we pass cart as hidden field and  we converted cart to string and assign as value to this field*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalprice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// useDispatch hook only available in component not in regular function

// create a action
// when the form submitted behind the scene react router call this action function and pass in the request,
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  // we get all data from form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // this will convert on to true and  - to false
    priority: data.priority === "true",
  };


  // Error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  // if there is error we return immediatly no new order is created on server. and not redirected
  if (Object.keys(errors).length > 0) return errors;

  // if everything is okay, create new order and redirect
  // create order function return newly created order, we can now await here
  const newOrder = await createOrder(order);
  // not good practice doing this to implement clear cart when succefully order is created
  // don't overuse this technique it  deactives a couple of performance optimization on redux on this page.
  // is is just a hack
  store.dispatch(clearCart());

  //function provide to use by react router. it just create new request
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
