import { createHashRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Countrys, { loaderCountrys } from '../pages/Countrys';
import Country, { loaderCountry } from '../pages/Country';
import Error from '../pages/Error';


export const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Countrys />,
          loader: loaderCountrys,
          errorElement: <Error />,
        },
        {
          path: '/:id',
          element: <Country />,
          loader:loaderCountry,
          errorElement: <Error />,
        }
      ]
    },
  ]);
