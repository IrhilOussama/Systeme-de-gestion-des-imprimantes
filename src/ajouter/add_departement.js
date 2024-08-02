import { useState } from "react";
import Form from "../components/form";

export default function AddDepartement({onAdd, showAddBar}){
    const [myFormData, setMyFormData] = useState({titre: ""});

    return (
        <Form 
            onAdd={onAdd}
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            inputs={['titre']}
            controller={'departement'}
            action={'create'}
        />
        
    )
}