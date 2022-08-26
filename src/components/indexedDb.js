

const indexedDb = window.indexedDB;

let dataBase;

// creamos la base de datos: Esta base será utilizada únicamente para no perder la información al cerrar y volver a abrir la página

// se crea la constante de conexion

const connect = indexedDb.open("myPlayers"); //  crea una conexion con "myPlayers". Si existe, simplemente conecta

connect.onsuccess = () => {
    dataBase = connect.result; // la conexion devuelve la información que ingresa a dataBase
    console.log("Data base is open *****");
    
    console.log(dataBase);
};



connect.onupgradeneeded = (element) => {
    dataBase = element.target.result;
    console.log("Data base created /////////");
    const objectCollection = dataBase.createObjectStore("Jugadores",{
        keyPath: "clave"
    });
};
 
connect.onerror = (err) => {
    console.log("Shit Happens ----------------");
};

// funciones para manipular la base de datos

const agregar = (data)=> { // recibe la informacion a agregar. Tiene que tener el formato correspondiente
    const transaction = dataBase.transaction(["myPlayers"], "readwrite"); // creamos la transaccion. Le pasamos la colección y el tipo de operacion
    const objectCollection = transaction.objectStore("Jugadores"); // almacenamos la base de datos en objectCollection
    const connect = objectCollection.add(data);
    consultar(); 
};

/*const actualizar = (datos)=> { //recibe una base de datos completa
    const transaction = dataBase.transaction(["myPlayers"], "readwrite"); // creamos la transaccion. Le pasamos la colección y el tipo de operacion
    const objectCollection = transaction.objectStore("Jugadores"); // almacenamos la base de datos en objectCollection
    // AGREGADO EL CONSOLE LOG
    console.log(objectCollection);
    //******************************
    const connect = objectCollection.put(datos);
    connect.onsuccess = () => {
        console.log("Succeded updating data Base!");
    }
    connect.onerror = (err) => {
        console.log("Error al conectar"+ err)
    }
    console.log("actualizado correctamente!");
    consultar();
};*/

const eliminar = (clave)=> {
    const transaction = dataBase.transaction(["myPlayers"], "readwrite"); // creamos la transaccion. Le pasamos la colección y el tipo de operacion
    const objectCollection = transaction.objectStore("Jugadores"); // almacenamos la base de datos en objectCollection
    const connect = objectCollection.delete(clave);
    connect.onsuccess = () => {
        consultar();
    }

};

const consultar = ()=> {
    const transaction = dataBase.transaction(["myPlayers"], "readonly"); 
    const objectCollection = transaction.objectStore("Jugadores");
    const connect = objectCollection.openCursor(); // abre un cursor ?? Recorre todos los datos

    connect.onsuccess = e => {
        const cursor = e.target.result;
        if(cursor){
            console.log("Datos de la base");
            console.log(cursor.value); // deberia devolver el objeto en el que está posicionado
        }
        else{
            console.log("No hay jugadores en la base de datos");
        }
    }

};





export  function Base(){
    return dataBase;
}

export default function actualizar(datos){
     //recibe una base de datos completa
        const transaction = dataBase.transaction(["myPlayers"], "readwrite"); // creamos la transaccion. Le pasamos la colección y el tipo de operacion
        const objectCollection = transaction.objectStore("Jugadores"); // almacenamos la base de datos en objectCollection
        // AGREGADO EL CONSOLE LOG
        console.log(objectCollection);
        //******************************
        const connect = objectCollection.put(datos);
        connect.onsuccess = () => {
            console.log("Succeded updating data Base!");
        }
        connect.onerror = (err) => {
            console.log("Error al conectar"+ err)
        }
        console.log("actualizado correctamente!");
        consultar();
    };
