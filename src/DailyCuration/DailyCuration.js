import React, { useEffect, useState } from 'react'
import './DailyCuration.css'
import { getDailyCollectionIds, getDailyCollection } from '../apiCalls'
import { useStore } from "../store";
import { ArtWorkPreview } from "../ArtWorkPreview/ArtWorkPreview";


export const DailyCuration = () => {
  const { state } = useStore();
  const [collection, updateCollection] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let dataObjects;
  
  useEffect(() => {
    fetchData();
  }, [isLoading]);
  
  const fetchData = async () => {
    let topic = await state.dailyCurationTopic;
    let data = await getDailyCollectionIds(topic);
    dataObjects = await getDailyCollection(data.objectIDs);
    updateCollection(dataObjects);
    setIsLoading(false)
  };
  
  return (
    <div className="images-container" data-testid="images-container">
      {!collection ? (
        <p>Loading....</p>
      ) : (
        collection.map((artwork) => (
          <ArtWorkPreview artwork={artwork} key={artwork.objectID} />
        ))
      )}
    </div>
  );

  }

