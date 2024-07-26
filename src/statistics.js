import {Chart as ChartJs} from 'chart.js/auto'
import { useEffect, useState } from 'react';
import FetchUrl from './fetch';
import {Line, Doughnut, Bar} from 'react-chartjs-2'

export default function Statistics(){
  const [imprimantesFonctionneNumber, setImprimantesFonctionneNumber] = useState();
  const [imprimantesEnPanneNumber, setImprimantesEnPanneNumber] = useState();
  const [imprimantesOccupeeNumber, setimprImantesOccupeeNumber] = useState();
  const [imprimantesDisponiblesNumber, setImprimantesDisponiblesNumber] = useState();
  const [imprimantesByDepartement, setImprimantesByDepartements] = useState([]);
  const [refreshStatistics, setRefreshStatistics] = useState(false);

  const departements = Object.keys(imprimantesByDepartement);
  const myData = departements.map(dep => {
    return {
      departement: dep,
      imprimantesNumber: getImprimantesNumber(imprimantesByDepartement[dep])
      }
    }
    )
  console.log(myData)

  function getImprimantesNumber(imprimantes){
      let currentImpriantesNumber = 0;
      imprimantes.forEach(imp => {
        currentImpriantesNumber += imp.stock;
      })
      return currentImpriantesNumber;
  }

  


  useEffect(() => {
    const fetchData = async () => {
      const imprimantes = await FetchUrl('http://localhost/gestion-imprimantes-react/functions/getters/get_imprimantes.php');

      const toners = await FetchUrl('http://localhost/gestion-imprimantes-react/functions/getters/get_toners.php');
      setImprimantesFonctionneNumber(toners.length);
      setImprimantesEnPanneNumber(getImprimantesNumber(imprimantes) - toners.length);
      
      const utilisateurs = await FetchUrl('http://localhost/gestion-imprimantes-react/functions/getters/get_utilisateurs.php');
      setimprImantesOccupeeNumber(utilisateurs.length);
      setImprimantesDisponiblesNumber(getImprimantesNumber(imprimantes) - utilisateurs.length);
      
      const imprimantesByDep = await FetchUrl('http://localhost/gestion-imprimantes-react/functions/getters/get_imprimantes.php?groupe');
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
                  {label: "Nombre des Imprimantes", data: [imprimantesFonctionneNumber, imprimantesEnPanneNumber] }
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
                  {label: "Nombre des Imprimantes", data: [imprimantesDisponiblesNumber, imprimantesOccupeeNumber] }
                ]
              }
            }
          />
        </div>
      </div>
        
    </div>
  )
}

