import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
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
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";

function App() {

  const routers =  createBrowserRouter([
       {path : '',
           element : <RootLayout/>,
           children:[
               {path : '',element : <SignIn/>},
               {path : '/signup',element : <SignUp/>},
               {path : '/home',element : <Dashboard/>},
               {path : '/field',element : <Field/>},
               {path : '/crop',element : <Crop/>},
               {path : '/staff',element : <Staff/>},
               {path : '/vehicle',element : <Vehicle/>},
               {path : '/equipment',element : <Equipment/>},
               {path : '/logs',element : <Logs/>}
           ]},
  ])

  return (
      <>
          <Provider store={store}>
              <RouterProvider router={routers} />
          </Provider>
      </>
  )
}

export default App
