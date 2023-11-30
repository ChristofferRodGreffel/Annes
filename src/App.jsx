import PageWrapperContainer from "./components/PageWrapperContainer";

function App() {
  return (
    <>
      <PageWrapperContainer>
        <div className="bg-primary">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
        <div className="bg-main-grey breakout">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
        <div className="bg-red full-width">
          <p className="text-primaryTest text-2xl text-opacity-20">Test</p>
        </div>
      </PageWrapperContainer>
    </>
  );
}

export default App;
