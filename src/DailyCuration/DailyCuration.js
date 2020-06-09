import React, { useEffect, useState } from 'react'
import './DailyCuration.css'
import {
  getDailyCollectionIds,
  getDailyCollection,
  fetchByArtistOrCulture,
  fetchByArtistOrCultureAndOnDisplay,
} from "../apiCalls";
import { useStore } from "../store";
import { ArtWorkPreview } from "../ArtWorkPreview/ArtWorkPreview";


export const DailyCuration = ({ page }) => {
  const { state } = useStore();
  const [collection, updateCollection] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let dataObjects;
  
  useEffect(() => {
    fetchData();
    return () => {
      updateCollection([]);
      setIsLoading(true);
    };
  }, [state]); //maybe add state back in 
  
  const fetchData = async () => {
    if (page === "daily-curation") {
      let topic = state.dailyCurationTopic;
      console.log(topic);
      
      let data = await getDailyCollectionIds(topic);
      if (data.objectIDs) data.objectIDs = await data.objectIDs.splice(0, 50);
      dataObjects = await getDailyCollection(data.objectIDs);
      await updateCollection(dataObjects);
      await setIsLoading(false)
    }
    if (page === "culture-or-artist") {      
      let artworkIds = await fetchByArtistOrCulture(state.cultureOrArtistQuery.search);
      // there is no max for api request so adding temporary max
      if (artworkIds.total > 500) {
        artworkIds.objectIDs = artworkIds.objectIDs.splice(0, 500);
      }
      dataObjects = await getDailyCollection(artworkIds.objectIDs);
      await filterByDisplay()
      await updateCollection(dataObjects);
      await setIsLoading(false);      
    }
  };

  const filterByDisplay = async () => {
    if (state.filterByDisplay) {
     let artworkIds = await fetchByArtistOrCultureAndOnDisplay(state.cultureOrArtistQuery.search);
      if (artworkIds.total > 500) {
        artworkIds.objectIDs = artworkIds.objectIDs.splice(0, 500);
      }
      dataObjects = await getDailyCollection(artworkIds.objectIDs);
      await setIsLoading(false);
    }
  }
  
  return (
    <div className="images-container" data-testid="images-container">
      {isLoading && <p>...loading</p>}
      {collection &&
        collection.map((artwork) => (
          <ArtWorkPreview artwork={artwork} key={artwork.objectID} />
        ))}
      {(!collection && state.cultureOrArtistQuery) && <p>No results found</p>}
    </div>
  );

  }

