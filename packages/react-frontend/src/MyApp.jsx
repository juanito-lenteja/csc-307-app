// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) { 
    postUser(person)
      .then((res) => res.status == 201 ? res.json() : undefined)
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      })
  } 

  function removeOneCharacter(index) {
    const userId = characters[index]["_id"]; // _id for mongoose
    deleteUser(userId)
      .then((res) => {
        if(res.status == 204)
        {
          const updatedUsers = characters.filter((_, i) => i !== index);
          setCharacters(updatedUsers);
        } else if (res.status == 404)
          throw new Error("User not found")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person)
  });

  return promise;
}

function deleteUser(id) {
  const promise = fetch("Http://localhost:8000/users/" + id, {
    method: "DELETE"
  });
  return promise;
}

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
    <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;