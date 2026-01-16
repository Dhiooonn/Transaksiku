import { useQuery } from "@tanstack/react-query";
import { getLaporan } from "../Apis/LaporanApi";

export const useLaporan = (filters) =>
  useQuery({
    queryKey: ["laporan", filters],
    queryFn: () => getLaporan(filters),
  });
