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
    const fetchData = async () => {
      let topic = await state.dailyCurationTopic;
      let data = await getDailyCollectionIds(topic);
      console.log(data.objectIDs);
      dataObjects = await getDailyCollection(data.objectIDs);
      updateCollection(dataObjects);
      console.log(dataObjects);
      setIsLoading(false)
    };
    fetchData();
  }, [isLoading]);
  
  
  return (
    <div className="images-container">
      {!collection ? <p>Loading....</p> : 
        collection.map((artwork) => (
          <ArtWorkPreview artwork={artwork} key={artwork.objectID}/>
        ))}
    </div>
  );

  }

