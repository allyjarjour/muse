import React, { useEffect } from "react";
import { useStore } from "../store";
import "./DailyCurationTitle.css";


export const DailyCurationTitle = () => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    dispatch({ type: "findRandomTopic" });
  }, [])
  
  return (
    <div className="daily-curation-title">
      <p>
        Explore a collection of art chosen around a daily theme. Today find
        inspiration through
      </p>
      <h1>{state.dailyCurationTopic}s</h1>
    </div>
  );
}