import { useRouteError,Link } from "react-router-dom";

const Error = () => {

    return (
        <div className=" mt-44 flex flex-col text-xl items-center my-auto font-nun font-semibold dark:text-white ">
            <h1 className="text-5xl" >404</h1>
            <p className=" opacity-50 mt-5">Page not found</p>
            <Link to='/'>Volver al Home</Link>
        </div>
    );
};
export default Error;
