import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // 3) we provide data to page
  // here we don't want to pass in anything in function react router automaticlly know that data we want is one that asscociated with this page
  // this is called render as you fetch stretagy
  // in old way in useEffect we did always a fetch on render approch, we render component first and then after component was already render then we start fetch the data that create data loading waterfall but not here.
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id}></MenuItem>
      ))}
    </ul>
  );
}

// 1) create loader
// this function can be placed anywhere
// data fetching really fired off in router itself in app.jsx

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
