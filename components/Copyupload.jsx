import axios from "axios";
import React, { Component } from "react";

export class Copyupload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagename: "",
      rollno: "",
      response:[]
    };
  }
  handlechange = (e) => {
    this.setState({
      rollno: e.target.value,
    });
  };

  handlechangeimage = (e) => {
    // e.preventDefault();
    this.setState({
      imagename: e.target.files[0]
    });
  };

  uploadFile = async (e) => {
      
    const formData = new FormData();
    formData.append('img',this.state.imagename);
    formData.append('roll',this.state.rollno);
   
    await axios.post("https://localhost/ETC/upload.php",formData,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).then((res)=>{
        this.setState({response:res.data});
    console.log(this.state.response);
  })
  .catch((err)=>{
        console.log(err);    });
    
  };

  render() {
    return (
      <div className='container col-md-6'>
        
        <form action="" className=''>
        <label className='form-label' htmlFor="rollno">Roll no.</label>
        <input
          type="text"
          name="rollno"
          id='rollno'
          onChange={this.handlechange}
          value={this.state.rollno}
          className="mt-4"
        /><br/><br/>
        <label className='form-label' htmlFor="subject">Subject</label>
        <input
          type="text"
          name="subject"
          id='subject'
          onChange={this.handlechange}
          value={this.state.subject}
          className="mt-4"
        /><br/><br/>
        <label className='form-label' htmlFor="course">course</label>
        <input
          type="text"
          name="course"
          id='course'
          onChange={this.handlechange}
          value={this.state.course}
          className="mt-4"
        />
        <br /> <br />
        <input type="file" name="image" onChange={this.handlechangeimage} /> <br/><br/>
        <button onClick={this.uploadFile} className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

export default Copyupload;
