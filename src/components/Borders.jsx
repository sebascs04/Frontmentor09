import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';


export default function Borders({country}) {
	const [datos, setDatos] = useState([]);
	// const [selectborder,setSelectBorder] = useState('')
	// const navigate = useNavigate();
	const [borders,setBorders] = useState ([])
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=> {
		const getBorders = datos.filter((dato)=> {
			return country.borders?.includes(dato.cioc); 
		})
		setBorders(getBorders)
	},[country.borders, datos])
	
	// useEffect(() => {
	// 	if (selectborder !== '') {
	// 	  navigate(`/${selectborder}`);
	// 	}
	//   }, [selectborder, navigate]);

	// function PageBorder(e) {
	// 	const SelectBorder = datos.filter((dato)=> {
	// 		return dato.name.common === e
	// 	})
	// 	console.log(SelectBorder)
	// 	setSelectBorder(SelectBorder[0].name.official)
	// }

	useEffect(() => {
		const fetchData = async () => {
			try {
				const respuesta = await fetch('https://restcountries.com/v3.1/all');
				if (respuesta.ok) {
				const datosJson = await respuesta.json();
				setDatos(datosJson);
				} else {
				console.error('Error al obtener datos de la API');
				}
			} catch (error) {
				console.error('Error en la solicitud:', error);
			}finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);


	

    return (
        <div className='mt-12 lg:mt-20 lg:flex lg:items-center'>
            <p className='lg:mt-2 font-semibold lg:text-[16px] text-xl lg:mr-4'> Border Countries:</p>
            <div className='flex flex-wrap mt-3 lg:mt-0 justify-between font-thin  w-full lg:w-auto '>
                {
					isLoading ? <p>Cargando...</p> 
					: borders.length > 0 ? (
						 borders.map((border,index)=>(
						    <p key={index} 
							// onClick={()=>PageBorder(border.name.common)} 
							className='bg-white py-1 mt-2 lg:mr-2 px-[29px] dark:text-white/85 dark:bg-[#2b3945] border border-transparent rounded-sm shadow-[0_0_5px_3px_rgba(0,0,0,0.13)]'>
								{border.name.common}
							</p>
						)) 
					) : (
						<p className='bg-white py-1 mt-2  px-[29px] dark:text-white/85 dark:bg-[#2b3945] border border-transparent rounded-sm shadow-[0_0_5px_3px_rgba(0,0,0,0.13)]'>There is no border Countries</p>
					)
                }
            </div>
        </div>
    )
}

  
  
