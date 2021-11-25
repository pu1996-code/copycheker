import { Component } from "react";
import axios from "axios";
import styled from 'styled-components';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: [],
      st: false,
      error:true
    };
  }
  componentDidMount(){    
    localStorage.setItem('authentication',this.state.st); 
    
  }

  updateText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const userid = this.state.email;
    const password = this.state.password;
    const data = { userid, password };
    axios
      .get("http://localhost/ETC/login.php", { params: data },)
      .then((result) => {
        this.setState({
          message: result.data,
        });
        this.validate();
      })
      .catch((err) => {
        console.log("failed");
        this.props.history.push("/error");
      });
  };
  validate = (ev) => {
    const obj = this.state.message;
    if (
      this.state.email === obj[0].userid &&
      this.state.password === obj[0].password
    ) {
      this.setState({ st: true });
      localStorage.setItem('teacher_id',this.state.message[0].userid);
      localStorage.setItem('authentication',this.state.st);  
      localStorage.setItem('name',this.state.message[0].name);
      this.props.history.push("/dashboard");
    } else {      
      this.setState({error:false});
    }   
  };
  render() {     
    return (      
      <div>
        <div className="container p-5" >
          <div className=" mx-auto col-6 ">
            <LoginName className='text-primary' >
              Teacher Login
            </LoginName>
            <form className=" px-5 py-5 shadow-lg " onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label ">
                  User Name
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  className="form-control shadow-sm"
                  onChange={this.updateText}
                  required
                />               
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control  shadow-sm"
                  value={this.state.password}
                  onChange={this.updateText}
                   required
                />
                 {!this.state.error ? (<Error> * Incorrect password or username </Error>
                ):(<></>)}
              </div>
              <div className="text-center mt-5">
                <button
                  type="submit"
                  onclick={this.sendprops}
                  className="btn btn-primary btn-block shadow"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
const Error = styled.div`
color:red;
`

const LoginName = styled.h1`
text-align:center;
letter-spacing:1.3px;
text-transform:uppercase;
font-weight:500;
`