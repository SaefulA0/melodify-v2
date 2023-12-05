const successToast = ({ message }) =>
  toast("Daftar Putar Musik berhasil dibuat", {
    hideProgressBar: false,
    autoClose: 1700,
    type: "success",
    position: "bottom-left",
    closeOnClick: true,
    draggable: true,
    theme: "light",
  });
