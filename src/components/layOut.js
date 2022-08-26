import NavBar from "./navBar";

export default function LayOut({children}){
    return (
        <div>
            <NavBar />
            <div>{children}</div>
        </div>


    )
}