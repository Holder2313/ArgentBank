import { configureStore } from "@reduxjs/toolkit";

import loginUser from "./features/loginUser";
import getUser from "./features/getUser";



const store = configureStore({
   reducer: {
      login: loginUser,
      user: getUser,
   }
})


export default store;   