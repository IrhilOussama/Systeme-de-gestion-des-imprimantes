import React, { useState, useEffect} from 'react'; 
import FetchUrl from './fetch.js';
import {Head, ModificationButtons} from './table_components';





function Rows({onClickAddUserBtn, triggerRefresh, refreshData}){
    const [rows, setRows] = useState([]);
    // form data to send to update_departement.php when update
    const [myFormData, setMyFormData] = useState({
        id: "",
        titre: ""
    })
    const [editableRowId, setEditableRowId] = useState(-1);
    // the form data will get the data of the (to update) row
    useEffect(() => {
        const editableRow = rows.find(row => row.id === editableRowId);
        if (editableRow !== undefined)
            setMyFormData({
                id: editableRow.id,
                titre: editableRow.titre
            })
    }, [editableRowId])
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
            const response = await fetch("http://localhost/gestion-imprimantes-react/functions/update/update_departement.php", {
                method: 'POST',
                body: readyFormData,
            });

            const result = await response.text(); // Use response.json() if your PHP returns JSON
            console.log(result)
        } catch (error) {
            console.error('Error:', error);
        }
        triggerRefresh();
        setEditableRowId(-1);
    }
    // getting departements
    useEffect(() => {
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_departements.php")
        .then(res => {
            setRows(res);
        })
    }, [refreshData])
    console.log('dks')

    const myNodeList = [];
    rows.forEach(row => {
        let isEditable = row.id === editableRowId;
        let editableExist = editableRowId !== -1;
        const inputsClasses = 
        "w-full bg-transparent flex justify-center items-center focus:outline-none font-medium text-xs md:text-sm lg:text-base h-full outline-none text-center py-3 duration-200 " 
        +(isEditable ? "bg-green-200 focus:border-blue-500 border-b border-transparent" : "") ;
        myNodeList.push(
            <form onSubmit={handleFormSubmit} 
            className={"grid mygrid-3 text-center "
            + ( (isEditable) ? "bg-amber-50 shadow-sm shadow-slate-300" 
            : " hover:bg-myColor1 hover:shadow-sm hover:shadow-slate-300"
            + (editableExist && !isEditable ? " pointer-events-none" : ""))}>
                <div>
                    <input 
                        readOnly={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, titre: e.target.value});
                        }}
                        type='text' 
                        placeholder="Titre" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.titre : row.titre}
                    />
                </div>
                <div>
                    <p className={inputsClasses}> {row['nombre_imprimantes']} </p>
                </div>
                <ModificationButtons 
                    myId={row.id} 
                    title={'departement'} 
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



export default function TableDepartement({refreshData, triggerRefresh, onClickAddUserBtn}){
    const departement_columns = ["titre", "nombre des imprimantes", "action"];

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

