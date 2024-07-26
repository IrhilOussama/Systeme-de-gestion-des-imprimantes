import React, { useState, useEffect} from 'react'; 
import FetchUrl from './fetch.js';
import {Head, ModificationButtons} from './table_components';





function Rows({onClickAddUserBtn, triggerRefresh, refreshData, filter}){
    const [backUpRows, setBackUpRows] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (filter){
            setRows(backUpRows.filter(row => row['departement_titre'] === filter));
        }
        else {
            setRows(backUpRows)
        }
    }, [filter])
    
    const [departements, setDepartements] = useState([]);
    const [myFormData, setMyFormData] = useState({
        id: "",
        modele: "",
        marque: "",
        ip: "",
        quantite: "",
        departement: '',
        utilisateur: ''
    })
    const [editableRowId, setEditableRowId] = useState(-1);

    useEffect(() => {
        const editableRow = rows.find(row => row.id === editableRowId);
        if (editableRow !== undefined)
            setMyFormData({
                id: editableRow.id,
                modele: editableRow.modele,
                marque: editableRow.marque,
                ip: editableRow.ip,
                quantite: editableRow.stock,
                departement: editableRow['departement_id'],
                utilisateur: editableRow['utilisateur_id']
            })
    }, [editableRowId])
    
    async function handleFormSubmit(e){
        e.preventDefault();
        const readyFormData = new FormData();
        for (let key in myFormData){
            if (myFormData.hasOwnProperty(key)){
                readyFormData.append(key, myFormData[key]);
            }
        }
        try {
            const response = await fetch("http://localhost/gestion-imprimantes-react/functions/update/update_imprimante.php", {
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

    
    useEffect(() => {
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_imprimantes.php")
        .then(res => {
            setRows(res);
            setBackUpRows(res);
        })
        .catch(error => {
            console.log("error fetching get_imprimantes.php: " + error);
        })
        FetchUrl("http://localhost/gestion-imprimantes-react/functions/getters/get_departements.php")
        .then(res => {
            setDepartements(res);
        })
    }, [refreshData])

    const myNodeList = [];
    rows.forEach(row => {
        let isEditable = row.id === editableRowId;
        let editableExist = editableRowId !== -1;
        const inputsClasses = 
        "w-full bg-transparent flex justify-center items-center focus:outline-none font-medium text-xs md:text-sm lg:text-base h-full outline-none text-center py-3 duration-200 " 
        +(isEditable ? "bg-green-200 focus:border-blue-500 border-b border-transparent" : "") ;
        myNodeList.push(
            <form onSubmit={handleFormSubmit} 
            className={"grid mygrid-8 text-center "
            + ( (isEditable) ? "bg-amber-50 shadow-sm shadow-slate-300" 
            : " hover:bg-myColor1 hover:shadow-sm hover:shadow-slate-300"
            + (editableExist && !isEditable ? " pointer-events-none" : ""))}>
                <div className='flex items-center'>
                    <img className='w-8 h-10 mr-2' alt='imprimante.png'  src='../imgs/imprimante-1.png' />
                    <input 
                        readOnly={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, modele: e.target.value});
                        }}
                        type='text' 
                        placeholder="Modele" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.modele : row.modele}
                    />
                </div>
                <div>
                    <input 
                        readOnly={!isEditable} 
                        onChange={(e) => {
                            setMyFormData({...myFormData, marque: e.target.value});
                        }} 
                        type='text'
                        placeholder="Marque" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.marque : row.marque}
                    />
                </div>
                <div>
                    <input
                        readOnly={!isEditable}
                        onChange={(e) => {
                            setMyFormData({...myFormData, ip: e.target.value});
                        }} 
                        type='text' 
                        placeholder="Adresse Ip" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.ip : row.ip}
                    />
                </div>
                <div>
                    <select 
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, departement: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer"}>
                            <option value={row['departement_id']}>{row['departement_titre']}</option>
                            {departements.map(dep => {
                                if (dep.id !== row['departement_id'])
                                    return <option value={dep.id}> {dep.titre} </option>
                                return null
                            })}
                    </select>
                </div>
                <div>
                    <input
                        readOnly={!isEditable}
                        onChange={(e) => {
                            setMyFormData({...myFormData, quantite: e.target.value});
                        }} 
                        type='number' 
                        placeholder="Quantite" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.quantite : row.stock}
                    />
                </div>
                <div>
                    <p className={inputsClasses}> 
                        {row.status === 0 ? "libre" : ''}
                        {row.status === row.stock ? "occupee" : ''}
                        {(row.status !== 0 && row.status !== row.stock) ? (row.stock - row.status) + ' / ' + row.stock + ' libre' : '' }
                    </p>
                </div>
                <div>
                    {row['status'] === 0 ? (
                        <button onClick={e => {e.preventDefault(); onClickAddUserBtn()}} className={inputsClasses + " border-none text-sm font-medium text-blue-900 underline"} /*value={row['utilisateur_id']}*/ >Ajouter Utilisateur</button>

                    ) : (
                        <button onClick={e => {e.preventDefault()}} className={inputsClasses + " border-none"} /*value={row['utilisateur_id']}*/ >
                            {row['utilisateurs'][1]}
                        </button>

                    )}
                </div>

                <ModificationButtons 
                    myId={row.id} 
                    title={'imprimante'} 
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



export default function TableImprimante({refreshData, triggerRefresh, onClickAddUserBtn, filter}){
    const imprimante_columns = ["modele", "marque", "adresse_ip", "departement", "stock", "status", "utilisateur", "action"];
    // const toner = [
    //     {id: 0, titre:"modele"},
    //     {id: 1, titre:"marque"},
    //     {id: 2, titre:"couleur"},
    //     {id: 3, titre:"compatibilite"},
    //     {id: 4, titre:"action"}
    // ]
    // const departement = [
    //     {id: 0, titre:"titre"},
    //     {id: 1, titre:"nombre_imprimantes"},
    //     {id: 2, titre:"action"}
    // ]
    // const utilisateur = [
    //     {id: 0, titre:"nom"},
    //     {id: 1, titre:"imprimante_associee"},
    //     {id: 2, titre:"action"}
    // ]

    return(
        <div className="absolute lg:w-10/12 md:w-11/12 sm:w-full right-0 mt-24 p-6">
            <Head key={0} columns={imprimante_columns}/>
            <Rows 
            filter={filter}
            onClickAddUserBtn={onClickAddUserBtn}
             key={1} 
             imprimante_columns={imprimante_columns} 
             refreshData={refreshData} 
             triggerRefresh={triggerRefresh} />
        </div>
    )
}

