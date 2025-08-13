import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="h-screen">
        <main className="flex h-full gap-4 items-center justify-center p-4">
          <div className="card bg-base-100 shadow-md p-8 w-96 h-96 flex flex-col items-center justify-center">
            <h1 className="font-bold text-center text-xl">
              Welcome to Video Store
            </h1>

            <p>aaaa</p>
          </div>
        </main>
      </div>
    </>
  );
}
