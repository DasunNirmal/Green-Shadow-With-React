import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {SignIn} from "./pages/SignIn.tsx";

function App() {

  const routers =  createBrowserRouter([
       {path : '',
           element : <RootLayout/>,
           children:[
               {path : '',element : <SignIn/>},
               {path : '/home',element : <Dashboard/>}
           ]},
  ])

  return (
      <>
          <RouterProvider router={routers} />
      </>
  )
}

export default App
