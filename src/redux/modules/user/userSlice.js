import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  called: false,
  error: null,
  response: null,
  success: {
    add: false,
    update: false,
    delete: false,
    changePassword: false
  },
  data: {
    list: null,
    single: null,
    total: 0
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllUser: (state, action) => {
      state.called = true;
			state.data.list = action.payload.data.data;
			state.data.total = parseInt(action.payload.data.total);
    },
    setSingleUser: (state, action) => {
      state.called = true;
			state.data.single = action.payload.data;
    },
    createUser: (state, action) => {
      state.called = true;
			state.success.add = true;
    },
    updateUser: (state, action) => {
      state.called = true;
			state.success.update = true;
    },
    deleteUser: (state, action) => {
      state.called = true;
			state.success.delete = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setAllUser, 
  setSingleUser,
  createUser,
  updateUser,
  deleteUser 
} = userSlice.actions

export const userSelector = (state) => state.user


export default userSlice.reducer