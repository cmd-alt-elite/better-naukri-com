import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isApplicant: false,
		isRecruiter: false,
		applicantID: null,
		recruiterID: null
	},
	reducers: {
		applicantLogin: (state, action) => {
			state.isApplicant = true;
			state.isRecruiter = false;
			state.applicantID = action.payload;
			state.recruiterID = null;
		},
		userLogout: (state) => {
			state.isApplicant = false;
			state.isRecruiter = false;
			state.applicantID = null;
			state.recruiterID = null;
		},
		recruiterLogin: (state, action) => {
			state.isRecruiter = true;
			state.isApplicant = false;
			state.recruiterID = action.payload;
			state.applicantID = null;
		}
	}
})

export const { applicantLogin, userLogout, recruiterLogin } = userSlice.actions;
export default userSlice.reducer;