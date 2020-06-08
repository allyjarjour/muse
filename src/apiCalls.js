
const fetchLink =
  "https://collectionapi.metmuseum.org/public/collection/";

export const getDailyCollectionIds = async (theme) => {
  try {
    let response = await fetch(`${fetchLink}v1/search?isOnView=true&q=${theme}`);
    let data = await response.json()
    return data
  }
  catch (error) {
    console.log(error);
  }
}

export const getDailyCollection = async (ids) => {
  try {
     let featuredCollection = await Promise.all(
       ids.map(async id => {
         let collectionsRes = await fetch(`${fetchLink}v1/objects/${id}`);
         return collectionsRes.json()
       })
     )
    return featuredCollection
   }
  catch (error) {
     console.log(error);
  }
}

export const getOtherArtByArtist = async (artist) => {
  try {
    let response = await fetch(`${fetchLink}v1/search?artistOrCulture=true&q=${artist}`);
    let data = await response.json();
    return data;
  }
  catch (error) {
      console.log(error);
    }
}