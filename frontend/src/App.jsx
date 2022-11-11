import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Container } from "./components/layout/Container";
import { Message } from "./components/layout/Message";

// Pages
import { Home } from "./components/pages/Home";
import { Login } from "./components/pages/Auth/Login";
import { Register } from "./components/pages/Auth/Register";

// Context
import { UserProvider } from "./context/UserContext";

export function App() {

  return (
    <BrowserRouter>
    <UserProvider>
    <Navbar />
    <Message />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </BrowserRouter>
  )
}