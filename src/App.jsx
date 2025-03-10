import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Service from './pages/Service.jsx';
import Shop from "./pages/Shop.jsx";
import Hub from "./pages/Hub.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.jsx";
import SingleBlog from "./components/SingleBlog/SingleBlog.jsx";


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
      <Route path="/post/:id" component={<SingleBlog />} />
    </Routes>
  );
}

export default App;
