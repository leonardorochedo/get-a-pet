import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Pages
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Auth/Login";
import { Register } from "./components/pages/Auth/Register";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}