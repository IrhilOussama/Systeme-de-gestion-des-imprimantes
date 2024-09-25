import { Outlet } from "react-router-dom"
import Aside from "./components/aside"
import Header from "./components/header"
import Add from "./ajouter/add"

export default function Layout({myTitle, setFilterDep, changeSection}){

    return(
        <>
            <Aside onButtonClick={changeSection} />
            <Outlet />

        </>
    )
}
