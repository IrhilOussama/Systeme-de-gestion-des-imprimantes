import { useContext, useEffect, useState } from "react";
import Form from "../components/form";
import FetchUrl from "../fetch";
import { AppContext } from "../App";

export default function AddUtilisateur({showAddBar}){
    const [myFormData, setMyFormData] = useState({nom: "", imprimante_id: "", departement_id: ""});
    const {refreshData} = useContext(AppContext);

    const [myImprimantes, setMyImprimantes] = useState([]);
    const [myDeps, setMyDeps] = useState([]);
    
    useEffect(() => {
        // Fetch data when component mounts
        FetchUrl("imprimante", 'get_imprimantes_available')
        .then(users => {
            setMyImprimantes(users); // Update state with fetched rows
        })
        .catch(error => {
            console.error('Error fetching rows:', error);
        });
        // Fetch data when component mounts
        FetchUrl("departement", "get_departements")
        .then(deps => {
            // Update state with fetched rows
            setMyDeps(deps);
        })
        .catch(error => {
            console.error('Error fetching rows:', error);
        });
    }, [refreshData]); // Empty dependency array ensures useEffect runs only once on mount
    
    const impNodeList = myImprimantes.map((u,i) => (
        <option key={i+1} value={u['id']}> {u["modele"]} </option>
    ))
    const depNodeList = myDeps.map((u, i) => (
        <option key={i+1} value={u['id']}> {u["titre"]} </option>
    ))

    return (
        <Form 
            myFormData={myFormData}
            myImprimantes={impNodeList}
            myDepartements={depNodeList}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            inputs={['nom', 'imprimante_id', 'departement_id']}
            controller={'utilisateur'}
            action={'create'}
        />
        
    )
}