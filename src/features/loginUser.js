import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fonction asynchrone pour gestion connexion de l'utilisateur
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ userLogin, rememberMe }) => {
        try {
            // Envoi des données de connexion au serveur
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin), 
            });
            const data = await response.json();

            // Gestion des erreurs
            if (!response.ok) {
                throw new Error(data.message || 'Echec de la connexion');
            }

            // Stockage du token dans le local storage ou le session storage (selon l'etat de rememberMe)
            if (data.body && data.body.token) {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('token', data.body.token);
            }
            
            return data;

        } catch (error) {
            return { error: error.message };

        }

    }
)

// Création du slice pour la gestion des états pour la connexion
const userSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        error: null,
        token: null,
        isAuth: false,
    },
    reducers: {
        // Action pour la déconnexion
        logoutUser: (state) => {
            state.token = null;
            state.isAuth = false;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
        // Action pour la restauration de la session
        restoreSession: (state, action) => {
            if (action) {
                state.isAuth = true;
                state.token = action.payload;
            } else {
                state.isAuth = false;
                state.token = null;
            }
        },

    },
    // Gestion des actions asynchrones
    extraReducers: (builder) => {
        builder
            // Gestion de la connexion en cours
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })

            // Gestion de la connexion réussie
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                if (action && action.payload.status === 200) {
                    state.isAuth = true;
                    state.token = action.payload.body.token;
                }
            })
            
            // Gestion de la connexion échouée
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuth = false;

            })
    },
});


export default userSlice.reducer;
export const { logoutUser, restoreSession } = userSlice.actions;