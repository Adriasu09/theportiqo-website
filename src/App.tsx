import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import "./App.css";

const router = createRouter({ routeTree, context: { auth: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} context={{ auth }} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
