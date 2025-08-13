import { loginSchema, type LoginForm } from "@/schemas/auth/login-schema";
import { getBackendClient } from "@/services/api-service";
import { isUserLoggedIn } from "@/services/auth-service";
import type { BasicResponse } from "@/types/backend-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_noauth/login")({
  component: RouteComponent,
  beforeLoad: async () => {
    // Check if user is logged in. If he is, he doesn't need to login again
    const authenticated = await isUserLoggedIn();
    if (authenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    const client = getBackendClient();
    const { httpCode, message } = await client
      .post(formData, "/auth/login")
      .json<BasicResponse>();

    if (message) {
      console.debug(message);
    }

    if (httpCode == 200) {
      // Succesful login, redirect
      router.navigate({
        to: "/",
      });
    }
  };

  return (
    <>
      <div className="h-screen">
        <main className="flex h-full gap-4 items-center justify-center p-4">
          <div className="card bg-base-100 shadow-md p-8 w-96 h-96 flex flex-col items-center justify-center">
            <div className="card-body">
              <header className="card-title">
                <h1 className="font-bold text-center text-xl">
                  Welcome to Video Store
                </h1>
              </header>

              <form
                action="#"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col mt-4 gap-4"
              >
                <fieldset className="fieldset">
                  <label htmlFor="email" className="label">
                    Email:
                  </label>
                  <input
                    id="email"
                    className="input input-md"
                    type="email"
                    {...register("email", { required: true })}
                  />

                  {errors.email && (
                    <p className="text-error text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="fieldset">
                  <label htmlFor="password" className="label">
                    Password:
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input input-md"
                    {...register("password", { required: true })}
                  />

                  {errors.password && (
                    <p className="text-error text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </fieldset>

                <Link to={"/forgot-password"} className="link text-right">
                  Forgot your password?
                </Link>

                <motion.button
                  whileHover={{ scale: 1.25 }}
                  className="btn btn-neutral mt-4 hover:btn-primary"
                >
                  Login
                </motion.button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
