import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";

function App() {

   const routers =  createBrowserRouter([
        {path : '',
            element : <RootLayout/>,
            children:[
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
