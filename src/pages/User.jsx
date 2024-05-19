import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import composants
import AccountContent from "../components/AccountContent";
import EditUsername from "../components/EditUsername";

// Actions Redux pour récupération des données utilisateur
import {getUser} from "../features/getUser"; 


export default function User() {
  // Récupération des données depuis le store Redux
  const user = useSelector((state) => state.user.user);
  const { isAuth, token } = useSelector((state) => state.login);

  // etat pour le mode edition
  const [editMode, setEditMode] = useState(false);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //recuperation les données si actualisation
  useEffect(() => {
    if (isAuth) {
      dispatch(getUser(token));
      console.log(user);
    } else {
      navigate("/signin");
    }
  }, [dispatch, navigate, isAuth, token, user]);


  //fonctions pour activer/desactiver le mode edition
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditMode(false);
  };


  // Données simulées pour les comptes
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

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
        {accounts.map((account, index) => (
          <AccountContent
            key={index}
            title={account.title}
            amount={account.amount}
            amountDescription={account.description}
          />
        ))}
      </section>
    </main>
  );
}
