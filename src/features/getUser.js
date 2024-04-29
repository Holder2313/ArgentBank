import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

            return data;

        } catch (error) {
            return { error: error.message };

        }
    } 
)


const getUserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    extraReducers(builder) {
        builder
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
            });
    },

})


export default getUserSlice.reducer;