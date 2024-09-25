import './style/App.css';
import React, {createContext, useState} from 'react';
import Header from './components/header.js';
import TableImprimante from './tables/table_imprimante.js';
import TableToner from './tables/table_toner.js';
import TableDepartement from './tables/table_departement.js';
import TableUtilisateur from './tables/table_utilisateur.js';
import Statistics from './tables/statistics.js';
import Layout from './layout.js';
import Add from './ajouter/add.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
export const AppContext = createContext();

function App() {
  const [refreshData, setRefreshData] = useState(false);
  const triggerRefresh = () => {setRefreshData(!refreshData)}
  const [showAddBar, setshowAddBar] = useState(true);
  const triggerShowAddBar = () => {setshowAddBar(!showAddBar)}
  const [filterDep, setFilterDep] = useState('');

  return (
    <>
        <BrowserRouter>
          <AppContext.Provider value={{refreshData, triggerRefresh}}>
            <Routes>
              <Route path='/' element={<Layout />}>

                <Route path='statistiques' element={
                  <>
                    <Header titre="Statistique"/>
                    <Statistics />
                    <Add showAddBar={showAddBar} titre="Statistique" />
                  </>
                } />
                <Route index element={
                  <>
                    <Header titre="Imprimante" filterOn={setFilterDep} onClick={triggerShowAddBar}/>
                    <TableImprimante filter={filterDep} />
                    <Add showAddBar={showAddBar} titre="Imprimante" />
                  </>
                } />
                <Route path='toners' element={
                  <>
                    <Header titre="Toner" onClick={triggerShowAddBar}/>
                    <TableToner/>
                    <Add showAddBar={showAddBar} titre="Toner" />
                  </>
                } />
                <>
                <Route path='departements' element={
                  <>
                    <Header titre="Departement" onClick={triggerShowAddBar}/>
                    <TableDepartement/>
                    <Add showAddBar={showAddBar} titre="Departement" />
                  </>
                  } />
                </>
                <Route path='utilisateurs' element={
                  <>
                    <Header titre="Utilisateur" onClick={triggerShowAddBar}/>
                    <TableUtilisateur/>
                    <Add showAddBar={showAddBar} titre="Utilisateur" />
                  </>
                } />

              </Route>
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
    </>
  );
}

export default App;
