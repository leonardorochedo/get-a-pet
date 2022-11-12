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
import { Profile } from "./components/pages/User/Profile";

// Context
import { UserProvider } from "./context/UserContext";
import { MyPets } from "./components/pages/Pet/MyPets";

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
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/pets/mypets" element={<MyPets />} />
        </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </BrowserRouter>
  )
}