import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLoaderData } from "react-router-dom";
import Borders from "../components/Borders";
import { motion } from "framer-motion"


export default function Country() {
    const { Arrcountry } = useLoaderData();
    const [country] = Arrcountry

    const item = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }
    
    return (
        <>
            <div className='ml-10 lg:ml-16 dark:text-white/80 dark:bg-[#2b3945] mt-11 flex w-min items-center font-nun px-3 bg-white  border border-transparent  rounded-sm shadow-[0_0_5px_3px_rgba(0,0,0,0.15)]'>
                <NavLink className='flex items-center w-28  py-2 pl-5' to='/'>
                    <FontAwesomeIcon className='mr-3 hover:cursor-pointer ' icon={faArrowLeft} />
                    <p className='hover:cursor-pointer '>Back</p>
                </NavLink>
            </div>

            <motion.div 
            key='country'
            variants={item}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.2}}
            className='mx-10 lg:mt-20 lg:mx-16 transition-all duration-200 font-nun max-w-[403px] lg:max-w-full dark:text-white lg:flex '>
                <div className="shadow-[0px_0px_2px_10px_rgba(0,0,0,0.01)] lg:min-w-[450px] lg:min-h-[400px] rounded">
                    <img className='mt-14 lg:mt-0 bg-cover  lg:w-[450px] lg:h-[400px]  w-[403px]' src={country.flags.png} alt={country.flags.alt} />
                </div>
                <div  className="lg:ml-32 lg:my-auto ">
                    <div className='mt-10 lg:mt-0  font-semibold'> 
                        <p className='font-extrabold text-[25px]'>{country.name.common}</p>
                        <div className="lg:flex lg:mt-5">
                            <div className='space-y-3 lg:mr-32'>
                                <p className='mt-5 lg:mt-0' >Native Name: <span >{country.name  ? country.name.nativeName[Object.keys( country.name.nativeName)[0]].common : '--'}</span></p>
                                <p className='mt-3'>Population: <span >{country.population.toLocaleString('en-US')}</span></p>
                                <p>Region: <span >{country.region}</span></p>
                                <p>Sub Region: <span >{country.subregion ? country.subregion : '--'}</span></p>
                                <p>Capital: <span >{country.capital ?  country.capital[0] : '--'}</span></p>
                            </div>
                            <div className='mt-12 lg:mt-0 space-y-3'>
                                <p>Top Level Duration: <span >{country.tld ? country.tld[0] : '--'}</span></p>
                                <p>Currencies: <span >{ country.currencies ? country.currencies[Object.keys(country.currencies)[0]].name : '--'}</span></p>
                                <p>Languages: <span> { country.languages ? Object.values(country.languages).join(', ')   : '--'} </span> </p>                                          
                            </div>
                        </div>
                    </div>
                    <Borders country={country} />
                </div>
            </motion.div>
        </>
    )
}

export const loaderCountry = async ({params}) => {
    const data = await fetch(`https://restcountries.com/v3.1/name/${params.id}`);

    if (!data.ok)
    throw {
        status: data.status,
        statusText: 'No encontrado',
    };

    const Arrcountry = await data.json();
    return { Arrcountry };
};

