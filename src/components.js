export function Button({children, onButtonClick, classes}){
    return (
        <button onClick={onButtonClick} className={"first:mt-10 py-4 text-left pl-6 border-b w-full border-slate-200 cursor-pointer duration-200 hover:translate-x-5 " + classes}>{children}</button>
    )
}