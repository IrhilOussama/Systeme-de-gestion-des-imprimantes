import fetchData from "../fetch";

export default function Form({onAdd, controller, action, myFormData, setMyFormData, showAddBar, myDepartements, myUtilisateurs, myImprimantes, niveauList, inputs}){
    const inputList = {
        modele: {
            type: "text",
            placeholder: "modele"
        },
        marque: {
            type: "text",
            placeholder: "marque"
        },
        ip: {
            type: "text",
            placeholder: "adresse Ip",
            pattern: "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
            title: "Enter a valid IP address (e.g., 192.168.1.1)" 
        },
        quantite: {
            type: "number",
            placeholder: "quantite",
            step: 1
        },
        titre: {
            type: "text",
            placeholder: "Titre"
        },
        nom: {
            type: "text",
            placeholder: "Nom et Prenom"
        },
        couleur: {
            type: "text",
            placeholder: "Couleur"
        }
    }

    async function handleFormSubmit(e){
        e.preventDefault();
        const readyFormData = new FormData();
        for (let key in myFormData){
            if (myFormData.hasOwnProperty(key)){
                readyFormData.append(key, myFormData[key]);
            }
        }
        try {
            const response = await fetchData(controller, action, "POST", readyFormData);
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
        onAdd(); // trigger refresh variable so the rows gets updated
    }
    // Map input keys to input elements
    const nodeList = inputs.map((key, index) => {
        if (inputList.hasOwnProperty(key)) {
            const input = inputList[key];
            return (
                <div key={index}>
                    <input
                        key={key} // Unique key for each input
                        type={input.type}
                        value={myFormData[key] || ''} // Controlled input
                        onChange={e => setMyFormData({ ...myFormData, [key]: e.target.value })}
                        placeholder={input.placeholder}
                        name={input.placeholder.toLowerCase()}
                        title={input.title}
                        pattern={input.pattern}
                        step={input.step}
                        className="border-l border-white w-full py-5 text-center h-full dark:placeholder:text-white"
                    />
                </div>
            );
        }
        else if (key === 'departement'){
            return (
            <div key={index}>
                <select name='departement' onChange={e => setMyFormData({...myFormData, departement: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option key={0}>Departement</option>
                    {myDepartements}
                </select>
            </div>
            )
        }
        else if (key === 'departement_id'){
            return (
            <div  key={index}>
                <select name='departement' onChange={e => setMyFormData({...myFormData, departement_id: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Departement</option>
                    {myDepartements}
                </select>
            </div>
            )
        }
        else if (key === 'utilisateur'){
            return (
            <div  key={index} className='grow'>
                <select name='utilisateur' onChange={e => setMyFormData({...myFormData, user: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>utilisateur</option>
                    {myUtilisateurs}
                </select>
            </div>
            )
        }
        else if (key === 'imprimante_id'){
            return (
            <div key={index} className='grow'>
                <select name='imprimante' onChange={e => setMyFormData({...myFormData, imprimante_id: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Imprimante</option>
                    {myImprimantes}
                </select>
            </div>
            )
        }
        else if (key === 'compatibilite'){
            return (
            <div key={index} className='grow'>
                <select name='compatibilite' onChange={e => setMyFormData({...myFormData, compatibilite: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Imprimante</option>
                    {myImprimantes}
                </select>
            </div>
            )
        }
        else if (key === 'niveau'){
            return (
            <div key={index} className='grow'>
                <select name='niveau' onChange={e => setMyFormData({...myFormData, niveau: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Niveau</option>
                    {niveauList}
                </select>
            </div>
            )
        }
        return null;
    });
    
    return(
        <form onSubmit={handleFormSubmit} className={`flex form mt-10 fixed w-10/12 right-0 bottom-0 bg-blue-100 dark:bg-blue-900 dark:text-white  duration-300 mygrid-${nodeList.length + 1} ${showAddBar === false ? "translate-y-full" : ''}`}>
            
            {nodeList}

            <div>
                <button type="submit" className='border-l border-white w-full p-4 text-center h-full text-white font-bold text-sm bg-blue-800'>Ajouter</button>
            </div>
        </form>
    )
}