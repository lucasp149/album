import { UseAppContext } from "../store/store";
import LayOut from "../components/layOut";
import Base from "../components/indexedDb";
import { useEffect } from "react";
import styles from "../components/estilos.module.css";
import Player from "../components/player";



export default function Index() {

    /* useEffect(() => {
         store.items = Base();
       }, []);*/


    const store = UseAppContext();



    return (

        <LayOut   >
            <div className={styles.canvas}>
                {store.items.map((item) =>

                    (<Player key={item.id} item={item} />)

                )}

            </div>
        </LayOut>

    )
}