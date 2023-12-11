import React, { useState } from "react";

export default function failToast({ message }) {
  const failToast = () =>
    toast("Daftar putar musik gagal disimpan", {
      hideProgressBar: false,
      autoClose: 2000,
      type: "error",
      position: "bottom-left",
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
}
