
import AddImprimante from "./add_imprimante";
import AddDepartement from "./add_departement";
import AddUtilisateur from "./add_utilisateur";
import AddToner from "./add_toner";

export default function Add({titre, showAddBar}){
    titre = titre.toLowerCase();
    if (titre === "imprimante")
        return <AddImprimante showAddBar={showAddBar} />
    else if (titre === "departement"){
        return <AddDepartement showAddBar={showAddBar} />
    }
    else if (titre === "utilisateur"){
        return <AddUtilisateur showAddBar={showAddBar} />
    }
    else if (titre === "toner"){
        return <AddToner showAddBar={showAddBar} />
    }
    
}