import React from "react";

function Episode(props) {

  return (
    <div>
      Episode {props.eachEpisode.number} - {props.eachEpisode.name}
    </div>
  );
}

export default Episode;
