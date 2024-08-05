import React, { useState, useEffect} from 'react'; 
import FetchUrl from '../fetch.js';
import {Head, ModificationButtons} from './table_components.js';
import fetchData from '../fetch.js';

function Rows({onClickAddUserBtn, triggerRefresh, refreshData}){
    const [rows, setRows] = useState([]);
    const [imprimantes, setImprimantes] = useState([]);
    const [myFormData, setMyFormData] = useState({
        id: "",
        modele: "",
        marque: "",
        couleur: "",
        compatibilite: "",
        niveau: ""
    })
    const [editableRowId, setEditableRowId] = useState(-1);

    useEffect(() => {
        const editableRow = rows.find(row => row.id === editableRowId);
        if (editableRow !== undefined)
            setMyFormData({
                id: editableRow.id,
                modele: editableRow.modele,
                marque: editableRow.marque,
                couleur: editableRow.couleur,
                compatibilite: editableRow.compatibilite,
                niveau: editableRow.niveau
            })
    }, [rows, editableRowId])
    
    async function handleFormSubmit(e){
        e.preventDefault();
        const readyFormData = new FormData();
        for (let key in myFormData){
            if (myFormData.hasOwnProperty(key)){
                readyFormData.append(key, myFormData[key]);
            }
        }
        try {
            const response = await fetchData("toner", "update", "POST", readyFormData);

            console.log(response) // Use response.json() if your PHP returns JSON
        } catch (error) {
            console.error('Error:', error);
        }
        triggerRefresh();
        setEditableRowId(-1);
    }

    
    useEffect(() => {
        FetchUrl("toner", "get_toners")
        .then(res => {
            setRows(res);
        })
        FetchUrl("imprimante", "get_imprimantes_none_working")
        .then(res => {
            setImprimantes(res);
        })
    }, [refreshData])

    const myNodeList = [];
    rows.forEach((row, i) => {
        let isEditable = row.id === editableRowId;
        let editableExist = editableRowId !== -1;
        const niveauList = ['epuisee', 'bas', 'moyen', 'normal'];
        const inputsClasses = 
        "w-full bg-transparent flex justify-center items-center focus:outline-none font-medium text-xs md:text-sm lg:text-base h-full outline-none text-center py-3 duration-200 " 
        +(isEditable ? "bg-green-200 focus:border-blue-500 border-b border-transparent" : "") ;
        myNodeList.push(
            <form key={i} onSubmit={handleFormSubmit} 
            className={"grid mygrid-6 text-center "
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
                        name='modele'
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
                        name='marque'
                        className={inputsClasses} 
                        value={isEditable ? myFormData.marque : row.marque}
                    />
                </div>
                <div>
                    <input
                        readOnly={!isEditable}
                        onChange={(e) => {
                            setMyFormData({...myFormData, couleur: e.target.value});
                        }} 
                        type='text' 
                        placeholder="Couleur" 
                        name='couleur'
                        className={inputsClasses} 
                        value={isEditable ? myFormData.couleur : row.couleur}
                    />
                </div>
                <div>
                    <select 
                        name='compatibilite'
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, compatibilite: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer"}>
                            <option key={0} value={row['compatibilite']}>{row['imprimante_titre']}</option>
                            {imprimantes.map((imp, i) => {
                                if (imp.id !== row['compatibilite'])
                                    return <option key={i} value={imp.id}> {imp.modele} </option>
                                return null
                            })}
                    </select>
                </div>
                <div>
                    <select 
                        name='niveau'
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, niveau: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer"}>
                            <option key={0} value={row['niveau']}>{niveauList[row['niveau']]}</option>
                            {niveauList.map((n, i) => {
                                if (i !== row['niveau'])
                                    return <option key={i} value={i}> {n} </option>
                                return null
                            })}
                    </select>
                </div>
                


                <ModificationButtons 
                    myId={row.id} 
                    title={'toner'} 
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



export default function TableToner({refreshData, triggerRefresh, onClickAddUserBtn}){
    const toner_columns = ["modele", "marque", "couleur", "compatibilite", "niveau", "action"];

    return(
        <div className="absolute w-10/12 right-0 mt-24 p-6">
            <Head key={0} columns={toner_columns}/>
            <Rows 
            onClickAddUserBtn={onClickAddUserBtn}
             key={1} 
             toner_columns={toner_columns} 
             refreshData={refreshData} 
             triggerRefresh={triggerRefresh} />
        </div>
    )
}

