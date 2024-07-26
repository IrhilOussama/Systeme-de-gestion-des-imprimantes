
import AddImprimante from "./add_imprimante";
import AddDepartement from "./add_departement";
import AddUtilisateur from "./add_utilisateur";
import AddToner from "./add_toner";

export default function Add({titre, onAdd, showAddBar, refreshData}){
    if (titre === "imprimante")
        return <AddImprimante onAdd={onAdd} showAddBar={showAddBar} />
    else if (titre === "departement"){
        return <AddDepartement onAdd={onAdd} showAddBar={showAddBar} />
    }
    else if (titre === "utilisateur"){
        return <AddUtilisateur onAdd={onAdd} showAddBar={showAddBar} refreshData={refreshData} />
    }
    else if (titre === "toner"){
        return <AddToner onAdd={onAdd} showAddBar={showAddBar} refreshData={refreshData} />
    }
    
}