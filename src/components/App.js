import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");

  useEffect(() => {
    Adapter.getShows().then((data) => {
      setAllShows(data);
      setShows(data);
    });
  }, []);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (searchTerm === "") {
      setShows(allShows);
    } else {
      const filtered = allShows.filter((s) =>
        s.name.toLowerCase().includes(searchTerm)
      );
      setShows(filtered);
    }
  }, [searchTerm, allShows]);

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
    console.log(searchTerm)
  
  }
  


  async function handleFilter(e) {
    await e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
      
  }

  useEffect(() => {
    const filteredRate = allShows.filter((s) =>
        s.rating.average >= filterByRating
      );
      setShows(filteredRate);
  }, [filterByRating, allShows])

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
    });
  }

  let displayShows = shows;
  if (filterByRating) {
    displayShows = displayShows.filter((s) => (
      s.rating.average >= filterByRating));
  }

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={displayShows}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
