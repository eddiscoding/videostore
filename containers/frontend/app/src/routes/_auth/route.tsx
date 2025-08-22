import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { isTokenValid } = useAuthStore.getState();

    if (!(await isTokenValid())) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
