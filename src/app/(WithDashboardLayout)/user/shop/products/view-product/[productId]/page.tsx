import { getSingleProduct } from "@/services/Product";
import { IProduct } from "@/types";
import Image from "next/image";

const ViewProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params;
    const { data: product } = await getSingleProduct(productId);
    
    const {
        name,
        description,
        price,
        stock,
        weight,
        availableColors,
        specification,
        keyFeatures,
        imageUrls
    } = product as IProduct;
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex gap-4 mb-4">
                {
                    imageUrls?.map((image, index) => (
                        <div key={index}  >
                            <Image  className="border"  src={image} alt="image" width={200} height={200} />
                        </div>
                    ))
                }
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
            <p className="text-gray-600 text-lg mb-2">{description}</p>
            <div className="border-b-2 my-4"></div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xl font-semibold">Price: <span className="text-primary">{price}tk</span></p>
                    <p className="text-lg">Stock: <span className="text-green-600">{stock} available</span></p>
                    <p className="text-lg">Weight: <span className="text-gray-700">{weight} kg</span></p>
                    <p className="text-lg">Available Colors:</p>
                    <div className="flex gap-2 mt-2">
                        {availableColors.map((color, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">{color}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Specifications</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>Processor: {specification.processor}</li>
                        <li>RAM: {specification.ram}</li>
                        <li>Storage: {specification.storage}</li>
                        <li>Display: {specification.display}</li>
                    </ul>
                </div>
            </div>
            
            <div className="border-b-2 my-4"></div>
            
            <div>
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewProductPage;
