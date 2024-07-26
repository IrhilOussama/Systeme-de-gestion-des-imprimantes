import { useEffect } from "react";
import { useState } from "react";
import FetchUrl from "./fetch";
import Form from "./form";

export default function AddImprimante({onAdd, showAddBar}){
    // myData
    const [myFormData, setMyFormData] = useState({modele: "", marque: "", departement: "", quantite: 1, ip: ""});

    // Getting Departements
    const [departements, setRows] = useState([]);
    useEffect(() => {
        // Fetch data when component mounts
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_departements.php")
        .then(rows => {
            setRows(rows); // Update state with fetched rows
        })
        .catch(error => {
            console.error('Error fetching rows:', error);
        });
    }, []); // Empty dependency array ensures useEffect runs only once on mount
    let myDepartements = departements.map(dep => (
        <option value={dep['id']}> {dep["titre"]} </option>
    ))

    return (
        <Form 
            onAdd={onAdd}
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            myDepartements={myDepartements}
            inputs={['modele', 'marque', 'ip', 'quantite', 'departement']}
            url="http://localhost/gestion-imprimantes-react/functions/create/create_imprimante.php"
        />
        
    )
}