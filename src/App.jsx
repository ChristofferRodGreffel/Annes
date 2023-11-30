import { Route, Routes } from "react-router-dom";
import PageWrapperContainer from "./components/PageWrapperContainer";
import CreateMenuProduct from "./pages/admin/CreateMenuProduct";

function App() {



  return (
    <>
      <Routes>

        <Route path="/admin-sidebar" element={<AdminSidebar />} />
        <Route path="/opret-produkt" element={<CreateMenuProduct />} />
        <Route path="*" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <PageWrapperContainer>
        <div className="bg-primary">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
        <div className="bg-violet-500 breakout md:bg-blue-200">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
        <div className="bg-pink-500 full-width">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
      </PageWrapperContainer>
    </>
  );
}

export default App;
