import React, { useEffect } from 'react'
import './DailyCuration.css'
import { getDailyCollectionIds, getDailyCollection } from '../apiCalls'
import { useStore } from "../store";



export const DailyCuration = () => {
  const { state, dispatch } = useStore();
  let ids;
  let collection;
  
  const fetchIds = async () => {
    let topic = await state.dailyCurationTopic;
    let data = await getDailyCollectionIds(topic);
    ids = await data.objectIDs;    
    console.log(ids);
    await fetchCollection();
  }
  
  const fetchCollection = async () => {
    let data = await getDailyCollection(ids);
    let collection = await data;
    console.log(collection);
    
  }
  
  fetchIds()
  
  // getDailyCollection(state.dailyCurationTopicIds)
  return (
    <p>hi</p>
  )
}