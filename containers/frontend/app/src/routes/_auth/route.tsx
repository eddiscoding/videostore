import { createFileRoute, Outlet } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { isUserLoggedIn } from "@/services/auth-service";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: () => {
    // Check if user is logged in, else send him to /login
    if (!isUserLoggedIn()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet></Outlet>;
}
