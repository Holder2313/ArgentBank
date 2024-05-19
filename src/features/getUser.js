import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fonction asynchrone pour récupérer les informations de l'utilisateur
export const getUser = createAsyncThunk(
    'user/getUser',
    async (token) => {
        try {
            // Envoi de la requête POST au serveur pour récupérer les données de l'utilisateur
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                
            });
            
            // gestion des erreurs
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Echech de la connexion');
            }

            return data;

        } catch (error) {
            return { error: error.message };

        } 
    } 
)

// fonction asynchrone pour mettre à jour le nom de l'utilisateur
export const updateUserName = createAsyncThunk(
    'login/updateUserName',
    async ({ userUpdate, token }) => {

        try {
            // Envoi de la requête PUT au serveur pour mettre à jour le nom de l'utilisateur
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userUpdate),
            });

            // gestion des erreurs
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Echech de la connexion');
            }

            return data;

        } catch (error) {
            return { error: error.message };
        }
    }
)

// Création du slice pour la gestion des états (données de l'utilisateur)
const getUserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers(builder) {
        builder
           // gestion des états pour la recuperation des données de l'utilisateur
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action) {
                    state.user = action.payload;
                }
                
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // gestion des états pour la mise à jour du nom de l'utilisateur
            .addCase(updateUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;

            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

})


export default getUserSlice.reducer;