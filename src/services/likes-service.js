import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

/**
 * Update that the user disliked the tuit
 * @param uid user id
 * @param tid tuit id
 * @returns dislike object
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);