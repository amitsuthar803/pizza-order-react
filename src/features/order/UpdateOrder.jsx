import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// eslint-disable-next-line react/prop-types
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  // to update data we use form component that fetcher provide us

  return (
    // this will not navigate away like other form. it will simple submit the form  and also re-validate the page.
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}
export default UpdateOrder;

// action
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

// revalidation means that react router know that the data has changed. as a result of action
// so then whenever that happen it will automatica re-fetch the data in the background and then re-render the page with that new data
