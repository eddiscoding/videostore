import {
  passwordRecoverySchema,
  type PasswordRecoveryForm,
} from "@/schemas/auth/password-recovery-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/_noauth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isFormSent, setIsFormSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordRecoverySchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PasswordRecoveryForm> = (data) => {
    console.log("FORM SENT", data);
    setIsFormSent(true);
  };

  return (
    <>
      <div className="h-screen">
        <main className="flex h-full gap-4 items-center justify-center p-4">
          <div className="card bg-base-100 shadow-md p-8 w-96 h-96 flex flex-col items-center justify-center">
            <div className="card-body">
              <header className="card-title">
                <h1 className="font-bold text-center text-xl">
                  Forgot your password?
                </h1>
              </header>

              {!isFormSent && (
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

                  <Link to={"/login"} className="link text-right">
                    Login instead!{" "}
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.25 }}
                    className="btn btn-neutral mt-4 hover:btn-primary"
                  >
                    Send recovery link
                  </motion.button>
                </form>
              )}

              {isFormSent && (
                <>
                  <div role="alert" className="alert alert-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      We've sent an email with instructions to reset your
                      credentials.
                    </span>

                    <Link to="/login" className="link text-right w-full">
                      Go back to login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
