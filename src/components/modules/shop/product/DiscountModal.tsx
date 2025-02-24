"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addFlashSale } from "@/services/FlashSale";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type DiscountIdsProps = {
    selectedIds : string[];
    setSelectedIds: Dispatch<SetStateAction<[] | string[]>>
}

const DiscountModal = ({selectedIds , setSelectedIds} : DiscountIdsProps) => {

    const form = useForm()
    const router = useRouter()

    const { formState: { isSubmitting } } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const modifiedData = {
            products : [...selectedIds],
            discountPercentage: parseFloat(data?.discountPercentage)
        }
        try {
            const res = await addFlashSale(modifiedData)
            if(res.success){
                toast.success(res?.message || "Successfully add flash sale")
                setSelectedIds([])
                router.push('/user/shop/products')
            } else if(res?.errorSources)(
                toast.success(res?.errorSources[0]?.message || "Something went wrong!")
            )
        } catch (error) {

            console.log(error);
            toast.error("Something went wrong")
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!selectedIds?.length}>Add Flash Sale</Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">Add Flash Sale</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="discountPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Percentage</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Discount Percentage" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="mt-5 w-full"
                            >
                                {
                                    isSubmitting ? "Adding..." : "Add"
                                }
                            </Button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountModal;