import React, { useEffect, useState} from 'react'
import './OtherWorkByArtist.css'
import { getOtherArtByArtist, getDailyCollection } from "../apiCalls";


export const OtherWorkByArtist = ({artwork}) => {
  console.log(artwork);
  
  let artistLastName = artwork.artistDisplayName.split(" ");
  artistLastName = artistLastName[artistLastName.length - 1];
  const [artSelection, updateArtSelection] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      console.log(artistLastName);
      let data = await getOtherArtByArtist(artistLastName);
      let index = data.objectIDs.indexOf(artwork.objectID);
      data.objectIDs.splice(index, 1)
      let collection = await getDailyCollection(data.objectIDs);
      await updateArtSelection(collection)
      console.log(artSelection);
    }
    fetchData()
  }, [])


  return (
    <>
      {artSelection && <h3>Other work by this artist:</h3>}
      <div className="art-by-artist-container">
        {artSelection &&
          artSelection.map((art) => (
            <img key={art.objectID} src={art.primaryImage} alt={art.title} />
          ))}
        </div>
    </>
  );
  
}