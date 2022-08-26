import { createContext, useContext, useEffect, useState } from "react"
import actualizar from "../components/indexedDb.js";

const AppContext = createContext({
    items: [],
    createItem: (item) => { },
    getItem: (id) => { },
    updateItem: (item) => { },
});


export default function Store({ children}) {
    const [items, setItems] = useState([]);



    // agregado para el indexedDB
    
   /*useEffect(() => {
        async function act(data) {
            let valores = {
                clave: 1,
                value: data
            };
            console.log(valores);
            this.actualizar(valores);
           
            console.log("base de datos actualizada correctamente");
        }
        act(items);
    }, [items]);*/

    //*****************************************************

    function createItem(item) {
        const temp = [...items];
        temp.unshift(item);
        setItems([...temp]);
        console.log(items);
    }

    function getItem(id) {
        const item = items.find(item => item.id === id);
        return item;
    }

    function updateItem(item) {
        const temp = [...items];
        const index = items.findIndex(i => i.id === item.id)
        temp[index] = { ...item };

        // no retorna nada???
    }

  function deleteItem(id){
        const temp = [...items];
        const index = items.findIndex(i=>i.id === id);
        temp.splice(index,1);
        setItems([...temp]);
    }


    return (
        <AppContext.Provider
            value={{
                items,
                createItem,
                getItem,
                updateItem,
                deleteItem,
            }}>

            {children}



        </AppContext.Provider>
    );
}

export function UseAppContext() {
    return useContext(AppContext);
}