import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRekening,
  createRekening,
  updateRekening,
  deleteRekening,
  bulkDeleteRekening,
} from "../Apis/RekeningApi";

export const useRekening = (params) =>
  useQuery({
    queryKey: ["rekening", params],
    queryFn: () => getRekening(params),
  });

export const useCreateRekening = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createRekening,
    onMutate: async (newData) => {
      await qc.cancelQueries(["rekening"]);
      const prev = qc.getQueryData(["rekening"]);
      qc.setQueryData(["rekening"], (old) => [...(old || []), newData]);
      return { prev };
    },
    onError: (_, __, ctx) => qc.setQueryData(["rekening"], ctx.prev),
    onSettled: () => qc.invalidateQueries(["rekening"]),
  });
};

export const useUpdateRekening = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateRekening(id, data),
    onMutate: async ({ id, data }) => {
      const prev = qc.getQueryData(["rekening"]);
      qc.setQueryData(["rekening"], (old) =>
        old.map((r) => (r.id === id ? { ...r, ...data } : r))
      );
      return { prev };
    },
    onError: (_, __, ctx) => qc.setQueryData(["rekening"], ctx.prev),
    onSettled: () => qc.invalidateQueries(["rekening"]),
  });
};

export const useDeleteRekening = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteRekening,
    onMutate: async (id) => {
      const prev = qc.getQueryData(["rekening"]);
      qc.setQueryData(["rekening"], (old) => old.filter((r) => r.id !== id));
      return { prev };
    },
    onError: (_, __, ctx) => qc.setQueryData(["rekening"], ctx.prev),
    onSettled: () => qc.invalidateQueries(["rekening"]),
  });
};

export const useBulkDeleteRekening = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteRekening,
    onSettled: () => qc.invalidateQueries(["rekening"]),
  });
};
