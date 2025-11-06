import Swal from "sweetalert2";

export const confirmLogout = async () => {
  return Swal.fire({
    title: "Logout?",
    text: "Apakah kamu yakin ingin keluar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, keluar",
    cancelButtonText: "Batal",
  });
};
