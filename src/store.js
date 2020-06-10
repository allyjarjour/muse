import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();
const initialState = {
  dailyCurationTopics: ["sea", "sunflower", "mountain", "sunset"],
  dailyCurationTopic: "",
  currentArtwork: {},
  favorites: [],
  cultureOrArtistQuery: "",
  mediumQuery: "",
  filterByDisplay: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "findRandomTopic":
      return {
        ...state,
        dailyCurationTopic: state.dailyCurationTopics[
            Math.floor(Math.random() * state.dailyCurationTopics.length)]};
    
    case "resetRandomTopic":
      return {
        ...state,
        dailyCurationTopic: ""
      };
    
    case "updateCurrentArtwork":
      return {
        ...state,
        currentArtwork: { ...action.artDetails }
      };
    
    case "addToFavorites":
      return {
        ...state,
        favorites: [...state.favorites, { ...action.artDetails }],
      };
    
    case "deleteFromFavorites":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fave) => fave.objectID !== action.artDetails.objectID
        ),
      };

    case "updateCultureOrArtistQuery":
      return {
        ...state,
        cultureOrArtistQuery: action.cultureOrArtistQuery,
      };
    
    case "updateMediumQuery":
      return {
        ...state,
        mediumQuery: action.mediumQuery,
      };

    case "updateFilterByDisplay":
      return {
        ...state,
        filterByDisplay: action.filterByDisplay,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);