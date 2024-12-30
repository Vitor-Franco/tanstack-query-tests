import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Header() {
	const queryClient = useQueryClient();

	function handleMouseEnter() {
		queryClient.prefetchQuery({
			queryKey: ["users"],
			queryFn: async () => {
				const response = await fetch("http://localhost:5001/users");
				return response.json();
			},
		});
	}

	return (
		<ul className="flex items-center justify-center gap-2 underline">
			<li>
				<Link to="/" onMouseEnter={handleMouseEnter}>
					Users
				</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
		</ul>
	);
}

export { Header };
