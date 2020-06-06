
const fetchLink =
  "https://collectionapi.metmuseum.org/public/collection/";

export const getDailyCollectionIds = async (theme) => {
  try {
    let response = await fetch(`${fetchLink}v1/search?isOnView=true&q=${theme}`);
    let data = await response.json()
    await console.log(data);
    return data
  }
  catch (error) {
    console.log(error);
  }
}

export const getDailyCollection = async (ids) => {
  console.log(ids);
  try {
     let featuredCollection = await Promise.all(
       ids.map(async id => {
         let collectionsRes = await fetch(
           `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
         );
         return collectionsRes.json()
       })
     )
     console.log(featuredCollection);
    return featuredCollection
   }
  catch (error) {
     console.log(error);
  }
}