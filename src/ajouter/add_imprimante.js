import { useEffect } from "react";
import { useState } from "react";
import FetchUrl from "../fetch";
import Form from "../components/form";

export default function AddImprimante({showAddBar}){
    // myData
    const [myFormData, setMyFormData] = useState({modele: "", marque: "", departement: "", quantite: 1, ip: ""});

    // Getting Departements
    const [departements, setRows] = useState([]);
    useEffect(() => {
        // Fetch data when component mounts
        FetchUrl("departement", "get_departements")
        .then(rows => {
            setRows(rows); // Update state with fetched rows
        })
        .catch(error => {
            console.error('Error fetching rows:', error);
        });
    }, []); // Empty dependency array ensures useEffect runs only once on mount
    let myDepartements = departements.map((dep, i) => (
        <option key={i+1} value={dep['id']}> {dep["titre"]} </option>
    ))

    return (
        <Form
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            myDepartements={myDepartements}
            inputs={['modele', 'marque', 'ip', 'quantite', 'departement']}
            controller={'imprimante'}
            action={'create'}
        />
        
    )
}