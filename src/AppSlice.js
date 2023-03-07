import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  modalHeader: "",
  modalText: "",
  isConfirm: false,
  closeCallback: undefined,
  confirmCallback: undefined,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    notify: (state, data) => {
      state.showModal = true;
      state.isConfirm = data.payload.isConfirm;
      state.modalHeader = data.payload.modalHeader;
      state.modalText = data.payload.modalText;
      state.closeCallback = data.payload.closeCallback;
      state.confirmCallback = data.payload.confirmCallback;
    },
    confirm: (state) => {
      state.confirmCallback();
      state.showModal = false;
      state.isConfirm = false;
      state.modalHeader = "";
      state.modalText = "";
      state.closeCallback = undefined;
      state.confirmCallback = undefined;
    },
    clear: (state) => {
      if (state.closeCallback !== undefined) {
        state.closeCallback();
      }
      state.showModal = false;
      state.isConfirm = false;
      state.modalHeader = "";
      state.modalText = "";
      state.closeCallback = undefined;
      state.confirmCallback = undefined;
    },
  },
});

export const { notify, clear, confirm } = AppSlice.actions;

export const Notification = (state) => state.app;

export default AppSlice.reducer;
