import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/pages/home"
import Contato from "./components/pages/contato"
import Empresa from "./components/pages/empresa"
import Container from "./components/layout/Container"
import NavBar from "./components/layout/Navbar"
import Projetos from "./components/pages/projetos"
import Footer from "./components/layout/Footer"
import NovoProjeto from "./components/pages/novoprojeto"
import Project from "./components/pages/project"
function App() {

  return (
    
    <Router>
      <NavBar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/novoprojeto" element={<NovoProjeto />} />
          <Route path="/project/:id" element={<Project />} />

        </Routes>
      </Container>
      <Footer />



    </Router>


  );
}

export default App;
