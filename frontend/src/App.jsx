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
import { MyPets } from "./components/pages/Pet/MyPets";
import { AddPet } from "./components/pages/Pet/AddPet";
import { MyAdoptions } from "./components/pages/Pet/MyAdoptions";

// Context
import { UserProvider } from "./context/UserContext";
import { EditPet } from "./components/pages/Pet/EditPet";
import { PetDetails } from "./components/pages/Pet/PetDetails";


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
          <Route path="/pets/add" element={<AddPet />} />
          <Route path="/pets/edit/:id" element={<EditPet />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/pets/myadoptions" element={<MyAdoptions />} />
        </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </BrowserRouter>
  )
}