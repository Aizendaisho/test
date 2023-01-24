import React, { useState, useRef } from 'react'
import uniqid from "uniqid";

type users = {
  id?: string;
  name: string;
  correo: string;
  password: string;
  direccion: string;
};

export default function App() {
  const [users, setUsers] = useState<users[]>([]);
  const [details, setDetails] = useState({
    name: "",
    correo: "",
    password: "",
    direccion: "",
  });

  const idRef = useRef(1);

  const handlerOnchange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (id?: string) => {
    if (id) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                name: details.name,
                correo: details.correo,
                password: details.password,
                direccion: details.direccion,
              }
            : u
        )
      );
    } else {
      setUsers((prev) => [...prev, { ...details, id: uniqid() }]);
    }
  };

  const deleteUser = (id?: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="m-4">
      App
      <h3>Name</h3>{" "}
      <input
        name="name"
        type="text"
        onChange={handlerOnchange}
        placeholder="Escriba nombre"
      />
      <h3>Correo</h3>{" "}
      <input
        name="correo"
        type="email"
        onChange={handlerOnchange}
        placeholder="Escriba email"
      />
      <h3>Password</h3>{" "}
      <input name="password" type="password" onChange={handlerOnchange} />
      <h3>Direccion</h3>{" "}
      <textarea
        name="direccion"
        placeholder="Direccion"
        onChange={handlerOnchange}
      ></textarea>
      <button
        onClick={() => submitHandler()}
        className=" px-3 py-1 rounded  block bg-indigo-500 text-white"
      >
        Submit
      </button>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.name}</div>
          <div>{user.password}</div>
          <div>{user.correo}</div>
          <div>{user.direccion}</div>
          <button
            onClick={() => deleteUser(user.id)}
            className=" bg-gray-900 text-white"
          >
            borrar
          </button>
          <button onClick={() => submitHandler(user.id)}>Editar</button>
        </div>
      ))}
    </div>
  );
}
