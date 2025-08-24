import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: async () => {
    const { isTokenValid } = useAuthStore.getState();

    if (await isTokenValid()) {
      // User is logged in, redirect to dashboard
      throw redirect({
        to: "/dashboard",
      });
    }

    throw redirect({
      to: "/login",
    });
  },
});

function App() {
  return;
}
