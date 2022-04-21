import { useEffect, useState } from "react";
import { logOut, auth, emailAndPasswordSignIn, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

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
      {user && <SignOut />}
      {user ? <AddParcelRecord /> : <SignIn />}
      <SearchItem />
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
      <button className="btn-primary">Login</button>
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

const AddParcelRecord = () => {
  const [success, setSuccess] = useState(false);
  const [trackNum, setTrackNum] = useState("");
  const [date, setDate] = useState("");

  const onSuccess = () => {
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000); // after 2 secs it set to false
  };

  const clearForm = () => {
    setTrackNum("");
    setDate("");
  };

  const addToDoc = async (e: any) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "items"), {
        trackNum: trackNum,
        dateReceive: date,
        received: false,
      });

      onSuccess();
      clearForm();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <>
      {success && <SuccessMessage />}
      <form onSubmit={addToDoc}>
        <div>
          <label htmlFor="trackNum">Tracking Number</label>
          <input
            id="trackNum"
            type="text"
            onChange={e => setTrackNum(e.target.value)}
            value={trackNum}
          />
        </div>
        <div>
          <label htmlFor="date">Date of receive</label>
          <input
            id="date"
            type="date"
            onChange={e => setDate(e.target.value)}
            value={date}
          />
        </div>
        <button className="btn-primary">Add item</button>
      </form>
    </>
  );
};

const SuccessMessage = () => {
  return (
    <>
      <p>The item is successfully added to record!</p>
    </>
  );
};

const SearchItem = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  const readItem = async () => {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("trackNum", "==", search));
    const itemsSnap = await getDocs(q);

    // execute query
    if (itemsSnap.docs.length > 0) {
      itemsSnap.forEach(doc => {
        const data = doc.data();
        setResult(JSON.stringify(data));
      });
    } else {
      setResult(JSON.stringify({ error: `${search} not found` }));
    }
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    readItem();
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <input
          type="text"
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tracking number"
          value={search}
        />
        <button>Search</button>
      </form>

      {result && <SearchResult result={result} />}
    </>
  );
};

const SearchResult = ({ result }: any) => {
  const data = result && JSON.parse(result);

  return (
    <div>
      {data.error ? (
        <p>{data.error}</p>
      ) : (
        <>
          <p>Tracking no: {data.trackNum}</p>
          <p>Receive: {data.dateReceive}</p>
        </>
      )}
    </div>
  );
};
