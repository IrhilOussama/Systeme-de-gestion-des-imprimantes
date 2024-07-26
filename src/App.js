import './App.css';
import React, {useState} from 'react';
import Aside from './aside.js';
import Header from './header.js';
import TableImprimante from './table_imprimante.js';
import TableToner from './table_toner.js';
import TableDepartement from './table_departement.js';
import TableUtilisateur from './table_utilisateur.js';
import Statistics from './statistics.js';
import Add from './add.js'


function App() {
  const [myTitle, setMyTitle] = useState('imprimante');
  const [refreshData, setRefreshData] = useState(false);
  const triggerRefresh = () => {setRefreshData(!refreshData)}
  const [showAddBar, setshowAddBar] = useState([true]);
  const triggerShowAddBar = () => {setshowAddBar(!showAddBar)}
  const [filterDep, setFilterDep] = useState('');
  function changeSection(section) {
    setMyTitle(section);
  }
  let table
  if (myTitle === "imprimante")
    table = <TableImprimante filter={filterDep} onClickAddUserBtn={() => {changeSection("utilisateur")}} refreshData={refreshData} triggerRefresh={triggerRefresh} />
  else if (myTitle === "toner")
    table = <TableToner onClickAddUserBtn={() => {changeSection("utilisateur")}} refreshData={refreshData} triggerRefresh={triggerRefresh} />
  else if (myTitle === "departement")
    table = <TableDepartement onClickAddUserBtn={() => {changeSection("utilisateur")}} refreshData={refreshData} triggerRefresh={triggerRefresh} />
  else if (myTitle === "utilisateur")
    table = <TableUtilisateur onClickAddUserBtn={() => {changeSection("utilisateur")}} refreshData={refreshData} triggerRefresh={triggerRefresh} />
  else if (myTitle === "statistique")
    table = <Statistics />

  return (
    <>
      <Aside onButtonClick={changeSection} />
      <Header titre={myTitle} filterOn={setFilterDep} onClick={triggerShowAddBar}/>
      {table}
      <Add onAdd={triggerRefresh} refreshData={refreshData} showAddBar={showAddBar} titre={myTitle}/>
    </>
  );
}

export default App;
