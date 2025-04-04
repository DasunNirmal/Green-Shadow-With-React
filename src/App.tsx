import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {SignIn} from "./pages/SignIn.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {Field} from "./pages/Field.tsx";
import {Crop} from "./pages/Crop.tsx";
import {Staff} from "./pages/Staff.tsx";
import {Vehicle} from "./pages/Vehicle.tsx";
import {Equipment} from "./pages/Equipment.tsx";
import {Logs} from "./pages/Logs.tsx";
import {Provider, useSelector} from "react-redux";
import {store} from "./store/Store.ts";

function AppRouter() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const routers = createBrowserRouter([
        {
            path: '',
            element: <RootLayout/>,
            children: [
                {path: '', element: <SignIn/>},
                {path: '/signup', element: <SignUp/>},
                {path: '/home', element: isAuthenticated ? <Dashboard/> : <Navigate to='/'/>},
                {path: '/field', element: isAuthenticated ? <Field/> : <Navigate to='/'/>},
                {path: '/crop', element: isAuthenticated ? <Crop/> : <Navigate to='/'/>},
                {path: '/staff', element: isAuthenticated ? <Staff/> : <Navigate to='/'/>},
                {path: '/vehicle', element: isAuthenticated ? <Vehicle/> : <Navigate to='/'/>},
                {path: '/equipment', element: isAuthenticated ? <Equipment/> : <Navigate to='/'/>},
                {path: '/logs', element: isAuthenticated ? <Logs/> : <Navigate to='/'/>},
            ]
        }
    ]);

    return <RouterProvider router={routers}/>;
}

function App() {

  return (
      <>
          <Provider store={store}>
              <AppRouter/>
          </Provider>
      </>
  )
}

export default App
