import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import Users from "./pages/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import { Header } from "./components/Header";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 5, // 5 seconds
			refetchOnWindowFocus: false,
			retry: false,
			gcTime: 1000 * 60 * 10, // 10 minutes
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="h-screen text-white bg-zinc-950">
					<Header />

					<Routes>
						<Route path="/" element={<Users />} />
						<Route path="/posts" element={<Posts />} />
					</Routes>
					<ReactQueryDevtools buttonPosition="bottom-right" />
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export { App };
