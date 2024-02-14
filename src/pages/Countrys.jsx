import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLoaderData } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { motion } from "framer-motion"

export default function Countrys() {

    const { Arrcountrys } = useLoaderData();
    const [text,setText] = useState('')
    const [filterText, setFilterText] = useState('Filter by Region');


    
    function Region() {
      const element = document.getElementById('options')
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    }

    document.addEventListener('mousedown', function (e) {
      const regionElement = document.getElementById('regionContainer')
      const element = document.getElementById('options')
      const dark = document.getElementById('darkmode')
      if (element && element.style.display === 'block' && !dark.contains(e.target)
      && !element.contains(e.target)  && !regionElement.contains(e.target)) {
        element.style.display = 'none'
      }
    })
    
    
    const regions = new Set()
    Arrcountrys.forEach((country) => {
      if (country.region) {
        regions.add(country.region);
      }
    });
    
    const item = {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    }
    const uniqueRegions = Array.from(regions);
    const [countrysR, setCountrysR] = useState(Arrcountrys);
    
    const [originalCountrys, setOriginalCountrys] = useState([]);


    function Filter(region) {
      const filteredCountrys = Arrcountrys.filter((country) => {
        return country.region === region;
      });
      setText('')
      setFilterText(region);
      setOriginalCountrys(filteredCountrys);
      setCountrysR(filteredCountrys);
    }
    
    function Search(e) {
      const { value } = e.target;
      const sanitizedValue = value.replace(/[^A-Za-z ]/g, ''); 
      setText(sanitizedValue);

      if (!sanitizedValue) {
        const countriesToSearch = filterText === 'Filter by Region' ? Arrcountrys : originalCountrys;
        setCountrysR(countriesToSearch);
      } else {
        const regex = new RegExp(sanitizedValue, 'i');
        const countriesToSearch = filterText === 'Filter by Region' ? Arrcountrys : originalCountrys;
        const findCountry = countriesToSearch.filter((country) => regex.test(country.name.common));
        setCountrysR(findCountry);
      }
    }

    return (
        <div className='mt-7 lg:mt-12'>

            <div className='lg:flex lg:justify-between lg:mx-20 lg:mt-16 '>
              <div className='bg-white lg:items-center dark:bg-[#2b3945] max-lg:max-w-[449px] lg:w-[550px] flex mx-5 lg:mx-0 py-3	shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] font-nun border border-transparent rounded-md'>
                  <FontAwesomeIcon icon={faMagnifyingGlass}  className='mx-8 max-lg:mt-2 hover:cursor-pointer text-[#b7b5b4] dark:text-white '  />
                  <input 
                  type="text" 
                  value={text}
                  autoComplete="off"
                  name='country' id='country'  
                  onChange={(e)=>Search(e)} 
                  className='py-1 dark:bg-[#2b3945]  dark:placeholder:text-white dark:text-white  mr-5 w-full outline-none placeholder:text-stone-400/80' placeholder='Search for a country...' />
              </div>
          
              <div className='relative '>
                  <div className='bg-white dark:text-white dark:bg-[#2b3945] w-64  ml-5 mt-12 lg:mt-0 py-4 shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] font-nun font-semibold border border-transparent rounded-md'>
                    <div className='hover:cursor-pointer mx-5 flex justify-between items-center ' id='regionContainer' onClick={Region} >
                        <p>{filterText}</p>
                        <FontAwesomeIcon className='ml-20  w-3'  icon={faChevronDown} />
                    </div>
                  </div>
                  <div id='options' className='bg-white dark:text-white dark:bg-[#2b3945] absolute hidden w-64  ml-5 mt-[6px] pl-5 py-4 space-y-[6px] shadow-[0_0_5px_3px_rgba(0,0,0,0.05)] font-nun font-semibold border border-transparent rounded-md'>
                    {
                      uniqueRegions.map((region,index)=>(
                        <p onClick={()=>Filter(region)} key={index} className='w-full hover:cursor-pointer'>{region}</p>
                      ))
                    }
                  </div>
              </div>
            </div>

            <div className='lg:flex   lg:flex-wrap lg:mr-20 lg:justify-between '>
              {countrysR.length !== 0 ? countrysR.slice(0,8).map((country,index) => (
                  <motion.div 
                  key={index}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  transition={{duration: 0.3}}
                  className='bg-white lg:flex-[1_0_50%] dark:text-white dark:bg-[#2b3945] mt-12 shadow-[0px_0px_2px_10px_rgba(0,0,0,0.01)]  rounded-md  max-w-max max-lg:mx-auto lg:ml-20'>
                    <NavLink to={`/${country.name.official}`}>
                        <img src={country.flags.png} className='rounded-t-md hover:cursor-pointer w-[320px] h-[224px] ' alt={country.alt} />
                    </NavLink>
                    <div className='font-nun flex flex-col space-y-1 ml-6 pb-11 lg:pb-5 mt-6 '>
                        <p className='font-extrabold mb-3 w-72 text-[22px] '>{country.name.common}</p>
                        <p className='font-semibold'>Population: <span>{country.population.toLocaleString('en-US')}</span></p>
                        <p className='font-semibold'>Region: <span >{country.region}</span></p>
                        <p className='font-semibold'>Capital: <span >{country.capital ? country.capital : '--'}</span></p>
                    </div>
                  </motion.div>
              )): <div className=' font-nun font-semibold dark:text-white mt-32 flex justify-center items-center w-full lg:mt-40'>
                      There is no country with that name  😢
                 </div>}
            </div>
        </div>
    )
}

export const loaderCountrys = async () => {
  const data = await fetch(`https://restcountries.com/v3.1/all`);

  if (!data.ok)
  throw {
      status: data.status,
      statusText: 'No encontrado',
  };

  const Arrcountrys = await data.json();
  return { Arrcountrys };
};

