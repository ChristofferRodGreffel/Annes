import { Route, Routes } from "react-router-dom";
import PageWrapperContainer from "./components/PageWrapperContainer";
import CreateMenuProduct from "./pages/admin/CreateMenuProduct";
import AdminSidebar from "./components/AdminSidebar";
import LandingPage from "./pages/customer/LandingPage";
import MenuOverview from "./pages/admin/MenuOverview";

function App() {
  return (
    <>
      <Routes>
        <Route path="/menu-oversigt/opret-produkt" element={<CreateMenuProduct />} />
        <Route path="/menu-oversigt" element={<MenuOverview />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
