import React, { useEffect } from 'react'
import './ExpandedView.css'
import { useStore } from "../store";


export const ExpandedView = ({ artwork }) => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    // update fave logo here
    console.log(state.favorites);
  }, [state.favorites])
  const toggleFavorite = () => {
    if ((state.favorites.some(fave => fave.objectID === artwork.objectID))) {
      dispatch({ type: "deleteFromFavorites", artDetails: artwork });
    }
    if (!(state.favorites.some(fave => fave.objectID === artwork.objectID))) {
      dispatch({ type: "addToFavorites", artDetails: artwork });
    }    
  }

  return (
    <div className="ExpandedView">
      <img
        className="expanded-view-image"
        src={artwork.primaryImage}
        alt={artwork.title}
      />
      <div className="artwork-details">
        <div className="title-container-expanded">
          <h1>{artwork.title}</h1>
          <img
            onClick={toggleFavorite}
            alt="Icon for artwork not favorited"
            className="not-favorited"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00NzQuNjQ0LDc0LjI3QzQ0OS4zOTEsNDUuNjE2LDQxNC4zNTgsMjkuODM2LDM3NiwyOS44MzZjLTUzLjk0OCwwLTg4LjEwMywzMi4yMi0xMDcuMjU1LDU5LjI1ICAgIGMtNC45NjksNy4wMTQtOS4xOTYsMTQuMDQ3LTEyLjc0NSwyMC42NjVjLTMuNTQ5LTYuNjE4LTcuNzc1LTEzLjY1MS0xMi43NDUtMjAuNjY1Yy0xOS4xNTItMjcuMDMtNTMuMzA3LTU5LjI1LTEwNy4yNTUtNTkuMjUgICAgYy0zOC4zNTgsMC03My4zOTEsMTUuNzgxLTk4LjY0NSw0NC40MzVDMTMuMjY3LDEwMS42MDUsMCwxMzguMjEzLDAsMTc3LjM1MWMwLDQyLjYwMywxNi42MzMsODIuMjI4LDUyLjM0NSwxMjQuNyAgICBjMzEuOTE3LDM3Ljk2LDc3LjgzNCw3Ny4wODgsMTMxLjAwNSwxMjIuMzk3YzE5LjgxMywxNi44ODQsNDAuMzAyLDM0LjM0NCw2Mi4xMTUsNTMuNDI5bDAuNjU1LDAuNTc0ICAgIGMyLjgyOCwyLjQ3Niw2LjM1NCwzLjcxMyw5Ljg4LDMuNzEzczcuMDUyLTEuMjM4LDkuODgtMy43MTNsMC42NTUtMC41NzRjMjEuODEzLTE5LjA4NSw0Mi4zMDItMzYuNTQ0LDYyLjExOC01My40MzEgICAgYzUzLjE2OC00NS4zMDYsOTkuMDg1LTg0LjQzNCwxMzEuMDAyLTEyMi4zOTVDNDk1LjM2NywyNTkuNTc4LDUxMiwyMTkuOTU0LDUxMiwxNzcuMzUxICAgIEM1MTIsMTM4LjIxMyw0OTguNzMzLDEwMS42MDUsNDc0LjY0NCw3NC4yN3ogTTMwOS4xOTMsNDAxLjYxNGMtMTcuMDgsMTQuNTU0LTM0LjY1OCwyOS41MzMtNTMuMTkzLDQ1LjY0NiAgICBjLTE4LjUzNC0xNi4xMTEtMzYuMTEzLTMxLjA5MS01My4xOTYtNDUuNjQ4Qzk4Ljc0NSwzMTIuOTM5LDMwLDI1NC4zNTgsMzAsMTc3LjM1MWMwLTMxLjgzLDEwLjYwNS02MS4zOTQsMjkuODYyLTgzLjI0NSAgICBDNzkuMzQsNzIuMDA3LDEwNi4zNzksNTkuODM2LDEzNiw1OS44MzZjNDEuMTI5LDAsNjcuNzE2LDI1LjMzOCw4Mi43NzYsNDYuNTk0YzEzLjUwOSwxOS4wNjQsMjAuNTU4LDM4LjI4MiwyMi45NjIsNDUuNjU5ICAgIGMyLjAxMSw2LjE3NSw3Ljc2OCwxMC4zNTQsMTQuMjYyLDEwLjM1NGM2LjQ5NCwwLDEyLjI1MS00LjE3OSwxNC4yNjItMTAuMzU0YzIuNDA0LTcuMzc3LDkuNDUzLTI2LjU5NSwyMi45NjItNDUuNjYgICAgYzE1LjA2LTIxLjI1NSw0MS42NDctNDYuNTkzLDgyLjc3Ni00Ni41OTNjMjkuNjIxLDAsNTYuNjYsMTIuMTcxLDc2LjEzNywzNC4yN0M0NzEuMzk1LDExNS45NTcsNDgyLDE0NS41MjEsNDgyLDE3Ny4zNTEgICAgQzQ4MiwyNTQuMzU4LDQxMy4yNTUsMzEyLjkzOSwzMDkuMTkzLDQwMS42MTR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
          />
        </div>
        {artwork.artistDisplayName && (
          <p>
            <span>{artwork.artistDisplayName}</span> {artwork.artistDisplayBio}
          </p>
        )}
        <p>
          <span>Date:</span> {artwork.objectDate}
        </p>
        <p>
          <span>Medium:</span> {artwork.medium}
        </p>
        <p>
          <span>Dimensions:</span> {artwork.dimensions}
        </p>
        <p>
          <a href={artwork.objectURL}>Read more at the Met</a>
        </p>
      </div>
    </div>
  );
}