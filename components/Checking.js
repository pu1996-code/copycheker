import React, { Component } from "react";
import "../App.css";
import "../Bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";
import styled from 'styled-components';
class Checking extends Component {
  constructor() {
    super();
    this.state = {
      testsrc:'',
      que_id: "",
      marks: [],
      imgdata: [],
      totmarks: 0,
      response: [],
      draw: false,
      drawtext: "",
      jres: [],
      imgcount: 1,
      buttonid: "",
      points: [],
      correct: false,
      wrong: false,
      wronglist: [],
      correctlist: [],
      imgurl: "http://localhost/ETC/5834/",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("authentication") === "false") {
      return this.props.history.push("/");
    }
    this.drawimage();
    const paper_code = localStorage.getItem("paper_code");
    const data = { paper_code };
    axios
      .get("http://localhost/ETC/qestion.php", { params: data })
      .then((result) => {
        this.setState({
          response: result.data,
        });
      })
      .catch((ev) => {
        console.log("failed");
      });
  }
  sendimgurl = () => {
    const imgurls = this.state.imgdata;
    const data = JSON.stringify(imgurls);
    axios.post("http://localhost/ETC/saveimgurl.php", data, {
      headers: {
        "content-type": "multipart/json",
      },
    });
  };
  drawimage = ()=>{
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    img.onload = () => {
      ctx.drawImage(img,5, 5, 630, 490);
    };
    // img.src = this.state.imgurl + this.state.imgcount + ".jpg";
    // let data = canvas.toDataURL("image/png");
    // this.state.imgdata.push(data);
    // let svgElement = this.refs.svgId;
    // let svgString = new XMLSerializer().serializeToString(svgElement);
    // // let decoded = unescape(encodeURIComponent(svgString));
    // let base64 = btoa(svgString);
    // console.log(`data:image/svg+xml;base64,${base64}`);
    // img.src = `data:image/svg+xml;base64,${base64}`;
    // this.setState({
    //   testsrc:`data:image/svg+xml;base64,${base64}`
    // })
  }
  updateMarks(index, e) {
    this.state.marks[index] = parseInt(e.target.value);
  }
  nextimage = () => {
    // const canvas = this.refs.canvas;
    // let ctx = canvas.getContext("2d");
    // let data = canvas.toDataURL('image/png');
    // this.state.imgdata.push(data);
    const next = this.refs.next;
    
    if(this.state.imgcount <5){
     this.setState({ imgcount: this.state.imgcount + 1 });
    }
    if(this.state.imgcount == 5){
      next.disabled = true;
    }
    else{
      next.disabled = false;
    }
  };
  previmage = () => {
    if (this.state.imgcount > 1) {
      this.setState({ imgcount: this.state.imgcount - 1 });
      // this.drawimage();
    }
  };
  resetmarks = (ev) => {
    this.setState({
      totmarks: 0,
    });
  };
  draw = (ev) => {
    if (this.state.draw) {
      return null;
    }
    this.setState({ draw: false });
    // get reference to canvas and save canvas offsets
    const canvas = this.refs.canvas;
    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;

    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    function PrimitiveBrush(context) {
      if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("No 2D rendering context given!");
      }
      this.ctx = context;
      this.strokes = [];
      this.strokeIndex = 0;
      this.workingStrokes = [];
      this.lastLength = 0;
      this.isTouching = false;
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = "3";
      this.ctx.lineCap = this.ctx.lineJoin = "round";
    }
    PrimitiveBrush.prototype.start = function (event) {
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      this.workingStrokes = [
        {
          x: x,
          y: y,
        },
      ];
      this.strokes.push(this.workingStrokes);
      this.lastLength = 1;
      this.isTouching = true;
      requestAnimationFrame(this._draw.bind(this));
    };

    PrimitiveBrush.prototype.move = function (event) {
      if (!this.isTouching) {
        return;
      }
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      this.workingStrokes.push({
        x: x,
        y: y,
      });
      requestAnimationFrame(this._draw.bind(this));
    };
    PrimitiveBrush.prototype.end = function (event, foo) {
      this.move(event);
      this.isTouching = false;
    };

    PrimitiveBrush.prototype._draw = function () {
      // save the current length quickly (it's dynamic)
      var length = this.workingStrokes.length;

      // return if there's no work to do
      if (length <= this.lastLength) {
        return;
      }

      var startIndex = this.lastLength - 1;

      this.lastLength = length;

      var pt0 = this.workingStrokes[startIndex];

      this.ctx.beginPath();

      this.ctx.moveTo(pt0.x, pt0.y);

      for (var j = startIndex; j < this.lastLength; j++) {
        var pt = this.workingStrokes[j];

        this.ctx.lineTo(pt.x, pt.y);
      }

      this.ctx.stroke();
    };

    // Set up brush to listen to events
    var brush = new PrimitiveBrush(canvas.getContext("2d"));

    canvas.addEventListener("mousedown", brush.start.bind(brush));
    canvas.addEventListener("mousemove", brush.move.bind(brush));
    canvas.addEventListener("mouseup", brush.end.bind(brush));
  };
  getresult = () => {
    var total = 0;
    for (var i = 0; i < this.state.marks.length; i++) {
      total = total + this.state.marks[i];
    }
    console.log(total);
    this.setState({
      totmarks: total,
    });
    console.log(this.state.totmarks);
  };
  submitpaper = (ev) => {
    // console.log(localStorage.getItem("copy_no"));
    const copy_no = localStorage.getItem("copy_no");
    const paper_code = localStorage.getItem("paper_code");
    const max_marks = localStorage.getItem("max_marks");
    const bundle_no = localStorage.getItem("bundle_no");
    console.log(copy_no, paper_code, max_marks, bundle_no);
    const total_marks = this.state.totmarks;
    // this.state.marks;
    const data = { copy_no, paper_code, total_marks, max_marks, bundle_no };
    axios
      .get("https://localhost/ETC/result.php", { params: data })
      .then((res) => {
        this.setState({
          jres: res.data,
        });
      })
      .catch((error) => {
        console.log("failed");
      });
    alert("Submitted");
  };

  logout = () => {
    // localStorage.setItem("authetication",false);
    localStorage.clear();
    return this.props.history.push("/");
  };
  drawNumbutton0 = (e) => {
    let ref = this.refs.zero;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton1 = (e) => {
    let ref = this.refs.one;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton2 = (e) => {
    let ref = this.refs.two;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton3 = (e) => {
    let ref = this.refs.three;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton4 = (e) => {
    let ref = this.refs.four;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton5 = (e) => {
    let ref = this.refs.five;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton6 = (e) => {
    let ref = this.refs.six;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton7 = (e) => {
    let ref = this.refs.seven;
    this.setState({
      draw: true,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton8 = (e) => {
    let ref = this.refs.eight;
    this.setState({
      draw: true,
      correct: false,
      wrong: false,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton9 = (e) => {
    let ref = this.refs.nine;
    this.setState({
      draw: true,
      correct: false,
      wrong: false,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton10 = (e) => {
    let ref = this.refs.ten;
    this.setState({
      draw: true,
      correct: false,
      wrong: false,
      drawNum: ref.textContent,
    });
  };
  drawNumbutton1by2 = (e) => {
    let ref = this.refs.half;
    this.setState({
      draw: true,
      correct: false,
      wrong: false,
      drawNum: ref.textContent,
    });
  };
  correct = (e) => {
    this.setState({ correct: true, wrong: false });
  };
  wrong = (e) => {
    this.setState({ wrong: true, correct: false });
  };
  drawNum = (e) => {
    // if(!this.state.draw){
    //   return null;
    // }
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const corr = this.refs.correctimg;
    const wrro = this.refs.wrongimg;
    let mousex = e.clientX - canvas.offsetLeft;
    let mousey = e.clientY - canvas.offsetTop;
    ctx.font = "bold 30px Helvetica, Arial, sans-serif, solid ";
    ctx.fillStyle = "darkgreen";
    if (this.state.correct) {
      this.state.points.push({ x: mousex, y: mousey, shape: "correct" });
      return ctx.drawImage(corr, mousex, mousey, 30, 30);
    }
    if (this.state.wrong) {
      this.state.points.push({ x: mousex, y: mousey, shape: "wrong" });
      return ctx.drawImage(wrro, mousex, mousey, 30, 30);
    }
    if (this.state.draw) {
      this.state.points.push({
        x: mousex,
        y: mousey,
        text: this.state.drawNum,
        shape: "number",
      });
      return ctx.fillText(this.state.drawNum, mousex, mousey);
    }
    this.setState({ draw: false });
  };
  redraw = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    const corr = this.refs.correctimg;
    const wrro = this.refs.wrongimg;
    // ctx.clearRect(0,0,canvas.width,canvas.length);
    ctx.drawImage(img, 0, 0, 640, 500);
    ctx.font = "bold 30px Helvetica, Arial, sans-serif, solid ";
    ctx.fillStyle = "darkgreen";
    // this.state.points.pop();
    if (this.state.points.length > 0) {
      for (let i = 0; i < this.state.points.length; i++) {
        if (this.state.points[i].shape === "correct") {
          ctx.drawImage(
            corr,
            this.state.points[i].x,
            this.state.points[i].y,
            30,
            30
          );
        }
        if (this.state.points[i].shape === "number") {
          ctx.fillText(
            this.state.points[i].text,
            this.state.points[i].x,
            this.state.points[i].y
          );
        }
        if (this.state.points[i].shape === "wrong") {
          ctx.drawImage(
            wrro,
            this.state.points[i].x,
            this.state.points[i].y,
            30,
            30
          );
        }
      }
    }
  };
  clearDraw = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = this.refs.image;
    ctx.drawImage(img, 0, 0, 640, 500);
    this.setState({ points: "" });
  };
  undo = () => {
    if (this.state.points.length > 0) {
      this.state.points.pop();
    }
    this.redraw();
  };
  render() {
    return (
      <div>
        <div id="main">          
          <div className="container">
            <div className="row">
              <div className=" col-2">
                <div
                  className="btn mt-2 shadow"
                  id='buttonbox'
                  role="toolbar"
                  aria-label="Toolbar with groups"
                >
                  <div
                    class=" btn-group-vertical mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      type="button"
                      ref="zero"
                      onClick={this.drawNumbutton0}
                      class=" btn-success rounded-circle btn px-2 mb-1"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      ref="one"
                      onClick={this.drawNumbutton1}
                      class="btn-success rounded-circle btn mb-1"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      ref="three"
                      onClick={this.drawNumbutton3}
                      class="btn-success rounded-circle btn  mb-1"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      ref="five"
                      onClick={this.drawNumbutton5}
                      class=" btn-success rounded-circle btn mb-1"
                    >
                      5
                    </button>
                    <button
                      type="button"
                      ref="seven"
                      onClick={this.drawNumbutton7}
                      class=" btn-success rounded-circle btn mb-1 px-2 "
                    >
                      7
                    </button>
                    <button
                      type="button"
                      ref="nine"
                      onClick={this.drawNumbutton9}
                      class="btn-success rounded-circle btn"
                    >
                      9
                    </button>
                  </div>
                  <div
                    class=" btn-group btn-group-vertical ml-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      type="button"
                      ref="half"
                      onClick={this.drawNumbutton1by2}
                      class=" btn-success rounded-circle btn px-1 mb-1"
                    >
                      1/2
                    </button>
                    <button
                      type="button"
                      ref="two"
                      onClick={this.drawNumbutton2}
                      class="btn-success  rounded-circle btn px-1 mb-1"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      ref="four"
                      onClick={this.drawNumbutton4}
                      class=" btn-success rounded-circle btn mb-1"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      ref="six"
                      onClick={this.drawNumbutton6}
                      class=" btn-success rounded-circle btn mb-1"
                    >
                      6
                    </button>
                    <button
                      type="button"
                      ref="eight"
                      onClick={this.drawNumbutton8}
                      class="btn-success rounded-circle btn mb-1"
                    >
                      8
                    </button>
                    <button
                      type="button"
                      ref="ten"
                      onClick={this.drawNumbutton10}
                      class=" rounded-circle btn-success px-1 btn "
                    >
                      10
                    </button>
                  </div>
                  <div className="mt-2">
                    <div
                      class="btn-group btn-group-vertical mx-1 "
                      role="group"
                      aria-label="First group"
                    >
                      <button
                        type="button"
                        class=" border-info rounded-circle btn px-1 mb-1"
                        onClick={this.correct}
                      >
                        <FontAwesomeIcon icon={"check"} color="green" />
                      </button>
                      <img
                        src="image/green.png"
                        alt=""
                        className="hidden"
                        ref="correctimg"
                      />
                      <button
                        type="button"
                        class="btn-info  rounded-circle btn px-1 mb-1"
                      >
                        <FontAwesomeIcon icon={"font"} />
                      </button>
                      <button
                        type="button"
                        class=" btn-info rounded-circle btn mb-1"
                        onClick={this.draw}
                      >
                        <FontAwesomeIcon icon={"pen-square"} />
                      </button>
                      <button
                        type="button"
                        onClick={this.clearDraw}
                        class=" btn-info rounded-circle btn"
                      >
                        <FontAwesomeIcon icon={"trash"} />
                      </button>
                    </div>
                    <div
                      class="btn-group btn-group-vertical "
                      role="group"
                      aria-label="First group"
                    >
                      <button
                        type="button"
                        onClick={this.wrong}
                        class=" border-info rounded-circle btn  px-1 mb-1"
                      >
                        <FontAwesomeIcon icon={"times"} color="red" />
                      </button>
                      <img
                        src="image/wrong.png"
                        alt=""
                        className="hidden"
                        ref="wrongimg"
                      />
                      <button
                        type="button"
                        class="btn-info  rounded-circle btn px-1 mb-1"
                      >
                        <FontAwesomeIcon icon={"eye"} />
                      </button>
                      <button
                        type="button"
                        onClick={this.undo}
                        class=" btn-info rounded-circle btn mb-1"
                      >
                        <FontAwesomeIcon icon={"redo"} />
                      </button>
                      <button
                        type="button"
                        class=" btn-info rounded-circle btn mb-1"
                      >
                        <FontAwesomeIcon icon={faClipboard} />
                      </button>
                    </div>
                  </div>
                  <div className="mx-auto mt-2">
                    <button className="btn-primary btn w-100 mx-auto mt-1">
                      <FontAwesomeIcon icon={faClipboard} />
                    </button>
                  </div>

                  <div className="mx-auto mt-2">
                    <button className="btn-primary btn w-100 mx-auto mt-1">
                      <FontAwesomeIcon icon={"question"} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <CanvasTopSide>
                  <button
                    ref='previos'
                    type="button"
                    className=""
                    style={{outline:'none'}}
                    onClick={this.previmage}
                    >
                    {'<<'}
                  </button>
                    <span>PAGE NO:{this.state.imgcount}</span>
                    <span>COPY NO:4579</span>
                    <span>TIMER:02:03{}</span>
                    <button                  
                    ref='next'
                    type="button"
                    style={{outline:'none'}}
                    class=""
                    onClick={this.nextimage}
                  >
                   {'>>'}
                  </button>
                </CanvasTopSide>
                <canvas
                
                  // style={{ background: "transparent" }}
                  className="shadow-lg"
                  ref="canvas"
                  width={640}
                  height={500}
                  onClick={this.drawNum}
                />

                {/* <svg width="640" height="500" ref='svgId' xmlns="http://www.w3.org/2000/svg">                                    
                      <def>
                        <clipPath>
                      <rect x='0' y='0' width="640" height="500" className='fillrect' /> 
                      </clipPath>
                  </def>
                  <image
                    x='0'
                    y='0'
                    width="640"
                    height="500"
                    href={this.state.imgurl + this.state.imgcount + ".jpg"}
                    // clip-path="url(#circleView)"
                  />
                </svg> */}

                <img
                src={this.state.imgurl + this.state.imgcount + ".jpg"}
                  // src={this.state.imgurl+this.state.imgcount+'.jpg'}
                  // this.state.imgurl+this.state.imgcount+'.jpg'
                  // {this.state.imgurl[this.state.imgcount]}
                  className='canvasimg'
                  ref="image"
                  className="hidden"
                />
                <br />
                <div
                  class="btn-group offset-5"
                  role="group"
                  aria-label="Basic example"
                >
                  {/* <button
                    ref='previos'
                    type="button"
                    class="btn btn-primary mx-1"
                    onClick={this.previmage}
                  >
                    {'<<'}
                  </button> */}
                  
                </div>
              </div>
              <div className="col-3 mt-2" >
                <table class="table-bordered text-center table-responsive shadow" id='buttonbox'>
                  <thead className="" style={{background:'#090b13',color:'white'}}>
                    <tr>
                      <th scope="col" className="w-50">
                        QUESTION
                      </th>
                      <th scope="col" className="w-50 ">
                        OUT OF
                      </th>
                      <th scope="col" className="w-50 px-3">
                        MARKS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.response.map((res, index) => (
                      <tr key={index} style={{fontWeight:'600',fontSize:'18px',letterSpacing:'1.2px'}}>
                        <td>{res.que_id}</td>
                        <td>{res.outof}</td>
                        <td className="p-2 mx-1">
                          <input
                          style={{background:'#f9f9f9',border:'1px solid #090b13',borderRadius:'10px',outline:'none'}}
                            type="text"
                            onChange={(e) => this.updateMarks(index, e)}
                            name="marks"
                            className="w-100"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 shadow px-3 py-3" id='buttonbox'>
                  <TotalScore
                    className="btn"
                    style={{background:'#090b13',color:'white'}}
                    value="total"
                    name="score"
                    onClick={this.getresult}
                  >
                    Totalscore:
                    {this.state.totmarks}
                    /30.0
                  </TotalScore>                  
                  <FinishPaper
                    className="btn  mt-2 "
                    style={{background:'#090b13',color:'white'}}
                    onClick={this.submitpaper}
                  >
                    Finish paper
                  </FinishPaper>
                  <RejectPaper
                    className=" btn btn-danger  mt-2 "
                    onClick={this.resetmarks}
                  >
                    Reject Paper
                  </RejectPaper>
                </div>  
                <Question className="mt-2 shadow" id='buttonbox'>
                  <span>
                    Question 1: 
                  </span>
                  <p>What is Data Structure? </p>
                  <span>
                    Question 2: 
                  </span>
                  <p>Define Array? </p>
                 
                </Question>
                              
              </div>
            </div>            
          </div>          
        </div>
      </div>
    );
  }
}
export default Checking;
const CanvasTopSide = styled.div`
margin-top:14px;
display:flex;
flex:1;
align-item:center;
font-size:14px;
letter-spacing:1.2px;
font-weight:700;
span{
//  display:flex;
  flex:1;
  margin-left:10px;
}
button{
  width:50px;
  margin-right:14px;
  border:2px solid white;
  background-color:#090b13;
  border-radius:20px;
  color:#f9f9f9;
  font-size:20px;
  transition:.3s ease;
  text-align:center;
  &:hover{
    background-color:white ;
    color:black;
  }
}
`
const Question = styled.div`
font-size:13px;
letter-spacing:1.1px;
font-weight:500;
padding:5px;
`
const FinishPaper = styled.button`
letter-spacing:1.5px;
text-transform:uppercase;
display:block;
width:100%;
`
const RejectPaper = styled.button`
letter-spacing:1.5px;
text-transform:uppercase;
display:block;
width:100%;
`
const TotalScore = styled.button`
letter-spacing:1.5px;
display:block;
width:100%;
text-transform:uppercase;
`