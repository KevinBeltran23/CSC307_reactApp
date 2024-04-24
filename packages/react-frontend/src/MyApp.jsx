// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(_id) {
        fetch(`http://localhost:8000/users/${_id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (response.status === 204) {
                // Filter out the character with the specified ID and update the character list
                const updated = characters.filter((character) => character.id !== _id);
                setCharacters(updated);
            } else if (response.status === 404) {
                console.log("Resource not found.");
            } else {
                throw new Error("Failed to delete user. Status code: " + response.status);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

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
          body: JSON.stringify(person),
        });
        return promise;
    }

    function updateList(person) { 
        postUser(person)
            .then((response) => {
                if (response.status === 201) {
                    setCharacters([...characters, newUser]); 
                    return response.json(); 
                } else {
                    throw new Error("Failed to add user. Status code: " + response.status);
                }
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
      }, [] 
    );

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
