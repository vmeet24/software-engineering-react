import axios from "axios";
import { findAllTuitsDislikedByUser, userDislikesTuit } from "../services/likes-service";
import { createTuit, deleteTuit } from "../services/tuits-service";
import { createUser, deleteUser } from "../services/users-service";

const BASE_URL = "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;

describe('userDislikesTuit', () => {

    // sample users we'll insert to then retrieve
    const user = {
        username: "username",
        password: "username123",
        email: "username@stooges.com"
    };
    const tuit = {
        tuit: "Alice's tuit"
    }

    // setup data before test
    beforeEach(async () => {
        // insert several known users
        const newUser = await createUser(user)
        user["_id"] = newUser._id;
        const newTuit = await createTuit(user["_id"], tuit);
        tuit["id"] = newTuit._id;
    });

    // clean up after ourselves
    afterEach(async () => {
        await userDislikesTuit(user["_id"], tuit["id"]);
        await deleteUser(user["_id"]);
        await deleteTuit(tuit["id"]);
        //undo dislike
    });

    test('can dislike a tuit using REST API', async () => {
        // retrieve all the users
        const result = await userDislikesTuit(user["_id"], tuit["id"]);
        const api = axios.create({ withCredentials: true });
        const userDislikedTuit = await api.get(`${USERS_API}/${user["_id"]}/dislikes/${tuit["id"]}`);
        expect(result).toBe("OK")
        expect(userDislikedTuit.data.dislikedBy === user["_id"]).toBeTruthy();
    });
});

describe('findAllTuitsDislikedByUser', () => {

    // sample users we'll insert to then retrieve
    const user = {
        username: "username",
        password: "username123",
        email: "username@stooges.com"
    };

    const tuitsLst = [{ tuit: "Alice's tuit 1" }, { tuit: "Alice's tuit 2" }];

    // setup data before test
    beforeEach(async () => {
        // insert several known users
        const newUser = await createUser(user)
        user["_id"] = newUser._id;
        for (const tuit of tuitsLst) {
            const newTuit = await createTuit(user["_id"], tuit);
            tuit._id = newTuit._id;
            await userDislikesTuit(user["_id"], tuit["_id"]);
        }
    });

    // clean up after ourselves
    afterEach(async () => {
        for (const tuit of tuitsLst) {
            await userDislikesTuit(user["_id"], tuit["_id"]);
        }

        await deleteUser(user["_id"]);
        for (const tuit of tuitsLst) {
            await deleteTuit(tuit["_id"]);
        }
    });

    test('can retrive all tuits disliked by user using REST API', async () => {
        // retrieve all the users
        const userDislikedTuits = await findAllTuitsDislikedByUser(user["_id"]);
        userDislikedTuits.forEach(tuit => {
            expect(tuitsLst.map(x => x._id).includes(tuit._id)).toBeTruthy();
        })
    });
});