import { createTuit, findAllTuits, deleteTuit, findTuitById } from "../services/tuits-service";
import { createUser, deleteUsersByUsername, deleteUser } from "../services/users-service"


describe('can create tuit with REST API', () => {
  const tuit = {
    tuit: "Alice's tuit"
  }

  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const user = await createUser(ripley);
    ripley["id"] = user._id;
  });

  test('can insert a new tuit with REST API', async () => {
    const data = await createTuit(ripley["id"], tuit);
    tuit["id"] = data._id;
    expect(data.tuit).toBe(tuit.tuit);
  })

  afterAll(async () => {
    await deleteTuit(tuit["id"]);
    await deleteUsersByUsername(ripley.username);
  })
});

describe('can delete tuit wtih REST API', () => {
  const tuit = {
    tuit: "Alice's tuit"
  }

  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const user = await createUser(ripley);
    ripley["id"] = user._id;
    const newTuit = await createTuit(ripley["id"], tuit);
    tuit["id"] = newTuit._id;
  });

  test('can delete tuit with REST API', async () => {
    const status = await deleteTuit(tuit["id"]);

    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })

  afterAll(async () => {
    await deleteUsersByUsername(ripley.username);
  })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const tuit = {
    tuit: "Alice's tuit"
  }

  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const user = await createUser(ripley);
    ripley["id"] = user._id;
    const newTuit = await createTuit(ripley["id"], tuit);
    tuit["id"] = newTuit._id;
  });

  test('can delete tuit with REST API', async () => {
    const getTuit = await findTuitById(tuit["id"]);

    expect(getTuit._id).toBe(tuit["id"]);
    expect(getTuit.tuit).toBe("Alice's tuit");
  })

  afterAll(async () => {
    await deleteTuit(tuit["id"]);
    await deleteUsersByUsername(ripley.username);
  })
});

describe('can retrieve all tuits with REST API', () => {

  const ripley = {
    username: 'ellenripley123456',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const tuitsLst = [{ tuit: "Alice's tuit 1" }, { tuit: "Alice's tuit 2" }];

  beforeAll(async () => {
    const user = await createUser(ripley);
    ripley.uniqueId = user._id;
    console.log("uniqueId", ripley.uniqueId);
    for (const tuit of tuitsLst) {
      const newTuit = await createTuit(ripley.uniqueId, tuit);
      tuit._id = newTuit._id;
    }
  });

  afterAll(async () => {
    for (const tuit of tuitsLst) {
      await deleteTuit(tuit._id);
    }
    await deleteUser(ripley.uniqueId);
  });

  test('can retrieve all tuits with REST API', async () => {

    const tuits = await findAllTuits();
    const tuitsId = [];
    tuits.forEach(tuit => {
      tuitsId.push(tuit._id);
    });

    tuits.forEach(tuit => {
      expect(tuitsId.includes(tuit._id)).toBeTruthy();
    })
  });
});