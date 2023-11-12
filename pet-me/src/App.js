import { BrowserRouter } from "react-router-dom";
import './app.css'

import Router from "./router/Router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Router />
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
