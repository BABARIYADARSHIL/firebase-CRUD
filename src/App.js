import "./App.css";
import { firebasestore } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [newName, setNewName] = useState();
  const [newNo, setNewNo] = useState(0);
  const [user, setUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const usersCollectionRef = collection(firebasestore, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, no: Number(newNo) });
    getUsers();
    setNewName("");
    setNewNo(0);
  };
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateUser = async (id, name, no) => {
    const userDoc = doc(firebasestore, "users", id);
    const newFields = { name: name, no: Number(no) };
    await updateDoc(userDoc, newFields);
    getUsers();
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(firebasestore, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    console.log("---------,,,,", user),
    (
      <div className="App">
        <input
          type="text"
          placeholder="enter name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        ></input>

        <input
          type="number"
          placeholder="enter no"
          onChange={(event) => {
            setNewNo(event.target.value);
          }}
        ></input>
        <button onClick={createUser}>Add</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser((prev) =>
                          prev.map((u) =>
                            u.id === user.id
                              ? { ...u, name: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="number"
                      value={user.no}
                      onChange={(e) =>
                        setUser((prev) =>
                          prev.map((u) =>
                            u.id === user.id
                              ? { ...u, name: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  ) : (
                    user.no
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <button
                      onClick={() => updateUser(user.id, user.name, user.no)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingUser(user.id);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default App;
