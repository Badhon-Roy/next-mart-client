"use client"
import { NMTable } from "@/components/ui/core/NMTable";
import CreateBrandModal from "./CreateBrandModal";
import { Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { deleteBrand } from "@/services/Brand";
import { toast } from "sonner";
import Image from "next/image";
import { IBrand } from "@/types";

type TBrandsProps = {
    brands: IBrand[]
}

const ManageBrands = ({ brands }: TBrandsProps) => {

    const handleDelete = async (data: IBrand) => {
        try {
            const res = await deleteBrand(data?._id)
            if (res?.success) {
                toast.success(res?.message || "Successfully Delete Brand")
            } else if (res?.error) {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };

    const columns: ColumnDef<IBrand>[] = [
        {
            accessorKey: "name",
            header: () => <div>Brand Name</div>,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.logo}
                        alt={row.original.name}
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full border"
                    />
                    <span className="truncate">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "isActive",
            header: () => <div>isActive</div>,
            cell: ({ row }) => (
                <div>
                    {row.original.isActive ? (
                        <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
                            True
                        </p>
                    ) : (
                        <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
                            False
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: () => <div>Action</div>,
            cell: ({ row }) => (
                <button
                    className="text-red-500"
                    title="Delete"
                    onClick={() => handleDelete(row.original)}
                >
                    <Trash className="w-5 h-5" />
                </button>
            ),
        },
    ];
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h2 className="text-3xl font-bold">Manage Brand</h2>
                <CreateBrandModal />
            </div>
            <div className="mt-4">
                <NMTable data={brands} columns={columns} />
            </div>
        </div>
    );
};

export default ManageBrands;