import { type } from "@testing-library/user-event/dist/type"

export default function Form({onAdd, url, myFormData, setMyFormData, showAddBar, myDepartements, myUtilisateurs, myImprimantes, inputs}){
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
            placeholder: "adresse ip",
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
            const response = await fetch(url, {
                method: 'POST',
                body: readyFormData,
            });

            const result = await response.text(); // Use response.json() if your PHP returns JSON
            console.log(result)
        } catch (error) {
            console.error('Error:', error);
        }
        onAdd(); // trigger refresh variable so the rows gets updated
    }
  // Map input keys to input elements
    const nodeList = inputs.map(key => {
        if (inputList.hasOwnProperty(key)) {
        const input = inputList[key];
        return (
            <div>
                <input
                    key={key} // Unique key for each input
                    type={input.type}
                    value={myFormData[key] || ''} // Controlled input
                    onChange={e => setMyFormData({ ...myFormData, [key]: e.target.value })}
                    placeholder={input.placeholder}
                    title={input.title}
                    pattern={input.pattern}
                    step={input.step}
                    className="border-l border-white w-full py-5 text-center h-full"
                />
            </div>
        );
        }
        else if (key === 'departement'){
            return (
            <div>
                <select onChange={e => setMyFormData({...myFormData, departement: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Departement</option>
                    {myDepartements}
                </select>
            </div>
            )
        }
        else if (key === 'utilisateur'){
            return (
            <div className='grow'>
                <select onChange={e => setMyFormData({...myFormData, user: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>utilisateur</option>
                    {myUtilisateurs}
                </select>
            </div>
            )
        }
        else if (key === 'imprimante_id'){
            return (
            <div className='grow'>
                <select onChange={e => setMyFormData({...myFormData, imprimante_id: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Imprimante</option>
                    {myImprimantes}
                </select>
            </div>
            )
        }
        else if (key === 'compatibilite'){
            return (
            <div className='grow'>
                <select onChange={e => setMyFormData({...myFormData, compatibilite: e.target.value})} className='border-l border-white w-full py-5 text-center h-full'>
                    <option>Imprimante</option>
                    {myImprimantes}
                </select>
            </div>
            )
        }
        return null;
    });
    
    return(
        <form onSubmit={handleFormSubmit} className={`flex form mt-10 fixed w-10/12 right-0 bottom-0 bg-blue-100 duration-300 mygrid-${nodeList.length + 1} ${showAddBar === false ? "translate-y-full" : ''}`}>
            
            {nodeList}

            <div>
                <button type="submit" className='border-l border-white w-full p-4 text-center h-full text-white font-bold text-sm bg-blue-800'>Ajouter</button>
            </div>
        </form>
    )
}