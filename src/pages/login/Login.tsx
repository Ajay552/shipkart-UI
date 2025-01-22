import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoutePath } from "@/routes";
import authService from "@/services/authService/authService";
import { FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Toaster } from "@/components/ui/toaster";
import { toast } from "sonner";

const Login: FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!email) {
            toast.error('Please enter email');
            return;
        }

        if(!password) {
            toast.error('Please enter password');
            return;
        }

        const data = await authService.login({ email, password });
        if(data) {
            navigate(RoutePath.HOME);
        }
    }

    return (
        <div className={"flex justify-center items-center h-screen w-screen"}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter your email" type="email" name="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter your password" type="password" name="password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit">Login</Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link className="underline underline-offset-4" to={'/signup'}>Sign Up</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Login;