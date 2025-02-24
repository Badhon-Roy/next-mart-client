import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

type TImageUploaderProps = {
    label? : string;
    className? : string;
    setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
    setImagePreview: Dispatch<SetStateAction<[] | string[]>>
}

const NMImageUploader = ({ label, className,setImageFiles ,setImagePreview}: TImageUploaderProps) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        setImageFiles((prev) => [...prev, file])
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        }
        e.target.value = ''

    }

    return (
        <div className={cn("flex flex-col justify-center w-full gap-4", className)}>
            <Input
                onChange={handleImageChange}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload" />
            <label
                htmlFor="image-upload"
                className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
            >
                {label}
            </label>
        </div>
    );
};

export default NMImageUploader;