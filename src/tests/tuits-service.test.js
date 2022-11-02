import { createTuit, findAllTuits, deleteTuit, findTuitById } from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service"

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
  const tuits = [
    { tuit: "Alice's tuit 0" },
    { tuit: "Alice's tuit 1" },
    { tuit: "Alice's tuit 2" }
  ]

  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  beforeAll(async () => {
    await deleteUsersByUsername(ripley.username);
    const user = await createUser(ripley);
    ripley["id"] = user._id;
    tuits.forEach(async (tuit) => {
      const newTuit = await createTuit(ripley["id"], tuit);
      tuit["id"] = newTuit._id;
    })
  });

  test('can delete tuit with REST API', async () => {
    const getTuits = await findAllTuits();
    expect(getTuits.length).toBe(tuits.length);
    getTuits.forEach(tuit => {
      expect(tuits.includes(x => x.id === tuit._id)).toBeTruthy();
    })
  })

  afterAll(async () => {
    tuits.forEach(async (tuit) => {
      await deleteTuit(tuit["id"]);
    })
    await deleteUsersByUsername(ripley.username);
  })
});