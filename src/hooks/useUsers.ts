import { useQuery } from "@tanstack/react-query";
import type { User } from "../@types/user";
import { sleep } from "../utils/sleep";

function useUsers() {
	const { data, refetch, isLoading, isFetching, error } = useQuery({
		enabled: true,
		queryKey: ["users"],
		queryFn: async (): Promise<User[]> => {
			await sleep(500);
			const response = await fetch("http://localhost:5001/users");

			return response.json();
		},
	});

  return { users: data ?? [], refetch, isLoading, isFetching, error }
}

export { useUsers };
