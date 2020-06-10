import React, { useEffect, useState } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
 import Loader from "react-loader-spinner";
import './DailyCuration.css'
import {
  getDailyCollectionIds,
  getDailyCollection,
  fetchByArtistOrCulture,
  fetchByArtistOrCultureAndOnDisplay,
  fetchByMedium
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
  }, [state]); 
  
  const fetchData = async () => {
    if (page === "daily-curation") {
      let topic = state.dailyCurationTopic;
      let data = await getDailyCollectionIds(topic);
      if (data.objectIDs) data.objectIDs = await data.objectIDs.splice(0, 50);
      dataObjects = await getDailyCollection(data.objectIDs);
      await updateCollection(dataObjects);
      await setIsLoading(false)
    }
    if (page === "culture-or-artist") {      
      let artworkIds = await fetchByArtistOrCulture(state.cultureOrArtistQuery.search);
      if (artworkIds.total > 300) {
        artworkIds.objectIDs = artworkIds.objectIDs.splice(0, 300);
      }
      dataObjects = await getDailyCollection(artworkIds.objectIDs);
      await filterByDisplay()
      await updateCollection(dataObjects);
      await setIsLoading(false);      
    }
    if (page === "medium") {      
      fetchByMediumQuery()
    }
  };

  const fetchByMediumQuery = async () => {    
    let artworkIds = await fetchByMedium(state.mediumQuery.search);
      if (artworkIds.total > 300) {
        artworkIds.objectIDs = artworkIds.objectIDs.splice(0, 300);
      }
    dataObjects = await getDailyCollection(artworkIds.objectIDs);
      await filterByDisplay()
      await updateCollection(dataObjects);
      await setIsLoading(false);   
  }

  const filterByDisplay = async () => {
    if (state.filterByDisplay) {
     let artworkIds = await fetchByArtistOrCultureAndOnDisplay(state.cultureOrArtistQuery.search);
      if (artworkIds.total > 300) {
        artworkIds.objectIDs = artworkIds.objectIDs.splice(0, 300);
      }
      dataObjects = await getDailyCollection(artworkIds.objectIDs);
      await setIsLoading(false);
    }
  }
  
  return (
    <div className="images-container" data-testid="images-container">
      {isLoading && (
        <Loader
          type="Hearts"
          color="black"
          height={100}
          width={100}
        />
      )}
      {collection &&
        collection.map((artwork) => (
          <ArtWorkPreview artwork={artwork} key={artwork.objectID} />
        ))}
      {!collection && state.cultureOrArtistQuery && <p>No results found</p>}
      {!collection && state.mediumQuery && <p>No results found</p>}
    </div>
  );

  }

