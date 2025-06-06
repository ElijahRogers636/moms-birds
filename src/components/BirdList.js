// src/components/BirdList.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const birds = [
  { id: "AMRO", name: "American Robin" },
  { id: "NOCA", name: "Northern Cardinal" },
  { id: "MODO", name: "Mourning Dove" },
];

export default function BirdList({ user }) {
  const [message, setMessage] = useState("");

  async function addSighting(bird) {
    try {
      await addDoc(collection(db, "users", user.uid, "sightings"), {
        birdId: bird.id,
        birdName: bird.name,
        dateSeen: new Date().toISOString(),
      });
      setMessage(`Added sighting: ${bird.name}`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error adding sighting");
    }
  }

  return (
    <div>
      <h2>Birds</h2>
      {birds.map((bird) => (
        <div
          key={bird.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
          }}
        >
          <span>{bird.name}</span>
          <button onClick={() => addSighting(bird)}>I saw this!</button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
}
