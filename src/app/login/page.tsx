import LoginBackground from "@/components/LoginBackground";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getAnimalIcons } from "@/lib/serverUtils";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  const icons = getAnimalIcons();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <LoginBackground icons={icons} />
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-xl">
          Login to your account
          <CardDescription>
            Please enter your email and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
