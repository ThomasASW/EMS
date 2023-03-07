import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalHeader: "",
  modalText: "",
  callback: undefined,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    notify: (state, data) => {
      state.showModal = true;
      state.modalHeader = data.payload.modalHeader;
      state.modalText = data.payload.modalText;
      state.callback = data.payload.callback;
    },
    clear: (state) => {
      if (state.callback !== undefined) {
        state.callback();
      }
      state.showModal = false;
      state.modalHeader = "";
      state.modalText = "";
      state.callback = undefined;
    },
  },
});

export const { notify, clear } = AppSlice.actions;

export const Notification = (state) => state.app;

export default AppSlice.reducer;
