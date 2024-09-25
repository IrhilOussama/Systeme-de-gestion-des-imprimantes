import { useState, useEffect, useContext } from "react";
import FetchUrl from "../fetch";
import Form from "../components/form";
import { AppContext } from "../App";

export default function AddToner({showAddBar}){
    // myData
    const [myFormData, setMyFormData] = useState({modele: "", marque: "", couleur: "", compatibilite: '', stock: ''});
    const {refreshData} = useContext(AppContext);
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
    
    const nodelist = myImprimantes.map((u, i) => (
        <option key={i+1} value={u['id']}> {u["modele"]} </option>
    ))

    return (
        <Form 
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            myImprimantes={nodelist}
            inputs={['modele', 'marque', 'couleur', 'compatibilite', 'stock']}            
            controller={'toner'}
            action={'create'}
        />
        
    )
}