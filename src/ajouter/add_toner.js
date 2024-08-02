import { useState, useEffect } from "react";
import FetchUrl from "../fetch";
import Form from "../components/form";

export default function AddToner({onAdd, showAddBar, refreshData}){
    // myData
    const [myFormData, setMyFormData] = useState({modele: "", marque: "", couleur: "", compatibilite: ''});

    const [myImprimantes, setMyImprimantes] = useState([]);
    
    useEffect(() => {
        // Fetch data when component mounts
        FetchUrl("imprimante", 'get_imprimantes_none_working')
        .then(users => {
            setMyImprimantes(users); // Update state with fetched rows
        })
        .catch(error => {
            console.error('Error fetching rows:', error);
        });
    }, [refreshData]); // Empty dependency array ensures useEffect runs only once on mount
    
    const nodelist = myImprimantes.map(u => (
        <option value={u['id']}> {u["modele"]} </option>
    ))

    return (
        <Form 
            onAdd={onAdd}
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            myImprimantes={nodelist}
            inputs={['modele', 'marque', 'couleur', 'compatibilite']}            
            controller={'toner'}
            action={'create'}
        />
        
    )
}