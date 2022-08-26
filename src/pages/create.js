import { useState } from "react";
import { UseAppContext } from "../store/store";
import LayOut from "../components/layOut";
import { useNavigate } from "react-router-dom";
import { data } from "../components/countries"
import Select from "react-select";
import { agregar } from "../components/indexedDb";
import styles from "../components/estilos.module.css";



export default function Create() {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("Andorra");
    const [position, setPosition] = useState("arquero");
    const [picture, setPicture] = useState("noPicture.png");
    const [stars, setStars] = useState("1");

    const store = UseAppContext();

    const options = data.map((pais) => {
        var obj = {};
        obj.value = pais.name;
        obj.label = pais.name;
        return obj;
    }
    );




    const navigate = useNavigate();

    function handleChange(e) {
        const name = e.target.name;
        switch (name) {
            case "title": setTitle(e.target.value)
                break;
            case "country": setCountry(e.target.value)
                break;
            case "position": setPosition(e.target.value)
                break;
            case "stars": setStars(e.target.value)
                break;
        }
    }



    function handleOnChangeFile(e) {
        const element = e.target;
        const file = element.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            setPicture(reader.result.toString())
        };

    }

    function handleSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            id: crypto.randomUUID(), // introduce un ID aleatorio
            title,
            country,
            position,
            picture,
            stars
        };

        // TODO para registrar el jugador
        store.createItem(newPlayer);
        navigate("/");


    }

    return (
        <LayOut>


            <form onSubmit={handleSubmit} className={styles.formulario}>
                <h1>CREATE ONE!</h1>
                <div className={styles.formularioOrden}>
                    <div className={styles.in}>
                        <div>Name</div>
                        <input type="text" name="title" onChange={handleChange} value={title} required />
                    </div>
                    <div className={styles.in}>
                        <div>Country</div>

                        <select  type="text" name="country" onChange={handleChange} value={country} required>
                            {data.map(pais => (
                                <option value={pais.name}>{pais.name}</option>

                            ))}
                        </select>
                    </div>
                    <div className={styles.in}>
                        <div>Position</div>
                        <select name="position" onChange={handleChange} value={position} required>
                            <option value="arquero">Arquero</option>
                            <option value="defensor">Defensor</option>
                            <option value="mediocampista">Mediocampista</option>
                            <option value="delantero">Delantero</option>
                        </select>
                    </div>
                    <div className={styles.in}>
                        <div>Picture</div>
                        <input type="file" aria-label="File" name="picture" onChange={handleOnChangeFile} />
                        <div className={styles.images}>{!!picture ? <img src={picture} width="300px" alt="preview" /> : <img src="noPicture.png" width="300px" />}</div>
                    </div>
                    <div className={styles.in}>
                        <div>Stars</div>
                        <select name="stars" onChange={handleChange} defaultValue="3" value={stars} required>
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐⭐</option>
                            <option value="3">3 ⭐⭐⭐</option>
                            <option value="4">4 ⭐⭐⭐⭐</option>
                            <option value="5">5 ⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                    <div className={styles.in}>
                        <input className={styles.button} type="submit" value="Add Player" />
                    </div>

                </div>
            </form>


        </ LayOut>
    )
}