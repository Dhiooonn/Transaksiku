import Swal from "sweetalert2";

export const confirmTransfer = (form) => {
  return Swal.fire({
    title: "Konfirmasi Transfer",
    html: `
      <p><b>Tujuan:</b> ${form.tujuan}</p>
      <p><b>Bank:</b> ${form.bank}</p>
      <p><b>Nominal:</b> Rp ${form.nominal.toLocaleString()}</p>
    `,
    showCancelButton: true,
    confirmButtonText: "Kirim",
    cancelButtonText: "Batal",
  });
};
