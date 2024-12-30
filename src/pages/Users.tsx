import { useCreateUser } from "../hooks/useCreateUser";
import { useUsers } from "../hooks/useUsers";

function Users() {
	const { users, refetch, isLoading, isFetching, error } = useUsers();

	const { mutateAsync, isPending } = useCreateUser();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const element = event.currentTarget
			.elements as typeof event.currentTarget.elements & {
			name: HTMLInputElement;
			email: HTMLInputElement;
		};

		await mutateAsync({
			name: element.name.value,
			email: element.email.value,
		});

		refetch();
	};

	return (
		<div className="flex flex-col items-center justify-center h-full gap-6 text-xl text-white">
			<div>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="name"
						className="p-1 rounded-md outline-none text-zinc-900"
						name="name"
					/>
					<input
						type="text"
						placeholder="email"
						className="p-1 rounded-md outline-none text-zinc-900"
						name="email"
					/>
					<button
						type="submit"
						className="py-2 bg-blue-400 rounded-md text-zinc-950"
					>
						{isPending ? "Cadastrando" : "Cadastrar"}
					</button>
				</form>
			</div>

			{error && <p>{error.message}</p>}
			{isLoading && <p>Carregando...</p>}

			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<strong>{user.name}</strong> - {user.email}
					</li>
				))}
			</ul>

			<button
				type="button"
				className="px-4 py-2 text-black bg-white rounded-lg"
				onClick={() => refetch()}
			>
				Sign In
				{!isLoading && isFetching && (
					<small className="ml-2 text-sm">Fetching...</small>
				)}
			</button>
		</div>
	);
}

export default Users;
