import { memo, useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.jsx';
import axiosRequest from "./../../utils/axios-request";
import { toastSuccess, toastWarning } from './../ToastNotif';
import TaskList from "./components/Task";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input.jsx';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { LogOut } from "lucide-react";
import  { useAuth } from "./../../context/AuthContext"

const Index = memo(function Index() {
    const [tasks, setTasks] = useState(null)
    const [error, setError] = useState(null)
    const [isFormHidden, setIsFormHidden] = useState(true)
    const contentRef = useRef(null);
    const buttonRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");
    const [buttonMaxHeight, setButtonMaxHeight] = useState("0px");
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { logout } = useAuth();

    useEffect(() => {
        if (isFormHidden) {
            setMaxHeight("0px");
            setButtonMaxHeight(buttonRef.current.scrollHeight + "px");
        } else {
            setMaxHeight(contentRef.current.scrollHeight + "px");
            setButtonMaxHeight("0px");
        }
    }, [isFormHidden]);

    const getTasks = async () => {
        try{
            const response = await axiosRequest.get("tasks");
            setTasks(response.data)
        } catch (err) {
            setTasks([])
            setError(err.response.data.message)
            toastWarning(err.response.data.message)
        }
    }

    const handleSubmit = async (e) => {
        setIsSubmitting(true)
        e.preventDefault(); 
        try{
            const FD = new FormData(e.target)
            const response = await axiosRequest.post("tasks", FD);

            await getTasks()
            toastSuccess(response.data.message)
            formRef.current?.reset();
            setIsFormHidden(!isFormHidden)
        } catch (err) {
            toastWarning(err.response.data.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

	return (
        <>
            <Button variant="ghost" className="cursor-pointer absolute top-4 right-4" onClick={ () => { logout() } }>Sign Out <LogOut /></Button>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-sans">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <Card className="border-0 shadow-none">
                            <CardHeader className="justify-items-center-safe">
                                <CardTitle className="font-sans font-bold">Task Management</CardTitle>
                                <CardDescription className="font-sans">
                                    Easily manage your task here.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-hidden transition-all duration-300">
                                    <div
                                        ref={buttonRef}
                                        style={{ maxHeight: buttonMaxHeight }}
                                        className="transition-all duration-200 overflow-hidden">
                                            
                                        <Button
                                            onClick={() => setIsFormHidden(!isFormHidden)}
                                            variant="outline"
                                            className="transition cursor-pointer w-100 mb-2 font-sans font-bold"
                                        >
                                            Add Task
                                        </Button>
                                    </div>

                                    {/* Animated container */}
                                    <div
                                        ref={contentRef}
                                        style={{ maxHeight }}
                                        className="transition-all duration-200 overflow-hidden"
                                    >
                                        <form
                                            ref={formRef}
                                            onSubmit={(e) => {
                                                handleSubmit(e)
                                            }}
                                            className="mb-3"
                                        >
                                            <FieldGroup>
                                                <Field>
                                                    <FieldLabel
                                                        htmlFor="title"
                                                        className="font-sans font-bold"
                                                    >
                                                        Title
                                                    </FieldLabel>
                                                    <Input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        placeholder="Task 1"
                                                        required
                                                        className="font-sans"
                                                    />
                                                </Field>

                                                <Field>
                                                    <div className="flex items-center">
                                                        <FieldLabel
                                                            htmlFor="password"
                                                            className="font-sans font-bold"
                                                        >
                                                            Description
                                                        </FieldLabel>
                                                    </div>
                                                    <Textarea
                                                        className="font-sans" placeholder="Type description here." id="description" name="description" required />
                                                </Field>

                                                <Field>
                                                    <Button
                                                        type="submit"
                                                        className="w-full cursor-pointer font-sans font-bold"
                                                        disabled={ isSubmitting ? true:false }  
                                                    >
                                                        { isSubmitting ? "Please Wait...":"Create Task" }
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            formRef.current?.reset();
                                                            setIsFormHidden(!isFormHidden)
                                                        }}
                                                        variant="outline"
                                                        type="button"
                                                        className="w-full cursor-pointer font-sans font-bold"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Field>
                                            </FieldGroup>
                                        </form>
                                    </div>
                                </div>

                                {/* Tasks */}
                                <TaskList tasks={tasks} error={error} getTasks={getTasks} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Index;
