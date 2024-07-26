import {Button} from './components';

function List({onButtonClick}) {
    return (
        <ul className="fixed left-0 top-0 w-0 md:w-1/12 lg:w-2/12 h-screen bg-myColor1 overflow-hidden">
            <Button onButtonClick={() => onButtonClick('statistique')}>
                <img className='w-4 inline mr-3' alt='' src='../icons/statistics.svg' />
                <p className=' hidden lg:inline'>Statistiques</p>
            </Button>
            <Button onButtonClick={() => onButtonClick('imprimante')}>
                <img className='w-4 inline mr-3' alt='' src='../icons/icon-1.svg' />
                <p className=' hidden lg:inline'>Imprimantes</p>
            </Button>
            <Button onButtonClick={() => onButtonClick('toner')}>
                <img className='w-4 inline mr-3' alt='' src='../icons/icon-1.svg' />
                <p className=' hidden lg:inline'>Toners</p>
            </Button>
            <Button onButtonClick={() => onButtonClick('departement')}>
                <img className='w-4 inline mr-3' alt='' src='../icons/list.svg' />
                <p className=' hidden lg:inline'>Departements</p>
            </Button>
            <Button onButtonClick={() => onButtonClick('utilisateur')}>
                <img className='w-4 inline mr-3' alt='' src='../icons/icon-2.svg' />
                <p className=' hidden lg:inline'>Utilisateurs</p>
            </Button>
        </ul>
    )
}




export default function Aside({onButtonClick}){
    return (
        <>
            <List onButtonClick={onButtonClick} />
        </>
)
}