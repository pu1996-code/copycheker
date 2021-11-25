// import logo from './logo.svg';
import './App.css';
import  './Bootstrap.css';
import Sidebar from './components/Sidebar';
// import "@react-pdf-viewer/core/lib/styles/index.css";
import Login from "./components/Login";
// import Graph from "./components/Graph";
import Dashboard from "./components/Dashboard";
import Copies from "./components/Copies";
import Checking from "./components/Checking";
import Error from './components/Error';
import Ramsidebar from './Ramside';
import Header from './components/Header';
import Facematch from './components/Facematch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Copyupload from "./components/Copyupload";
import  './index.css';
function App() {
    return (
    <div className='background'>        
    <Header/>
    <Router>
      <Switch>
       <Route exact path="/" component={Login} />
        <Route  path="/dashboard" component={Dashboard} />
        <Route  path="/copies" component={Copies} /> 
        <Route  path="/checking" component={Checking}/> 
        <Route  path='/error' component={Error}/>        
        <Route  path="/facematch" component={Facematch} />   
        <Route  path="/upload" component={Copyupload} />  
        {/* <Route path='/sidebar'component={Sidebar}/> */}
        <Route path='/ramside'component={Ramsidebar}/>
      </Switch>
    </Router>
{/* <Ramsidebar/> */}    
    </div>
  );
}


export default App;
