import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MoonL from './Icons/MoonL';
import MoonD from './Icons/MoonD';

const initialStateDarkMode = localStorage.getItem('theme') === 'dark'

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(initialStateDarkMode)

    useEffect(()=> {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme','dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme','light')
        }
    }, [darkMode])

    return (
        <div className="flex sticky top-0 z-10 flex-row justify-between shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] font-nun bg-white dark:text-white dark:bg-[#2b3945]">
            <NavLink to='/' className='my-8 mx-5 '>
                <p className=" font-extrabold hover:cursor-pointer lg:text-xl " onClick={() => window.location.reload()}> Where in the world?</p>
            </NavLink>
            <div id="darkmode" onClick={()=> setDarkMode(!darkMode) } className="mx-5 my-8 font-semibold hover:cursor-pointer flex items-center ">
                {darkMode ? <MoonD /> : <MoonL />}
                <p className='ml-2'>
                    Dark Mode
                </p>
            </div>
        </div>
    )
}