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

export const confirmUpdate = (text = "Simpan perubahan?") => {
  return Swal.fire({
    title: "Konfirmasi",
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, simpan",
    cancelButtonText: "Batal",
  });
};

export const confirmDelete = (text = "Hapus data ini?") => {
  return Swal.fire({
    title: "Yakin?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
  });
};