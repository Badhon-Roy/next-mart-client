"use client"
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploder";
import ImagePreviewer from "@/components/ui/core/NMImageUploder/ImagePreviewer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBrand } from "@/services/Brand";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateBrandModal = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([])
    const [imagePreview, setImagePreview] = useState<string[] | []>([])

    const form = useForm()

    const { formState: { isSubmitting }, reset } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data))
            formData.append("logo", imageFiles[0] as File)
            const res = await createBrand(formData)
            if (res?.success) {
                toast.success(res?.message || "Successfully Create Category")
                reset();
            } else if (res?.error) {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error) {

            console.log(error);
            toast.error("Something went wrong")
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Brand</Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">Create Brand</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-center">
                                {imagePreview.length > 0 ? <ImagePreviewer
                                    imagePreview={imagePreview}
                                    setImagePreview={setImagePreview}
                                    setImageFiles={setImageFiles}
                                    className="mt-8" />
                                    :
                                    <div className="mt-8">
                                        <NMImageUploader
                                            setImageFiles={setImageFiles}
                                            setImagePreview={setImagePreview}
                                            label="Upload Logo"
                                        /></div>}
                            </div>


                            <Button
                                type="submit"
                                className="mt-5 w-full"
                            >
                                {
                                    isSubmitting ? "Creating..." : "Create"
                                }
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBrandModal;