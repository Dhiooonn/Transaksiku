import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "../Apis/DashboardApi";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });
};
