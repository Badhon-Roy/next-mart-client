import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button";
import { X } from "lucide-react";


type TImagePreviewerProps = {
    imagePreview: [] | string[];
    className?: string;
    setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
    setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
}

const ImagePreviewer = ({ imagePreview, className, setImagePreview, setImageFiles }: TImagePreviewerProps) => {

    const handleRemove = (index : number) => {
        setImageFiles((prev) => prev.filter((_, idx) => idx !== index))
        setImagePreview((prev) => prev.filter((_, idx) => idx !== index))
    }

    return (
        <div className={className}>
            {
                imagePreview?.map((preview, index) => (
                    <div key={index} className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300">
                        <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full" />
                        <Button type="button" size='sm' onClick={()=>handleRemove(index)} className="bg-red-300 hover:bg-red-500 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))
            }
        </div>
    );
};

export default ImagePreviewer;