import React, { createContext, useContext, useReducer } from "react";
import { getDailyCollectionIds, getDailyCollection } from "./apiCalls";


const StoreContext = createContext();
const initialState = {
  dailyCurationTopics: ["sunflower"],
  dailyCurationTopic: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "findRandomTopic":
      return { ...state, 
        dailyCurationTopic: state.dailyCurationTopics[Math.floor(
          Math.random() * state.dailyCurationTopics.length
        )],
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