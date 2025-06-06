// src/components/Sightings.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Sightings({ user }) {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "users", user.uid, "sightings"),
      orderBy("dateSeen", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setSightings(items);
    });
    return () => unsub();
  }, [user.uid]);

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Your Sightings</h2>
      {sightings.length === 0 && <p>No sightings yet</p>}
      <ul>
        {sightings.map((s) => (
          <li key={s.id}>
            {s.birdName} — {new Date(s.dateSeen).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
