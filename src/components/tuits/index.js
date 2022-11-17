import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";

function Tuits({ tuits = [], deleteTuit, refreshTuits }) {
  const likeTuit = (tuit) =>
    likesService
      .userTogglesTuitLikes("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e))

  const dislikeTuit = (tuit) =>
    likesService
      .userDislikesTuit("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e))

  return (
    <div>
      <ul>
        {
          tuits.map(tuit =>
            <Tuit key={tuit._id}
              deleteTuit={deleteTuit}
              dislikeTuit={dislikeTuit}
              likeTuit={likeTuit}
              tuit={tuit} />)
        }
      </ul>
    </div>
  );
}

export default Tuits;