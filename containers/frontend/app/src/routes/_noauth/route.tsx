import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_noauth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet></Outlet>;
}
