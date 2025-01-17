import React, { useState, useEffect, useContext} from 'react'; 
import FetchUrl from '../fetch.js';
import {Head, ModificationButtons} from './table_components';
import fetchData from '../fetch.js';
import { AppContext } from '../App.js';
import fetchData2 from '../fetchForTesting.js';
import { Link } from 'react-router-dom';

function Rows({onClickAddUserBtn, filter}){
    const {refreshData, triggerRefresh} = useContext(AppContext);
    const [backUpRows, setBackUpRows] = useState([]);
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        if (filter){
            setRows(backUpRows.filter(row => row['departement_titre'] === filter));
        }
        else {
            setRows(backUpRows)
        }
    }, [backUpRows, filter])
    
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
            const response = await fetchData("imprimante", "update", "POST", readyFormData);
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
        triggerRefresh();
        setEditableRowId(-1);
    }

    
    // fetchData2("imprimante", 'get_imprimantes')
    useEffect(() => {
        FetchUrl("imprimante", 'get_imprimantes')
        .then(res => {
            setRows(res);
            setBackUpRows(res);
        })
        .catch(error => {
            console.log("error fetching get_imprimantes.php: " + error);
        })
        FetchUrl("departement", 'get_departements')
        .then(res => {
            setDepartements(res);
        })
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
            className={"grid mygrid-8 text-center"
            + ( (isEditable) ? " bg-amber-50 shadow-sm shadow-slate-300 dark:bg-amber-950 dark:shadow-amber-500" 
            : " hover:bg-myColor1 hover:shadow-sm hover:shadow-slate-300 dark:hover:bg-blue-900 dark:hover:shadow-slate-400 "
            + (editableExist && !isEditable ? " pointer-events-none" : ""))}>
                <div key={0} className={'flex items-center'}>
                    <img className='w-8 h-10 mr-2' alt='imprimante.png'  src='../imgs/imprimante-1.png' />
                    <input 
                        readOnly={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, modele: e.target.value});
                        }}
                        type='text' 
                        placeholder="Modele"
                        name='modele'
                        className={inputsClasses} 
                        value={isEditable ? myFormData.modele : row.modele}
                    />
                </div>
                <div key={1}>
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
                <div key={2}>
                    <input
                        readOnly={!isEditable}
                        onChange={(e) => {
                            setMyFormData({...myFormData, ip: e.target.value});
                        }} 
                        type='text' 
                        name='ip'
                        placeholder="Adresse Ip" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.ip : row.ip}
                    />
                </div>
                <div key={3}>
                    <select 
                        name='departement'
                        disabled={!isEditable}  
                        onChange={(e) => {
                            setMyFormData({...myFormData, departement: e.target.value});
                        }} 
                        className={inputsClasses + " cursor-pointer "}>
                            <option key={0} className='dark:bg-slate-800' value={row['departement_id']}>{row['departement_titre']}</option>
                            {departements.map((dep, i) => {
                                if (dep.id !== row['departement_id'])
                                    return <option key={i + 1} className='dark:bg-slate-800' value={dep.id}> {dep.titre} </option>
                                return null
                            })}
                    </select>
                </div>
                <div key={4}>
                    <input
                        readOnly={!isEditable}
                        onChange={(e) => {
                            setMyFormData({...myFormData, quantite: e.target.value});
                        }}
                        name='quantite'
                        type='number' 
                        placeholder="Quantite" 
                        className={inputsClasses} 
                        value={isEditable ? myFormData.quantite : row.stock}
                    />
                </div>
                <div key={5}>
                    <p className={inputsClasses}> 
                        {row.status === 0 ? "libre" : ''}
                        {row.status === row.stock ? "occupee" : ''}
                        {(row.status !== 0 && row.status !== row.stock) ? (row.stock - row.status) + ' / ' + row.stock + ' libre' : '' }
                    </p>
                </div>
                <div key={6}>
                    {row['status'] === 0 ? (
                        <Link to={"/utilisateurs"} className={inputsClasses + " border-none text-sm font-medium dark:text-white text-blue-900 underline"} /*value={row['utilisateur_id']}*/ >Ajouter Utilisateur</Link>

                    ) : (
                        <button onClick={e => {e.preventDefault()}} className={inputsClasses + " border-none"} /*value={row['utilisateur_id']}*/ >
                            {row['utilisateurs'] ? row['utilisateurs'][0]['nom'] : null}
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
        <div className='dark:text-white'>
        {myNodeList}
        </div>
    )
}



export default function TableImprimante({onClickAddUserBtn, filter}){
    const imprimante_columns = ["modele", "marque", "adresse_ip", "departement", "stock", "status", "utilisateur", "action"];

    return(
        <div className="absolute lg:w-10/12 md:w-11/12 sm:w-full right-0 mt-24 p-6">
            <Head key={0} columns={imprimante_columns}/>
            <Rows 
            filter={filter}
            onClickAddUserBtn={onClickAddUserBtn}
             key={1} 
             imprimante_columns={imprimante_columns}/>
        </div>
    )
}

