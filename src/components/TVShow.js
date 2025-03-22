import React from "react";
import Adapter from "../Adapter";

function tvShow(props) {
  return (
    <div>
      <br />
      <img src={props.show.image.medium} onClick={() => props.selectShow(props.show)} alt="" />
    </div>
  );
}

export default tvShow;
