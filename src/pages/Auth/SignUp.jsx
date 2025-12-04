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
import axiosRequest from "./../../utils/axios-request"

const SignUp = memo(function SignUp() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        try {
            const FD = new FormData(e.target)
            const response = await axiosRequest.post("auth/sign-up", FD);
            toastSuccess(response.data.message)
            navigate("/");
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
                                <CardTitle className="font-sans font-bold">Create your account</CardTitle>
                                <CardDescription className="font-sans">
                                    Enter your name, email and password below to create your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => {
                                    handleSubmit(e)
                                }}>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="name" className="font-sans font-bold">Name</FieldLabel>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                
                                                required
                                                className="font-sans"
                                            />
                                        </Field>
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
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password_confirmation" className="font-sans font-bold">Confirm Password</FieldLabel>
                                            </div>
                                            <Input name="password_confirmation" id="password_confirmation" type="password"  placeholder="••••••••" required  className="font-sans"/>
                                        </Field>
                                        <Field>
                                            <Button type="submit" className="w-full cursor-pointer font-sans font-bold" disabled={ isSubmitting ? true:false }>{ isSubmitting ? "Please Wait...":"Sign Up" }</Button>
                                            <Separator />
                                            <FieldDescription className="text-center font-sans flex flex-row gap-1 justify-center-safe">
                                                Already have an account?
                                                <a href="#" onClick={ () => { navigate("/", { replace: true }) } } className="font-sans text-sm">Sign In</a> 
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

export default SignUp;
