import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Service from './pages/Service.jsx';
import Shop from "./pages/Shop.jsx";
import Hub from "./pages/Hub.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.jsx";
import SingleBlog from "./components/SingleBlog/SingleBlog.jsx";
import servicesData from './data/services.json';
import SingleService from "./components/SingleService/SingleService.jsx";
import Team from "./pages/Team/Team.jsx";
import Projects from "./pages/Projects/Projects.jsx"; 
import CheckoutForm from "./components/CheckoutForm/CheckoutForm.jsx";


function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Hub />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/product/:productId" element={<SingleProduct />} />
      <Route path="/post/:id" element={<SingleBlog />} />
      <Route path="/service/:id" element={<SingleService />} />
      <Route path="/team-members" element={<Team />} /> 
      <Route path="/projects" element={<Projects />} />
      
    </Routes>
  );
}

export default App;
