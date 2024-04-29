import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userLogin) => {
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
            console.log(data);
            return data;

        } catch (error) {
            return { error: error.message };

        }

    }
)

export const getUser = createAsyncThunk(
    'login/getUser',
    async (token) => {
        try {
            console.log(token);
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Echech de la connexion');
            }

            console.log(data);
            return data;

        } catch (error) {
            return { error: error.message };

        }
    }
)

export const updateUserName = createAsyncThunk(
    'login/updateUserName',
    async ({ userUpdate, token }) => {

        try {

            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userUpdate),
            });

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
        },

    },
    extraReducers: (builder) => {
        builder
            // loginUser
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


            // getUser

            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action) {
                    state.user = action.payload;
                }
                console.log(action.payload);

            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // updateUserName password456

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
});


export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;