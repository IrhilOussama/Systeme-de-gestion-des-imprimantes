import { Link } from "react-router-dom"

function Button({children, classes, to}){
    return (
        <Link to={to} className={"block first:mt-10 py-4 text-left pl-6 border-b w-full border-slate-200 cursor-pointer duration-200 hover:translate-x-5 " + classes}>
            {children}
        </Link>
    )
}

function List({onButtonClick}) {
    return (
        <ul className="fixed left-0 top-0 w-0 md:w-1/12 lg:w-2/12 h-screen bg-myColor1 overflow-hidden dark:bg-slate-900 dark:text-white">
            <Button to={"/statistiques"}>
                <img className='w-6 inline mr-3 dark:bg-white rounded-md p-1' alt='' src='../icons/statistics.svg' />
                <p className=' hidden lg:inline'>Statistiques</p>
            </Button>
            <Button to={"/"}>
                <img className='w-6 inline mr-3 dark:bg-white rounded-md p-1' alt='' src='../icons/icon-1.svg' />
                <p className=' hidden lg:inline'>Imprimantes</p>
            </Button>
            <Button to={"/toners"}>
                <img className='w-6 inline mr-3 dark:bg-white rounded-md p-1' alt='' src='../icons/icon-1.svg' />
                <p className=' hidden lg:inline'>Toners</p>
            </Button>
            <Button to={'/departements'}>
                <img className='w-6 inline mr-3 dark:bg-white rounded-md p-1' alt='' src='../icons/list.svg' />
                <p className=' hidden lg:inline'>Departements</p>
            </Button>
            <Button to={'/utilisateurs'}>
                <img className='w-6 inline mr-3 dark:bg-white rounded-md p-1' alt='' src='../icons/icon-2.svg' />
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