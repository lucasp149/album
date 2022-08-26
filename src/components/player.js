import styles from "../components/estilos.module.css";
import { Link } from "react-router-dom";

export default function Player({ item }) {

    function loadStars(data) {
        switch (data) {
            case "4": return "⭐⭐⭐⭐";
            case "3": return "⭐⭐⭐";
            case "2": return "⭐⭐";
            case "1": return "⭐"
            case "5": return "⭐⭐⭐⭐⭐";
        }
    }
    return (
        
            <Link className={styles.link} to={`/view/${item.id}`} >
                <div className={styles.cuadro}>
                    <img className={styles.fotos} src={item.picture} width="200px" />
                    <div>{item.title} from {item.country}</div>
                    <div>{loadStars(item.stars)}</div>
                </div>
            </Link>



        


    )
}