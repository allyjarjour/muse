import React, { useEffect, useState} from 'react'
import './OtherWorkByArtist.css'
import { getOtherArtByArtist, getDailyCollection } from "../apiCalls";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import ScrollContainer from "react-indiana-drag-scroll";


export const OtherWorkByArtist = () => {
  const { state, dispatch } = useStore()
  let artwork = state.currentArtwork;
  let artistLastName = artwork.artistDisplayName.split(" ");
  artistLastName = artistLastName[artistLastName.length - 1];
  const [artSelection, updateArtSelection] = useState([])
  
  const fetchData = async () => {
    let data = await getOtherArtByArtist(artistLastName);
    let index = data.objectIDs.indexOf(artwork.objectID);
    data.objectIDs.splice(index, 1)
    let collection = await getDailyCollection(data.objectIDs);
    await updateArtSelection(collection)
  }
  useEffect(() => {
    fetchData()
  }, [state])

  const findCurrentArtwork = (art) => {
    dispatch({ type: "updateCurrentArtwork", artDetails: art });
  };


  return (
    <section className="other-work-section">
      {artSelection && <h3>Other work by this artist:</h3>}
      <ScrollContainer className="art-by-artist-container dragscroll">
        {artSelection &&
          artSelection.map((art) => (
            <Link to={`/expanded-view/${art.title}`} key={art.objectID}>
              <img
                onClick={() => findCurrentArtwork(art)}
                src={art.primaryImage}
                alt={art.title}
              />
            </Link>
          ))}
      </ScrollContainer>
    </section>
  );
  
}