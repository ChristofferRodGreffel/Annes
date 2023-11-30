import { Route, Routes } from "react-router-dom";
import PageWrapperContainer from "./components/PageWrapperContainer";
import CreateMenuProduct from "./pages/admin/CreateMenuProduct";
import AdminSidebar from "./components/AdminSidebar";
import LandingPage from "./pages/customer/LandingPage";

function App() {



  return (
    <>
      <Routes>
        <Route path="/admin-sidebar" element={<AdminSidebar />} />
        <Route path="/opret-produkt" element={<CreateMenuProduct />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
