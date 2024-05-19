import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// import composants
import { updateUserName } from "../features/getUser";


export default function EditUsername({ onCancel }) {
  // Récupération des données depuis le store Redux
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.login.token);
  const loading = useSelector(state=>state.user.loading)
  
  // Etat local pour le formulaire de modification du nom d'utilisateur
  const [userName, setUserName] = useState(user.body.userName);

  // Hooks
  const dispatch = useDispatch();

  // Fonction de sauvegarde des modifications
  const handleSave = () => {
    if (token) {
      const userUpdate = { userName }
      dispatch(updateUserName({ userUpdate, token }));
      onCancel()
    }
  };

  
  return (
    <div className="edit-user-container">
      <h2>Edit User Info</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group read-only">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={user.body.firstName}
            readOnly
          />
        </div>

        <div className="form-group read-only">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={user.body.lastName}
            readOnly
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={handleSave}>
           {!loading ? 'loading' : 'Save'}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

EditUsername.propTypes = {
  onCancel: PropTypes.func,
};
