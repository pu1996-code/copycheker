import React, { Component } from "react";
import "../App.css";
import * as faceapi from "face-api.js";

export class Facematch extends Component {
  constructor() {
    super();
    // this.videoref = React.createRef();
    this.state = {
      //   videoref:this.refs.videoElement,
    };
  }
  componentDidMount() {
    const videoref = this.refs.videoElement;
    const MODEL_URL = "/models";
    Promise.all([
      faceapi.loadSsdMobilenetv1Model(MODEL_URL),
      faceapi.loadFaceLandmarkModel(MODEL_URL),
      faceapi.loadFaceRecognitionModel(MODEL_URL),
    ]);
  }
  startvideo = () => {
    const videoref = this.refs.videoElement;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          videoref.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log(err0r);
        });
    }    
    // const inter = setInterval(async () => {
    //     const singleResult = await faceapi.detectAllFaces(videoref, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptors();
    //     console.log(singleResult);
    //     if(singleResult){console.log(singleResult);
    //       clearInterval(inter);}     }, 500);
  };

  captureImage = () => {
    const video = this.refs.videoElement;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const  displaySize = {width:video.width,height:video.height};
    faceapi.matchDimensions(canvas, displaySize);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = this.refs.refimage2;
    const data = canvas.toDataURL("image/png"); 
    // photo.setAttribute("src", data);

    photo.src = data;
  };

Login = async ()=>{
  // const canvas = this.refs.canvas;   
  // const video = this.refs.videoElement;
  const photo = this.refs.refimage2;
  const photo2 = this.refs.refimage;
  // var data = canvas.toDataURL("image/png"); 
  // await photo.setAttribute("src", data);
  // const img = await faceapi.fetchImage(data);
  // const image = await faceapi.bufferToImage(photo2);
  const results =  await faceapi.detectSingleFace(photo, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor();
  console.log(results);
}

  matchFaces = async () => {
    const img = this.refs.refimage;
    // const img2 = this.refs.refimage2;
    //    const results =  await faceapi.detectSingleFace(video, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()
    //     console.log(results);
    //     const faceMatcher = new faceapi.FaceMatcher(results.descriptor);
    //     console.log(faceMatcher);

    // const singleResult = await faceapi.detectSingleFace(img2, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()

    //   if (singleResult) {
    //     const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
    //     console.log(bestMatch.toString());
    //     console.log('matched');
    //   } else {
    //     console.log("no match");
    //   }
    const videoref = this.refs.videoElement;
    const inter = setInterval(async () => {
      const singleResult = await faceapi
        .detectAllFaces(videoref, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors();
      console.log(singleResult);
      if (singleResult) {
        console.log(singleResult);
        clearInterval(inter);
      }
      // if(singleResult){
      //       console.log(singleResult);
      //           const faceMatcher = new faceapi.FaceMatcher(singleResult.descriptor);
      //           console.log('facematcher',faceMatcher);
      // }
      // else{
      //     return null;
      // }
      //   if (singleResult) {
      //     const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
      //     console.log(bestMatch.toString());
      //     return;
      //   } else {
      //     console.log("no match");
      //   }
    }, 100);
  };

  render() {
    return (
      <div>
        <video autoplay="true" id="videoElement" ref="videoElement"></video>
        <canvas ref="canvas" id="canvas"></canvas>
        <img
          src="image/puspendra.jpg"
          ref="refimage"
          alt="here comes image"
          className="hidden"
        />
        <img         
          ref="refimage2"
          alt="here comes image"
          className="hidden"
        />
        <button
          id="start"
          className="btn btn-danger"
          onClick={this.startvideo}
          style={{ cursor: "pointer" }}
        >
          start
        </button>
        <button
          id="capture"
          onClick={this.captureImage}
          className="btn btn-danger"
          style={{ cursor: "pointer" }}
        >
          Capture
        </button>
        <button
          id="capture"
          onClick={this.Login}
          className="btn btn-danger "
          style={{ cursor: "pointer" }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default Facematch;
