import React, { useState } from "react";
import AccountContent from "../components/AccountContent";
import EditUsername from "../components/EditUsername";
import { useSelector } from "react-redux";

export default function User() {
  const [editMode, setEditMode] = useState(false);

  const user = useSelector((state) => state.login.user);
  console.log(user);

  
  const handleEditClick = () => {
    setEditMode(true);
  };

  
  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <main className="main bg-dark">
      {editMode ? (
        <EditUsername onCancel={handleCancel} />
      ) : (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user && user.body.firstName} {user && user.body.lastName} !
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </div>
      )}

      <h2 className="sr-only">Accounts</h2>

      <section>
        <AccountContent
          title={"Argent Bank Checking (x8349)"}
          amount={"$2,082.79"}
          amountDescription={"Available Balance"}
        />
        <AccountContent
          title={"Argent Bank Savings (x6712)"}
          amount={"$10,928.42"}
          amountDescription={"Available Balance"}
        />
        <AccountContent
          title={"Argent Bank Credit Card (x8349)"}
          amount={"$184.30"}
          amountDescription={"Current Balance"}
        />
      </section>
    </main>
  );
}
