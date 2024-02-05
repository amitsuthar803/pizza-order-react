import Header from "./Header";
import Loader from "./Loader";

import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  // implementing loader
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* loading component */}
      {isLoading && <Loader></Loader>}

      <Header />
      <div className="overflow-scroll">
        <main className=" max-w-3xl mx-auto">
          <Outlet></Outlet>
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
