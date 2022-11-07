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

  const mapTuitString = ['Tuit1', 'Tuit2', 'Tuit3'];
  const mapTuitId = [];

  beforeAll(async () => {
    const user = await createUser(ripley);
    ripley.uniqueId = user._id;

    mapTuitString.map(async tuit => {
      await createTuit(ripley.uniqueId,
        {
          tuit: `${tuit}`
        }
      );
    })
  });

  afterAll(async () => {
    await mapTuitId.forEach(tuit => {
      deleteTuit(tuit);
    });
    await deleteUser(ripley.uniqueId);
  });

  test('can retrieve all tuits with REST API', async () => {

    const findTuit = await findAllTuits();

    const tuitsWeInserted = findTuit.filter(
      tuit => mapTuitString.indexOf(tuit.tuit) >= 0);

    tuitsWeInserted.forEach(tuit => {
      const tuitName = mapTuitString.find(tuitName => tuitName === tuit.tuit);
      expect(tuit.tuit).toEqual(tuitName);
      mapTuitId.push(tuit._id);
    });
  });
});