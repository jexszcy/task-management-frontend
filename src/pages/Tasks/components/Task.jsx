import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toastSuccess, toastWarning } from './../../ToastNotif';
import axiosRequest from "./../../../utils/axios-request";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash } from "lucide-react";
import CheckboxComponent from "./CheckboxComponent";

const Task = memo(function Task({ tasks, error, getTasks }) {
    if(tasks === null){
		return <p className="font-semibold font-sans flex align-items-center justify-center">Loading Tasks.</p>;
    }

    if(error){
        return <p className="font-semibold font-sans flex align-items-center justify-center text-red-500">Error loading tasks: {error}</p>;
    }

	if (!tasks || tasks.length === 0) {
		return <p className="font-semibold font-sans flex align-items-center justify-center">No Tasks yet.</p>;
	}
    const [open, setOpen] = useState(false);
    const [ID, setID] = useState(null);

	const handleDelete = async (id) => {
        try{
            const response = await axiosRequest.delete(`tasks/${id}`);
            toastSuccess(response.data.message)
            await getTasks();
        }catch(err){
            toastWarning(err.response.data.message)
        } finally {
            setOpen(false)

        }
	};

	return (
		<div className="space-y-2 mt-4">
			{tasks.map((task, index) => (
				<Card
					key={index}
					className="overflow-hidden hover:overflow-visible transition relative group px-0 py-2 rounded-md"
				>
					<CardContent className="flex items-start gap-4">
						<CheckboxComponent initValue={task.is_completed} id={task.id} />

						<div className="flex-1 overflow-hidden max-h-6 group-hover:max-h-40 transition-[max-height] duration-300 ease-in-out">
                            <p className="font-bold font-sans text-[1rem] mt-0 pt-0">{task.title}</p>
                            <p className="text-gray-500 font-sans text-[.8rem] mt-2">
                                {task.description ?? "--"}
                            </p>
                        </div>

						<Button
							variant="ghost"
							size="xsm"
							className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 transition cursor-pointer text-red-600"
							onClick={() => { setOpen(true); setID(task.id); }}
						>
							<Trash className="h-4 w-4" />
						</Button>

					</CardContent>
				</Card>
			))}

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this task.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" onClick={ () => {
                            setOpen(false)
                        } }>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={ () => {
                            handleDelete(ID)
                        } }>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
		</div>
	);
});

export default Task;
