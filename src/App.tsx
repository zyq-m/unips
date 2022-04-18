import { useEffect, useState } from "react";
import { signIn, logOut, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  uid: string | null;
  name: string | null;
  email: string | null;
  photoURL: string | null;
}

function App() {
  const [user, setUser] = useState<User>({
    uid: "",
    name: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const providerData = user.providerData;

        setUser({
          uid: providerData[0].uid,
          name: providerData[0].displayName,
          email: providerData[0].email,
          photoURL: providerData[0].photoURL,
        });
      } else {
        setUser({
          uid: "",
          name: "",
          email: "",
          photoURL: "",
        });
      }
    });
  }, []);

  return (
    <>
      <h1>Hi UNIPS</h1>
      {user.uid ? <UserDetails userDetails={user} /> : <SignIn />}
    </>
  );
}

export default App;

const SignIn = () => {
  return (
    <>
      <button onClick={signIn}>Login</button>
    </>
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

const UserDetails = ({ userDetails }: any) => {
  const { name, email, photoURL } = userDetails;
  return (
    <div className="user-details">
      <img src={photoURL} alt={name} />
      <p className="name">Welcome {name} 👋</p>
      <p className="email">{email}</p>
      <SignOut />
    </div>
  );
};
