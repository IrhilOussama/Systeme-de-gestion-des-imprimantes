import React, { useState, useEffect} from 'react'; 
import FetchUrl from '../fetch.js';
import {Head, ModificationButtons} from './table_components';
import fetchData from '../fetch.js';





function Rows({onClickAddUserBtn, triggerRefresh, refreshData}){
    const [rows, setRows] = useState([]);
    const [imprimantes, setImprimantes] = useState([]);
    const [departements, setDepartements] = useState([]);
    // form data to send to update_departement.php when update
    const [myFormData, setMyFormData] = useState({
        id: "",
        nom: "",
        id_imprimante: "",
        id_departement: ""
    })
    const [editableRowId, setEditableRowId] = useState(-1);
    // the form data will get the data of the (to edit) row
    useEffect(() => {
        const editableRow = rows.find(row => row.id === editableRowId);
        if (editableRow !== undefined)
            setMyFormData({
                id: editableRow.id,
                nom: editableRow.nom,
                id_imprimante: editableRow.id_imprimante,
                id_departement: editableRow.id_departement
            })
    }, [rows, editableRowId])
    // updating data when submiting form
    async function handleFormSubmit(e){
        e.preventDefault();
        const readyFormData = new FormData();
        for (let key in myFormData){
            if (myFormData.hasOwnProperty(key)){
                readyFormData.append(key, myFormData[key]);
            }
        }
        try {
            const response = await fetchData("utilisateur", "update", "POST", readyFormData);

            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
        triggerRefresh();
        setEditableRowId(-1);
    }
    
    // getting utilisateurs et imprimantes
    useEffect(() => {
        FetchUrl('utilisateur', 'get_utilisateurs')
        .then(res => {
            setRows(res);
        })
        .catch(error => console.log("error fetching data " + error ))
        FetchUrl("imprimante", "get_imprimantes_available")
        .then(res => {
            setImprimantes(res);
        })
        .catch(error => console.log("error fetching data " + error ))

        FetchUrl("departement", "get_departements")
        .then(res => {
            setDepartements(res);
        })
        .catch(error => console.log("error fetching data " + error ))
    }, [refreshData])

    const myNodeList = [];
    rows.forEach((row, i) => {
        let isEditable = row.id === editableRowId;
        let editableExist = editableRowId !== -1;
        const inputsClasses = 
        "w-full bg-transparent flex justify-center items-center focus:outline-none font-medium text-xs md:text-sm lg:text-base h-full outline-none text-center py-3 duration-200 " 
        +(isEditable ? "bg-green-200 focus:border-blue-500 border-b border-transparent" : "") ;
        myNodeList.push(
            <form key={i} onSubmit={handleFormSubmit} 
            className={"grid mygrid-4 text-center "
            + ( (isEditable) ? "bg-amber-50 shadow-sm shadow-slate-300" 
            : " hover:bg-myColor1 hover:shadow-sm hover:shadow-slate-300"
            + (editableExist && !isEditable ? " pointer-events-none" : ""))}>
                <div>
                    <input 
                        readOnly={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, nom: e.target.value});
                        }}
                        type='text' 
                        name='nom'
                        placeholder="Nom et Prenom" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.nom : row.nom}
                    />
                </div>
                <div>
                    <select 
                        name='departement'
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, id_departement: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer"}>
                            <option key={0} value={row['id_departement']}>{row['departement_titre']}</option>
                            {departements.map((dep, i) => {
                                if (dep.id !== row['id_departement'])
                                    return <option key={i} value={dep.id}> {dep.titre} </option>
                                return null
                            })}
                    </select>
                </div>
                <div>
                    <select 
                        name='imprimante'
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, id_imprimante: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer"}>
                            <option key={0} value={row['id_imprimante']}>{row['imprimante_associee']}</option>
                            {imprimantes.map((imp, i) => {
                                if (imp.id !== row['id_imprimante'])
                                    return <option key={i} value={imp.id}> {imp.modele} </option>
                                return null
                            })}
                    </select>
                </div>
                
                <ModificationButtons 
                    myId={row.id} 
                    title={'utilisateur'} 
                    triggerRefresh={triggerRefresh} 
                    onClickModificationBtn={setEditableRowId}
                    editableRowId={editableRowId}
                    onClickSaveBtn={() => {setEditableRowId(-1)}}
                />

            </form>
        )
    })
    return(
        <>
        {myNodeList}
        </>
    )
}



export default function TableUtilisateur({refreshData, triggerRefresh, onClickAddUserBtn}){
    const departement_columns = ["nom et prenom", "departement", "imprimante associee", "action"];

    return(
        <div className="absolute w-10/12 right-0 mt-24 p-6">
            <Head key={0} columns={departement_columns}/>
            <Rows 
            onClickAddUserBtn={onClickAddUserBtn}
            key={1} 
            imprimante_columns={departement_columns} 
            refreshData={refreshData} 
            triggerRefresh={triggerRefresh} />
        </div>
    )
}

