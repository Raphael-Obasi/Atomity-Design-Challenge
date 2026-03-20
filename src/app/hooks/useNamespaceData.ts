import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Namespace {
  id: number;
  name: string;
  total: number;
  efficiency: number;
}

const fetchNamespaces = async (): Promise<Namespace[]> => {
  const res = await axios.get("https://dummyjson.com/products");

  // Transform data into something usable
  return res.data.products.slice(0, 4).map((item: any) => ({
    id: item.id,
    name: item.title,
    total: item.price * 100,
    efficiency: Math.floor(item.rating * 20), // fake %
  }));
};

export const useNamespaceData = () => {
  return useQuery({
    queryKey: ["namespaces"],
    queryFn: fetchNamespaces,
    staleTime: 1000 * 60 * 5, // 5 minutes (important for caching)
  });
};
