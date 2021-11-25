// import React, { Component } from "react";
// import "./components/Sidebar.css";
// import './Bootstrap.css';
// import './App.css';
// import "../node_modules/font-awesome/css/font-awesome.min.css";
// import image from "./img/computer.png";
// // import Login from './components/Login'
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// // import Sidebar from './components/Sidebar';
// // import "@react-pdf-viewer/core/lib/styles/index.css";
// import Login from "./components/Login";
// import Graph from "./components/Graph";
// import Dashboard from "./components/Dashboard";
// import Copies from "./components/Copies";
// import Checking from "./components/Checking";
// import Ramsidebar from "./Ramside";

// class Ramside extends React.Component {
//   toggleMenu() {
//     let toggle = document.querySelector(".toggle");
//     let navigation = document.querySelector(".navigation");
//     let main = document.querySelector(".main");
//     toggle.classList.toggle("active");
//     navigation.classList.toggle("active");
//     main.classList.toggle("active");
//   }
//   logout = ()=>{
//     // localStorage.setItem("authetication",false);
//     localStorage.clear();
//     return this.props.history.push("/");
//   }
//   render() {
//     return (
//       <div className="container1">
//         <div className="navigation">
//           <ul>
//             <li>
//               <a href="/dashboard">
//                 <span className="icon">
//                   {/* <i class="fa fa-paypal" aria-hidden="true"></i> */}
//                 </span>
//                 <span className="title">
//                   <h2>LOGO</h2>
//                 </span>
//               </a><hr/>
//             </li>
//             <li>
//               <a href="/ramside">
//                 <span className="icon">
//                   {/* <i class="fa fa-home" aria-hidden="true"></i> */}
//                 </span>
//                 <span className="title">Copy Bundle</span>
//               </a>
//             </li><hr/>
//             <li>
//               <a href="/copies">
//                 <span className="icon">
//                   {/* <i class="fa fa-users" aria-hidden="true"></i> */}
//                 </span>
//                 <span className="title">Copies</span>
//               </a>
//             </li><hr/>
//             <li>
//               <a href="/checking">
//                 <span className="icon">
//                   {/* <i class="fa fa-graduation-cap" aria-hidden="true"></i> */}
//                 </span>
//                 <span className="title">Checking</span>
//               </a>
//             </li><hr/>

//             <li>
//               <a href="#" onClick={this.logout}>
//                 <span className="icon">
//                   {/* <i class="fa fa-sign-out" aria-hidden="true"></i> */}
//                 </span>
//                 <span  className="title">Logout</span>
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="main">
//           {/* <div className="topbar">
//             <div className="toggle" onClick={this.toggleMenu}></div>
//             <div id="logo" className="m-4">
//                   Easy To Check
//                 </div>
//             <div className="user">              
//               <img src={image} />
//             </div>
//           </div> */}
//            <div id="header">
//             <div className="contaier">
//               <div className="row">
//               <div className="toggle m-2 col-4" onClick={this.toggleMenu}></div>
//                 <div className="col-6 mt-4">
//                   <ul id="menu" className="float-md-end offset-8">                    
//                     <li>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Router>
//             <Switch>
//               {/* <Route exact path="/" component={Login} /> */}
//               <Route exact path="/ramside" component={Dashboard} />
//               <Route path="/copies" component={Copies} />
//               <Route path="/checking" component={Checking} />
//               {/* <Route path="/Graph" component={Graph} /> */}
//               {/* <Route path="/sidebar" component={Sidebar} /> */}
//               {/* <Route path="/ramside" component={Ramsidebar} /> */}
//             </Switch>
//           </Router>
//         </div>
//       </div>
//     );
//   }
// }

// export default Ramside;
