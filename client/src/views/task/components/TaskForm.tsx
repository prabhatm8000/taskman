import apiClient from "@/apiCalls/apiClient";
import Indicator from "@/components/Indicator";
import LoadingCircle from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useTaskStore from "@/store/task/store";
import type { BasicTaskType } from "@/store/task/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 600;

const TaskForm = () => {
    const {
        tasks,
        addTask,
        updateTask,
        loading,
        setLoading,
        setError,
        selectedTask,
        setSelectedTask,
    } = useTaskStore();

    const [formValues, setFormValues] = useState<BasicTaskType>({
        title: "",
        description: "",
        status: "PENDING",
    });
    const [titleLength, setTitleLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);

    useEffect(() => {
        setTitleLength(formValues.title.length);
        setDescriptionLength(formValues.description.length);
    }, [formValues]);

    useEffect(() => {
        if (!selectedTask) return;
        setFormValues(selectedTask);
    }, [selectedTask]);

    useEffect(() => {
        handleClose();
    }, [tasks]);

    const handleCreate = async (data: BasicTaskType) => {
        setLoading(true);
        try {
            const response = await apiClient.taskAPICalls.createTask(data);
            if ("success" in response) {
                setError(response);
                setLoading(false);
                return;
            }
            addTask(response);
            setLoading(false);
            toast.success("Task created successfully");
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
            setLoading(false);
        }
    };

    const handleUpdate = async (data: BasicTaskType) => {
        const taskId = selectedTask?._id;
        if (!taskId) return;
        setLoading(true);
        try {
            const response = await apiClient.taskAPICalls.updateTask(
                taskId,
                data
            );
            if ("success" in response) {
                setError(response);
                setLoading(false);
                return;
            }
            updateTask(taskId, response);
            setLoading(false);
            toast.success("Task updated successfully");
        } catch (error: any) {
            setError({
                message: error.message,
                success: false,
            });
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const taskId = selectedTask?._id;
        if (taskId) handleUpdate(formValues);
        else handleCreate(formValues);
        handleClose();
    };

    const handleClose = () => {
        setFormValues({
            title: "",
            description: "",
            status: "PENDING",
        });
        setSelectedTask(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-xs"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl">
                    {selectedTask?._id ? "Update Task" : "Create Task"}
                </h3>
                {selectedTask?._id && (
                    <Button
                        variant={"destructive"}
                        className="rounded-full"
                        size={"icon"}
                        onClick={handleClose}
                    >
                        <X />
                    </Button>
                )}
            </div>

            <div>
                <Input
                    type="text"
                    value={formValues.title}
                    onChange={(e) =>
                        setFormValues({ ...formValues, title: e.target.value })
                    }
                    placeholder="Title"
                    maxLength={MAX_TITLE_LENGTH}
                />
                <span
                    className={`float-right text-xs ${
                        titleLength > MAX_TITLE_LENGTH * 0.9
                            ? "text-destructive"
                            : "text-muted-foreground"
                    }`}
                >
                    {titleLength}/{MAX_TITLE_LENGTH}
                </span>
            </div>
            <div>
                <Textarea
                    value={formValues.description}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            description: e.target.value,
                        })
                    }
                    placeholder="Description"
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    className="resize-none h-52"
                />
                <span
                    className={`float-right text-xs ${
                        descriptionLength > MAX_DESCRIPTION_LENGTH * 0.9
                            ? "text-destructive"
                            : "text-muted-foreground"
                    }`}
                >
                    {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
                </span>
            </div>
            <Select
                value={formValues.status}
                onValueChange={(e) =>
                    setFormValues({
                        ...formValues,
                        status: e as BasicTaskType["status"],
                    })
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING">
                        <Indicator className="bg-red-500 animate-none" />
                        <span>Pending</span>
                    </SelectItem>
                    <SelectItem value="COMPLETED">
                        <Indicator className="bg-green-500 animate-none" />
                        <span>Completed</span>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button disabled={loading} type="submit">
                {loading && <LoadingCircle />}
                <span>{selectedTask?._id ? "Update" : "Create"}</span>
            </Button>
        </form>
    );
};

export default TaskForm;
