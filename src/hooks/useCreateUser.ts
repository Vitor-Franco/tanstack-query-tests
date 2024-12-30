import { useMutation } from "@tanstack/react-query";
import type { User } from "../@types/user";
import { sleep } from "../utils/sleep";

function useCreateUser() {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({
			name,
			email,
		}: { name: string; email: string }): Promise<User> => {
			await sleep();
			const response = await fetch("http://localhost:5001/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email }),
			});

			return response.json();
		},
	});

	return {
		mutateAsync,
		isPending,
	};
}

export { useCreateUser };
