import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { DarkModeProvider } from "./context/DarkModeContext";
import "./App.css";

function App() {
  return (
    <>
      <DarkModeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DarkModeProvider>
    </>
  );
}

export default App;
