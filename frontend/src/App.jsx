import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";
// import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <DarkModeProvider>
        <Router>
          {/* <ErrorBoundary> */}
          <AppRoutes />
          {/* </ErrorBoundary> */}
        </Router>
      </DarkModeProvider>
    </>
  );
}

export default App;
