import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ userLogin, rememberMe }) => {
        alert('loginUser File js');
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),
            });
            const data = await response.json();


            if (!response.ok) {
                throw new Error(data.message || 'Echec de la connexion');
            }

            if (data.body && data.body.token) {
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('token', data.body.token);
            }
            console.log(data);
            return data;

        } catch (error) {
            return { error: error.message };

        }

    }
)


const userSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        error: null,
        token: null,
        isAuth: false,
        user: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.isAuth = false;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
        restoreSession: (state) => {
            const token = localStorage.getItem('token'); // Utiliser seulement localStorage
            if (token) {
                state.isAuth = true;
                state.token = token;
            } else {
                // Assurez-vous que l'état est nettoyé si aucun token n'est trouvé
                state.isAuth = false;
                state.token = null;
            }
        },

    },
    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                if (action && action.payload.status === 200) {
                    state.isAuth = true;
                    state.token = action.payload.body.token;
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuth = false;

            })
    },
});


export default userSlice.reducer;
export const { logoutUser, restoreSession } = userSlice.actions;