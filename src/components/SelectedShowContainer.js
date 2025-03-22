import React, { useEffect, useState } from "react";
import Episode from "./Episode";

function SelectedShowContainer(props) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  function mapSeasons() {
    if (!!props.allEpisodes && props.allEpisodes.length > 0) {
      const seasons = [...new Set(props.allEpisodes.map((e) => e.season))];
  
      return seasons.map((s) => (
        <option value={s} key={s}>
          Season {s}
        </option>
      ));
    }
    
  }




  function mapEpisodes() {
    return props.allEpisodes
      .filter((e) => e.season === Number(selectedSeason))
      .map((e) => <Episode eachEpisode={e} key={e.id} />);
  }

 

  function handleSelectionChange(e) {
    setSelectedSeason(e.target.value);
    console.log(setSelectedSeason)
  }

  const { selectedShow } = props;

  return (
    <div style={{ position: "static" }}>
      <h2>{selectedShow.name}</h2>
      <img src={selectedShow.image.medium} alt="" />
      <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
      <p>Premiered: {selectedShow.premiered}</p>
      <p>Status: {selectedShow.status}</p>
      <p>Average Rating: {selectedShow.rating.average}</p>
      <select style={{ display: "block" }} onChange={handleSelectionChange}>
        {mapSeasons()}
      </select>
      {mapEpisodes()}
    </div>
  );
}

export default SelectedShowContainer;

Array.prototype.unique = function () {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
