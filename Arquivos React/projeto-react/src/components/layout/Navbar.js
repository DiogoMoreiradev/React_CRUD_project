import Container from "./Container"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import logo from "../../img/logo.png";
function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Container>

            <Link to="/">
                <img src={logo} alt="Costs" width="64px" heigth="64px"/>
            </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projetos">Projetos</Link></li>
                    <li className={styles.item}><Link to="/empresa">Empresa</Link></li>
                    <li className={styles.item}><Link to="/contato">Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}


export default NavBar