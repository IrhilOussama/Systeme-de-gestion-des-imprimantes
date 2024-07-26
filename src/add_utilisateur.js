import { useEffect, useState, useTransition } from "react";
import Form from "./form";
import FetchUrl from "./fetch";

export default function AddUtilisateur({onAdd, showAddBar, refreshData}){
    const [myFormData, setMyFormData] = useState({nom: "", imprimante_id: ""});

    const [myImprimantes, setMyImprimantes] = useState([]);
    
    useEffect(() => {
        // Fetch data when component mounts
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_imprimantes.php?libre=true")
        .then(users => {
            setMyImprimantes(users); // Update state with fetched rows
            console.log(myImprimantes)
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
         myImprimantes={nodelist}
          setMyFormData={setMyFormData}
           showAddBar={showAddBar}
              inputs={['nom', 'imprimante_id']}
               url="http://localhost/gestion-imprimantes-react/functions/create/create_utilisateur.php"
              />
        
    )
}