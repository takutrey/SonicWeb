import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Service from './pages/Service.jsx';
import Shop from "./pages/Shop.jsx";
import ContactUs from "./pages/ContactUs.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
