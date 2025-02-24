"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const getAllProducts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
            next: {
                tags: ["PRODUCT"]
            }
        })
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`, {
            next: {
                tags: ["PRODUCT"]
            }
        })
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}

export const addProduct = async (data: FormData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
            method: "POST",
            headers: {
                Authorization: ((await cookies()).get('accessToken'))!.value
            },
            body: data
        })
        revalidateTag("PRODUCT")
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}
export const updateProduct = async (
    productData: FormData,
    productId: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: productData,
            }
        );
        revalidateTag("PRODUCT");
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: ((await cookies()).get('accessToken'))!.value
            }
        })
        revalidateTag("PRODUCT")
        return await res.json();
    } catch (error: any) {
        return Error(error)
    }
}
