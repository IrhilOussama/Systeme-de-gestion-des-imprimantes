import { useState } from "react";
import Form from "../components/form";

export default function AddDepartement({showAddBar}){
    const [myFormData, setMyFormData] = useState({titre: ""});

    return (
        <Form 
            myFormData={myFormData}
            setMyFormData={setMyFormData}
            showAddBar={showAddBar}
            inputs={['titre']}
            controller={'departement'}
            action={'create'}
        />
        
    )
}