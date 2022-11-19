import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

const MyDislikes = () => {
    const [dislikedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits}
                refreshTuits={findTuitsILike} />
        </div>
    );
};
export default MyDislikes;