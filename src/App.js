// src/App.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./components/Login";
import BirdList from "./components/BirdList";
import Sightings from "./components/Sightings";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <Login />;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>Bird Tracker</h1>
        <button onClick={() => signOut(auth)}>Log out</button>
      </header>
      <BirdList user={user} />
      <Sightings user={user} />
    </div>
  );
}

