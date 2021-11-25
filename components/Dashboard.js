import axios from "axios";
import React from "react";
import "../Bootstrap.css";
import Copies from "./Copies";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { faThumbsDown } from "@fortawesome/fontawesome-free-solid";
import style from "styled-components";
import styled from "styled-components";
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      st: false,
      result: [],
      id: "",
    };
    if (localStorage.getItem("authentication") === "false") {
      return this.props.history.push("/");
    }
    const u_id = localStorage.getItem("teacher_id");
    // console.log(u_id);
    const data = { u_id };
    axios
      .get("https://localhost/ETC/copy_bundle.php", { params: data })
      .then((res) => {
        this.setState({
          result: res.data,
        });
        this.setState({ id: this.state.result[0].id });
        console.log(this.state.result[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  mainPage = () => {
    // this.setState({ st: true });
    this.props.history.push("/copies");
    localStorage.setItem("subject", this.state.result[0].subject);
    localStorage.setItem("bundle_no", this.state.result[0].id);
    console.log(this.state.result[0].id);
  };
  logout = () => {
    localStorage.clear();
    return this.props.history.push("/");
  };

  render() {
    return (
      <div>       
        <CopyBundle>
          <h1>COPY BUNDLE</h1>
          {this.state.result.map((res) => (
            <Bundlebody>
              <table>
             <tr>
               <td>Bundle No</td>
               <td> - {res.id}</td>
             </tr>
             <tr>
               <td>Subject</td>
               <td> - {res.subject}</td>
             </tr>
             <tr>
               <td>Total Copies</td>
               <td> - {res.copy_count}</td>
             </tr>
             <tr>
               <td>Unchecked Copies</td>
               <td> - {res.uncheck_count}</td>
             </tr>
             <tr>
               <td>Checked Copies</td>
               <td> - {res.check_count}</td>
               </tr>
               <tr>
               <td>Assign Date</td>
               <td> - {res.date}</td>
               </tr>             
             </table>             
              <button onClick={this.mainPage}>
                Open
              </button>
            </Bundlebody>
          ))}
          
        </CopyBundle>
      </div>
    );
  }
}

export default Dashboard;

const CopyBundle = style.div`
align-item:center;
h1
    {  
      text-align:center;
    }  
`
const Bundlebody = style.div`
background:rgb(238, 237, 237);
margin-top:100px;
min-width:300px;
width:420px;
margin:50px auto;
border-radius:25px;
padding:0 30px;
border:1.5px solid;
align-item:center;
box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

table{
  width:100%;
  align-item:center; 
  // padding:15px;
  margin:30px 0;
  letter-spacing:1.5px;
  font-weight:500;
  font-size:20px; 
 
}
  button{
    display:block;
    margin:auto;
    background:#090b13;
    width:100%;
    color:white;
    font-size:20px;
    letter-spacing:2px;
    font-weight:400;
    text-transform:uppercase;
    padding:5px;
    text-allign:center;
    margin:15px auto;
    border-radius:35px;
    border:3px solid #090b13;
    transition:0.4s ease;
    outline:none;
    &:hover{
      background:white;
      color:#090b13;
    }
  }
`
