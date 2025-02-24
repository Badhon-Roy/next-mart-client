"use client"
import ManageCategories from "@/components/modules/shop/category";
import { useUser } from "@/context/UserContext";
import { getAllCategories } from "@/services/Category";
import { useEffect, useState } from "react";


const ProductCategoryPage = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await getAllCategories(user?.userId as string);
                setCategories(response?.data || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [user?.userId])

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>
    return (
        <div>
            <ManageCategories categories={categories} />
        </div>
    );
};

export default ProductCategoryPage;