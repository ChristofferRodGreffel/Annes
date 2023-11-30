import { Route, Routes } from "react-router-dom";
import PageWrapperContainer from "./components/PageWrapperContainer";
import CreateMenuProduct from "./pages/admin/CreateMenuProduct";
import AdminSidebar from "./components/AdminSidebar";
import LandingPage from "./pages/customer/LandingPage";
import MenuOverview from "./pages/admin/MenuOverview";
import OrderOverview from "./pages/admin/OrderOverview";

function App() {
  return (
    <>
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
