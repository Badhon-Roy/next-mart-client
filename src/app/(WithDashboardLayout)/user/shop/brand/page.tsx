"use client"
import ManageBrands from "@/components/modules/shop/brand";
import { useUser } from "@/context/UserContext";
import { getAllBrands } from "@/services/Brand";
import { useEffect, useState } from "react";


const ProductBrandPage = () => {
      const { user } = useUser();
        const [brands, setBrands] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        useEffect(() => {
            const fetchBrands = async () => {
                try {
                    setLoading(true);
                    const response = await getAllBrands(user?.userId as string);
                    setBrands(response?.data || []);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchBrands();
        }, [user?.userId])
    
        if (loading) return <p>Loading Brands...</p>;
        if (error) return <p>Error: {error}</p>
    return (
        <div>
            <ManageBrands brands={brands}/>
        </div>
    );
};

export default ProductBrandPage;