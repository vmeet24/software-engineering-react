import React from "react";

const TuitStats = ({ tuit, likeTuit, dislikeTuit }) => {

  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
          {
            tuit.stats.likes > 0 &&
            <i className="fa-solid fa-thumbs-up" />
          }
          {
            tuit.stats.likes <= 0 &&
            <i className="fa-light fa-thumbs-up" />
          }
          <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
        </span>
      </div>
      <div className="col">
        <span className="ttr-dislike-tuit-click" onClick={() => dislikeTuit(tuit)}
          data-testid="test-dislikeButton">
          {
            tuit.stats.dislikes > 0 &&
            <i className="fa-solid fa-thumbs-down" />
          }
          {
            tuit.stats.dislikes <= 0 &&
            <i className="fa-light fa-thumbs-down" />
          }
          <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
        </span>
      </div>

      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div>
  );
}
export default TuitStats