import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalHeader: "",
  modalText: "",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    notify: (state, data) => {
      const modalHeader = data.payload.modalHeader;
      const modalText = data.payload.modalText;
      state = {
        showModal: true,
        modalHeader: modalHeader,
        modalText: modalText,
      };
    },
    clear: (state) => {
      state = {
        showModal: false,
        modalHeader: "",
        modalText: "",
      };
    },
  },
});

export const { notify, clear } = AppSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;
export const Notification = (state) => state.app;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default AppSlice.reducer;
