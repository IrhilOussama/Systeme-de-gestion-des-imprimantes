import {Chart as ChartJs} from 'chart.js/auto'
import { useEffect, useReducer, useState } from 'react';
import FetchUrl from '../fetch';
import {Doughnut, Bar} from 'react-chartjs-2'

export default function Statistics(){
  function myReducer(myState, myAction){
    switch(myAction.type){
      case "imp_fonc":
        return {...myState, imprimantesFonctionneNumber: myAction.payload}
      case "imp_Nfonc":
        return {...myState, imprimantesEnPanneNumber: myAction.payload}
      case "imp_disp":
        return {...myState, imprimantesDisponiblesNumber: myAction.payload}
      case "imp_Ndisp":
        return {...myState, imprimantesOccupeeNumber: myAction.payload}
      default:
        break;
    }
  }
  const [imprimantesInfo, Imprimante] = useReducer(myReducer, {
    imprimantesFonctionneNumber: 0,
    imprimantesEnPanneNumber: 0,
    imprimantesOccupeeNumber: 0,
    imprimantesDisponiblesNumber: 0
  });
  
  const [imprimantesByDepartement, setImprimantesByDepartements] = useState([]);

  const departements = Object.keys(imprimantesByDepartement);
  const myData = departements.map(dep => {
    return {
      departement: dep,
      imprimantesNumber: getImprimantesNumber(imprimantesByDepartement[dep])
      }
    }
    )
  function getImprimantesNumber(imprimantes){
      let currentImpriantesNumber = 0;
      imprimantes.forEach(imp => {
        currentImpriantesNumber += imp.stock;
      })
      return currentImpriantesNumber;
  }

  useEffect(() => {
    const fetchData = async () => {
      const imprimantes = await FetchUrl("imprimante", "get_imprimantes");

      const toners = await FetchUrl("toner", "get_toners");
      
      Imprimante({type: "imp_fonc", payload: toners.length});
      Imprimante({type: "imp_Nfonc", payload: getImprimantesNumber(imprimantes) - toners.length});
      
      const utilisateurs = await FetchUrl("utilisateur", "get_utilisateurs");
      Imprimante({type: "imp_Ndisp", payload: utilisateurs.length});
      Imprimante({type: "imp_disp", payload: getImprimantesNumber(imprimantes) - utilisateurs.length});
      
      const imprimantesByDep = await FetchUrl('imprimante', "get_imprimantes_groupe");
      setImprimantesByDepartements(imprimantesByDep);
    }
    fetchData();
  }, [])
  
  return (
    <div className="statistiques absolute right-0 top-24 w-full h-200pxmd:w-11/12 lg:w-10/12 py-20">
      <div className='w-8/12 mx-auto'>
        <Bar
          className=""
          data={
            {
              labels: myData.map(row => row.departement),
              datasets: [
                {label: "Nombre des Imprimantes", data: myData.map(row => row.imprimantesNumber)}
              ]
            }
          }
        />
      </div>

      <div className='flex justify-evenly mt-32'>
        <div className='w-3/12'>
          <Doughnut
            className=""
            data={
              {
                labels: ["Imprimante qui fonctionne", "Imprimantes en panne"],
                datasets: [
                  {label: "Nombre des Imprimantes", data: [imprimantesInfo.imprimantesFonctionneNumber, imprimantesInfo.imprimantesEnPanneNumber] }
                ]
              }
            }
          />
        </div>
        <div className='w-3/12'>
          <Doughnut
            className=""
            data={
              {
                labels: ["Imprimante disponibles", "Imprimantes occupee"],
                datasets: [
                  {label: "Nombre des Imprimantes", data: [imprimantesInfo.imprimantesDisponiblesNumber, imprimantesInfo.imprimantesOccupeeNumber] }
                ]
              }
            }
          />
        </div>
      </div>
        
    </div>
  )
}

