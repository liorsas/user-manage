import { useState } from "react";

function AddUser({ callbackCancelAddUser, callbackAddUser }) {
  const [user, setUser] = useState({ name: "", email: "" });

  const addNewUser = () => {
    let newObj = {
      name: user.name,
      email: user.email,
    };

    callbackAddUser(newObj);
  };

  return (
    <div className="add-user-box">
      <h2>Add New User</h2>
      <label className="lbl-inp">
        Name:
        <input
          className="add-u-inp"
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <br /> <br />
      <label className="lbl-inp">
        Email:
        <input
          className="add-u-inp"
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>{" "}
      <br />
      <br />
      <div className="btn-add-gen">
        <input
          className="add-btn"
          type="button"
          value="Cancel"
          onClick={callbackCancelAddUser}
        />
        <input
          className="add-btn"
          type="button"
          value="Add"
          onClick={addNewUser}
        />
      </div>
    </div>
  );
}

export default AddUser;
