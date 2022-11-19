import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits, deleteTuit, createTuit } from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";
import axios from "axios";
import Tuits from "../components/tuits";

const MOCKED_TUITS = [
  {
    _id: "123",
    tuit: "Alice's tuit",
    stats: { likes: 0 }
  },
  {
    _id: "234",
    tuit: "Bob's tuit",
    stats: { likes: 0 }
  },
  {
    _id: "345",
    tuit: "Charlie's tuit",
    stats: { likes: 0 }
  }
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />;
    </HashRouter>)
  const linkElement = screen.getByText(/Alice/i);
  expect(linkElement).toBeInTheDocument();
});

describe('tuit list renders async', () => {

  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const tuit = {
    tuit: "ellenripley's Tuit",
  }

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    const newUser = await createUser(ripley);
    const newTuit = await createTuit(newUser._id, tuit);
    tuit["_id"] = newTuit._id;
  });

  // clean up after test runs
  afterAll(async () => {
    await deleteTuit(tuit._id);
    // remove any data we created
    await deleteUsersByUsername(ripley.username);
  });


  test('tuit list renders async', async () => {
    const getTuit = await findAllTuits();

    render(
      <HashRouter>
        <Tuits tuits={getTuit} />
      </HashRouter>);
    const tuit = screen.getByText(/ellenripley's Tuit/i);
    expect(tuit).toBeInTheDocument();
  })
})



describe('tuit list renders mocked', () => {

  // setup test before running test
  beforeAll(async () => {
    jest.spyOn(axios, 'get').mockImplementation();
  });

  // clean up after test runs
  afterAll(async () => {
    jest.restoreAllMocks();
  });


  test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { tuit: MOCKED_TUITS } }));
    const response = await findAllTuits();
    const tuits = response.tuit;

    render(
      <HashRouter>
        <Tuits tuits={tuits} />
      </HashRouter>);

    const tuit = screen.getByText(/Alice's tuit/i);
    expect(tuit).toBeInTheDocument();
  });
})
