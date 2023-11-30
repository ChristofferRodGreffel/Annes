import { Route, Routes } from "react-router-dom";
import CreateMenuProduct from "./pages/admin/CreateMenuProduct";
import LandingPage from "./pages/customer/LandingPage";
import MenuOverview from "./pages/admin/MenuOverview";
import OrderOverview from "./pages/admin/OrderOverview";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/menu-oversigt/opret-produkt" element={<CreateMenuProduct />} />
        <Route path="/menu-oversigt" element={<MenuOverview />} />
        <Route path="/ordre-oversigt" element={<OrderOverview />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
