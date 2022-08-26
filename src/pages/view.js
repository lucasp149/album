import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LayOut from "../components/layOut";
import { UseAppContext } from "../store/store";
import styles from "../components/estilos.module.css";
import loadStars from "../components/player";

export default function View() {
    const [item, setItem] = useState(null);
    const params = useParams();
    const store = UseAppContext();

    const navigate = useNavigate();


    useEffect(() => {
        const player = store.getItem(params.bookId);
        setItem(player);
    }, []);

    if (!item) {
        return <div>No se encuentra el jugador 😢</div>
    }

    console.log(item.picture);
    if(item.picture === "noPicture.png"){
        item.picture = "../noPicture.png";

    };

    function calidad(item) {
        switch (item?.stars) {
            case "4": return "muy buen jugador";
            case "3": return "buen jugador de fútbol";
            case "2": return "jugador más bien mediocre";
            case "1": return "mal jugador de fútbol"
            case "5": return "verdadero Crack de la historia del fútbol";
        }
    };

    function handleClick(){

        var sure = window.confirm("Estas seguro?");

        if(sure=== false){
        }

        if(sure === true){
            const id = item.id;
            store.deleteItem(id);
            navigate("/");
        }

    };


   
    return (

        <LayOut>
            <div className={styles.cuadro}>

                <img className={styles.fotosBig} src={item.picture} width="200px" />
                <div className={styles.buttonOut} onClick={handleClick}>Delete Player</div>
                <div className={styles.descripcion}>
                    <div>{item?.title} es un jugador nacido en {item?.country}</div>
                    <div>Es considerado un {calidad(item)}</div>
                </div>
                <div className={styles.linkYou}>
                    <a target="_blank" href={`https://www.youtube.com/results?search_query=${item.title}+goals`}>📺 <br/>Miralo en acción</a>
                </div>

            </div>
        </LayOut>

    )
}