import { useState } from "react";
import Form from "./form";

export default function AddDepartement({onAdd, showAddBar}){
    const [myFormData, setMyFormData] = useState({titre: ""});

    return (
        <Form 
        onAdd={onAdd}
         myFormData={myFormData}
          setMyFormData={setMyFormData}
           showAddBar={showAddBar}
              inputs={['titre']}
               url="http://localhost/gestion-imprimantes-react/functions/create/create_departement.php"
              />
        
    )
}