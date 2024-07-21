import './App.css';
import React ,{useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
 const   pageSize = 18;
  const  apiKey = process.env.REACT_APP_NEWS_API
   const state = { progress: 0 }

      const [progress, setProgress] = useState([])

    return (
      <div>
        <React.StrictMode>
          <BrowserRouter>
            <Navbar />
            <LoadingBar //For loading bar
        color='#f11946'
        progress={progress}
      />
       <Routes>
         <Route path="/general" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="General" pageSize={pageSize } country="in" category="General" />  } />
         <Route path="/science" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="science" pageSize={pageSize} country="in" category="Science" /> } />
         <Route path="/sport" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="Sport" pageSize={pageSize} country="in" category="Sport" /> } />
         <Route path="/health" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="Health" pageSize={pageSize} country="in" category="Health" /> } />
         <Route path="/business" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="Business" pageSize={pageSize} country="in" category="Business" /> } />
         <Route path="/entertainment" element={ <News setProgress ={setProgress}  apiKey ={apiKey}  key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" /> } />
         <Route path="/tecnology" element={ <News setProgress ={setProgress}  apiKey ={apiKey} key="Tecnology" pageSize={pageSize} country="in" category="Tecnology" /> } />
      </Routes>
     </BrowserRouter>
   </React.StrictMode>
 </div>
    );
}

export default App;
