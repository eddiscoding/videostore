import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Form,
  Input,
} from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CustomLink } from "@/components/custom-link";
import { LoginFormSchema } from "@/models/forms/login-form-schema";

export const Route = createFileRoute("/_no-auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  const onSubmit = ({ email, password }: z.input<typeof LoginFormSchema>) => {
    alert(`{"email": "${email}", "password": "${password}"}`);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Form onSubmit={handleSubmit(onSubmit)} validationBehavior="aria">
          <Card className="min-h-80">
            <CardHeader className="p-4 flex flex-col gap-2">
              <h1 className="text-[1.25rem] font-bold">
                Welcome to VIDEOSTORE
              </h1>
              <h2>Introduce your credentials to access your dashboard</h2>
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
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </div>
    </>
  );
}
