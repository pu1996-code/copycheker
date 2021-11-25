import React  from "react";
import "../Bootstrap.css";
import "./Bundleform.css";
class Bundleform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
    };
  }
  Changedate = (e) => {
    this.setState({
      date: e,
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Create Bundle</h1>
        <div class="mb-3">
          <label for="id" class="form-label"></label>
          <input
            type="text"
            class="form-control"
            id=""
            placeholder="enter copy ID"
          />
        </div>
        <br></br>
        <div class="row">
          <div class="col-12">
            <input className="form-control"  type="date" />
          </div>
        </div>
        <br></br>
        <div class="mb-3">
          <label for="id" class="form-label"></label>
          <input
            type="text"
            class="form-control"
            id=""
            placeholder="enter subject name"
          />
        </div>
        <br></br>
        <button type="button" class="btn btn-primary center btn-block">
          Create
        </button>
      </div>
    );
  }
}
export default Bundleform;
