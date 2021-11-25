import { useState, useEffect } from "react";

function User({
  user,
  complete,
  deleteCallback,
  updateCallback,
  openDivUserCallback,
  checked,
  onClick,
}) {
  //const [isCompleted,setIsCompleted] = useState(complete)
  const [isShow, setIsShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [zipCode, setZipCode] = useState(user.address.zipcode);
  //const[divStat,setDivStat] =  useState(false)

  // const onChangeName = e => {

  //     setName(e.target.value)

  // }

  useEffect(() => {}, [user.todos]);

  const openHide = () => {
    if (isShow === false) {
      setIsShow(true);
    }
  };

  const hidediv = () => {
    if (isShow === true) {
      setIsShow(false);
    }
  };

  // const deleteUser = () => {

  //     deleteCallback(user.id)

  // }

  const updateUser = () => {
    let obj = {
      name: name,
      email: email,
      street: street,
      city: city,
      zipcode: zipCode,
    };

    updateCallback(user.id, obj);
  };

  const openDivUser = () => {
    let stat = openDivUserCallback(user.id);

    // setDivStat(stat)
  };

  return (
    <div
      className={`user-box ${complete ? "completed" : "notcompleted"} ${
        checked ? "divColor" : ""
      } `}
      onClick={() => {
        openDivUser();
        onClick();
      }}
    >
      <label className="user-id">ID: {user.id} </label> <br />
      <div className="usr-inp">
        <label className="user-lbl">Name:</label>
        <input
          type="text"
          id="inp-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <label className="user-lbl">Email:</label>
        <input
          type="text"
          id="inp-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
      </div>{" "}
      <br /> <br />
      <br />
      <input
        className="o-data"
        type="button"
        value="Other Data"
        onMouseOver={openHide}
        onClick={hidediv}
      />
      <div id="hide-det" className={isShow ? "isVisible" : "isNotVisible"}>
        <label className="hide-lbl">Street:</label>
        <input
          type="text"
          id="inp-street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />{" "}
        <br />
        <label className="hide-lbl">City:</label>
        <input
          type="text"
          id="inp-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />{" "}
        <br />
        <label className="hide-lbl">Zip Code:</label>
        <input
          type="text"
          id="inp-zip"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />{" "}
        <br />
      </div>
      <div className="upd-btn-gen">
        <input
          className="upd-btn"
          type="button"
          value="Update"
          onClick={updateUser}
        />
        <input
          className="upd-btn"
          type="button"
          value="Delete"
          onClick={() => deleteCallback(user.id)}
        />
      </div>
    </div>
  );
}

export default User;
