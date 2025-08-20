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
import { CustomLink } from "@/components/custom-link";

export const Route = createFileRoute("/_no-auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Form>
          <Card className="min-h-80">
            <CardHeader className="p-4 flex flex-col gap-2">
              <h1 className="text-[1.25rem] font-bold">
                Welcome to VIDEOSTORE
              </h1>
              <h2>Introduce your credentials to access your dashboard</h2>
            </CardHeader>

            <Divider />

            <CardBody className="p-4 flex flex-col gap-4">
              <Input
                type="email"
                isRequired
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <Input
                type="password"
                isRequired
                label="Password"
                name="password"
                placeholder="************************"
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
