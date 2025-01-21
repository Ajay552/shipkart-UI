import { FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardDescription,
    CardFooter,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import authService from "@/services/authService/authService";
import { RoutePath } from "@/routes";

const SignUp: FC = () => {
    const navigate = useNavigate();

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!name) {
            toast.error('Please enter name');
            return;
        }

        if(!email) {
            toast.error('Please enter email');
            return;
        }

        if(!password) {
            toast.error('Please enter password');
            return;
        }

        const data = await authService.signup({ fullName: name, email: email, password: password });

        if(data) {
            navigate(RoutePath.HOME);
        }
    }

    return (
        <div className={"flex justify-center items-center h-screen w-screen"}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>It's quick and easy.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    <CardContent>
                        <div className="grid w-full items-center gap-6">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Full name</Label>
                                <Input id="name" type="text" placeholder="Enter your name" name="name" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" name="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="New password" name="password" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button>Sign Up</Button>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link className="underline underline-offset-4" to={'/'}>Login</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default SignUp;