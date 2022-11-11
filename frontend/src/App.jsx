import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Container } from "./components/layout/Container";

// Pages
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Auth/Login";
import { Register } from "./components/pages/Auth/Register";

export function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}