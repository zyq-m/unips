import { useEffect, useState } from "react";
import { logOut, auth, emailAndPasswordSignIn, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <h1>Hi UniPS</h1>
      {user ? <MainContent /> : <SignIn />}
    </>
  );
}

export default App;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: any) => {
    e.preventDefault();
    emailAndPasswordSignIn(email, password);
  };

  return (
    <form onSubmit={login} className="form">
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        className="email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        className="password"
      />
      <button>Login</button>
    </form>
  );
};

const SignOut = () => {
  return (
    <>
      <button className="logout" onClick={logOut}>
        Log out
      </button>
    </>
  );
};

const MainContent = () => {
  const addToDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <>
      <div>
        <button onClick={addToDoc}>Add to doc</button>
        <button onClick={readData}>Read data</button>
      </div>
      <SignOut />
    </>
  );
};
