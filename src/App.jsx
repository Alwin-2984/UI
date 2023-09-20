import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrongPage from "./Screens/Components/SomethingWentWrongPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary fallback={<SomethingWentWrongPage />}>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
