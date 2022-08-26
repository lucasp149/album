import { Link } from "react-router-dom";
import styles from "./estilos.module.css";

export default function NavBar() {
    return (
        <div className={styles.barra}>
            <div className={styles.titulos}>
                <Link className={styles.linkBar} to="/">Home</Link>
                <Link  className={styles.linkBar} to="/create">Create</Link>
            </div>
        </div>
    )
}