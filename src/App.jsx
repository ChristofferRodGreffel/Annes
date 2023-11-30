import "./App.css";
import PageWrapperContainer from "./components/PageWrapperContainer";

function App() {
  return (
    <>
      <PageWrapperContainer>
          <div className="bg-primary">
            <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
          </div>
          <div className="bg-red-500 breakout md:bg-blue-200">
            <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
          </div>
          <div className="bg-red-500 full-width">
            <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
          </div>
      </PageWrapperContainer>
    </>
  );
}

export default App;
