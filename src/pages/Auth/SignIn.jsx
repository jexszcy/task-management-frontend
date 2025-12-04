import { Button } from '@/components/ui/button.jsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toastSuccess, toastWarning } from './../ToastNotif';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Separator } from '@/components/ui/separator';
import Cookies from "js-cookie";
import axiosRequest from "./../../utils/axios-request"
import { useAuth } from '../../context/AuthContext';

const SignIn = memo(function SignIn() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)

        try {
            const FD = new FormData(e.target)
            const response = await axiosRequest.post("auth/sign-in", FD);
            toastSuccess(response.data.message)
            Cookies.set("access_token", response.data.access_token, {
                expires: 7,
                secure: true,
                sameSite: "strict",
            });
            setUser(response.data.user)
            navigate("/tasks");

        } catch (err) {
            toastWarning(err.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    };

	return(
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-sans">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <Card className="border-0 shadow-none">
                            <CardHeader className="justify-items-center-safe">
                                <CardTitle className="font-sans font-bold">Login to your account</CardTitle>
                                <CardDescription className="font-sans">
                                    Enter your email and password below to login to your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => {
                                    handleSubmit(e)
                                }}>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="email" className="font-sans font-bold">Email</FieldLabel>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="johndoe@example.com"
                                                
                                                required
                                                className="font-sans"
                                            />
                                        </Field>
                                        <Field>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password" className="font-sans font-bold">Password</FieldLabel>
                                            </div>
                                            <Input name="password" id="password" type="password"  placeholder="••••••••" required  className="font-sans"/>
                                        </Field>
                                        <Field>
                                            <Button type="submit" className="w-full cursor-pointer font-sans font-bold" disabled={ isSubmitting ? true:false }>{ isSubmitting ? "Please Wait...":"Sign In" }</Button>
                                            <Separator />
                                            <FieldDescription className="text-center font-sans flex flex-row gap-1 justify-center-safe">
                                                Don&apos;t have an account?
                                                <a href="#" onClick={ () => { navigate("/auth/sign-up", { replace: true }) } } className="font-sans text-sm">Sign Up</a> 
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
});

export default SignIn;
