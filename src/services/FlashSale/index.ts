"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addFlashSale = async (data: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {
            method: "POST",
            headers: {
                Authorization : (await cookies()).get('accessToken')!.value,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        revalidateTag("FLASH_SALE")
        return res.json();
    } catch (error: any) {
        return Error(error)
    }
}

export const getAllFlashSale = async ()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`,{
            next : {
                tags : ["FLASH_SALE"]
            }
        })
        return res.json();
    } catch (error : any) {
        return Error(error)
    }
}