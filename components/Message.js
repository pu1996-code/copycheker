import React, { Component } from "react"


class Message extends React.Component{

    constructor(){
        super()
        this.state={
            message:'Welcome visitor'
        }
    }

    changeMessage(){
        this.setState({
            message:'thanks For subscribing'
        })
    }


    render(){
        return(
            <div>
            <h1>{this.state.message}</h1>
            <input type="text" value={this.state.message} /><br/>
            <button onClick={() => this.changeMessage()}>Subscribe</button>
            </div>
        )
    }


}
export default Message