import React from "react"
import "../Bootstrap.css";
import "../App.css";
import Checking from "./Checking";
import axios from 'axios';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link ,browserHistory} from "react-router-dom";
// import { LocalizationContext } from "@react-pdf-viewer/core";

class Copies extends React.Component {
  constructor() {
    super();
    this.state = {
      st: false,
      result:[],
      copy_key:0
    };
  }

  
  componentDidMount() {
    if(localStorage.getItem('authentication')==='false'){
      return this.props.history.push("/");
    }  
    const subject = localStorage.getItem('subject');
    const  bundle_id =  localStorage.getItem( 'bundle_no'); 
    const data = {bundle_id,subject};
    axios.get("https://localhost/ETC/copies.php",{params:data})
    .then(res => {
      this.setState({
        result: res.data
      });
    })
    .catch(err => {
      console.log("failed");
    }
    )
  }
  
  changeState=(key)=>  {
    this.setState({
      st: true
    });
    // console.log(this.state.result[key].copy_id);
    // localStorage.removeItem('copy_no');    
    localStorage.setItem('paper_code',this.state.result[this.state.copy_key].paper_code);
    localStorage.setItem('copy_no',this.state.result[key].copy_id);
    localStorage.setItem('max_marks',this.state.result[key].max_marks);
    this.props.history.push("/checking");
  };

  logout = ()=>{
    // localStorage.setItem("authetication",false);
    localStorage.clearItem('authentication');
    return this.props.history.push("/");
  }

  render() {       
    return (
      <CopiesList>      
        <h1> COPIES</h1>
        <div className="container">
          <CopyTable className="tble table-hover text-center shadow-lg">
            <thead>
              <tr>
                <th scope="col">Sno</th>
                <th scope="col">Copy Id</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {this.state.result.map((res,key) =>
              <tr key={key}>
                <td scope="row">{res.id}</td>
                <td>{res.copy_id}</td>
                <td>{res.check_status}</td>
                <td><button  onClick={()=>this.changeState(key)}>Open</button></td>
              </tr>
            )}              
            </tbody>
          </CopyTable>
        </div>
      </CopiesList>
    );
  }
}

export default Copies

const CopyTable = styled.table`
width:100%;
thead{
  background-color:#090b13;
  color:white;
  text-transform:uppercase;
  height:50px;
  font-size:18px;
  letter-spacing:1.2px;
}
tbody{
   font-size:16px;
   font-weight:700;
  text-transform:uppercase;
  letter-spacing:1.1px;
}

td{
  padding:10px;

  button{
    background:#090b13;
    width:70px;
    color:white;
    text-transform:uppercase;
    padding:6px;
    border-radius:35px;
    border:3px solid #090b13;
    transition:0.2s ease;

    &:hover{
      background:white;
      color:#090b13;
    }
  }
}
`
const CopiesList = styled.div`
align-item:center;
h1{
  letter-spacing:5px;
  text-align:center;
  font-weight:700;
  margin-top:10px;
}
`