import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Input,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { CustomLink } from "@/components/custom-link";
import { LoginFormSchema } from "@/models/forms/login-form-schema";
import { useAuthStore } from "@/stores/auth-store";

export const Route = createFileRoute("/_no-auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const [isWorking, setIsWorking] = useState(false);
  const navigate = useNavigate();

  const { retrieveToken } = useAuthStore();

  const onSubmit = async (data: z.input<typeof LoginFormSchema>) => {
    setIsWorking(true);
    const result = await retrieveToken(data);

    if (!result.success) {
      const { error } = result;
      switch (error) {
        case "BAD_REQUEST":
          // Wrong credentials
          addToast({
            title: "Incorrect user or password.",
            color: "danger",
            variant: "flat",
          });
          break;
        case "UNAUTHORIZED":
          // Should never be reached
          addToast({
            title: "Unauthorized to access this resource.",
            color: "danger",
            variant: "flat",
          });
          break;
        case "NETWORK_ERROR":
          // Server unreachable?
          addToast({
            title: "The server is currently unreachable.",
            color: "danger",
            variant: "flat",
          });
          break;
        case "UNKNOWN":
          // Unknown error
          addToast({
            title:
              "Unkown error. Please try again later. If this problem persists, talk with the administrator.",
            color: "danger",
            variant: "flat",
          });
      }
      setIsWorking(false);
      return;
    }

    setIsWorking(false);

    // Succesful login. Redirect to dashboard
    navigate({
      to: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Form onSubmit={handleSubmit(onSubmit)} validationBehavior="aria">
        <Card className="lg:min-w-96">
          <CardHeader className="p-4 flex flex-col gap-2">
            <h1 className="text-[1.25rem] font-bold">Welcome to VIDEOSTORE</h1>
          </CardHeader>

          <Divider />

          <CardBody className="p-4 flex flex-col gap-4">
            <Controller
              control={control}
              name="email"
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <Input
                  type="email"
                  ref={ref}
                  isRequired
                  errorMessage={error?.message}
                  isInvalid={invalid}
                  label="Email"
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <Input
                  ref={ref}
                  type="password"
                  isRequired
                  errorMessage={error?.message}
                  isInvalid={invalid}
                  label="Password"
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
          </CardBody>

          <Divider />

          <CardFooter className="p-4 flex flex-col items-end justify-center gap-2 w-full">
            <CustomLink color="secondary" to="/login">
              Forgot your password?
            </CustomLink>

            <Button
              type="submit"
              className="w-1/2"
              color="primary"
              variant="solid"
              size="md"
              isLoading={isWorking}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
