import { toast } from "react-toastify";

export default function failToast({ message }) {
  const successToast = () =>
    toast(message, {
      hideProgressBar: false,
      autoClose: 2000,
      type: "success",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
}
