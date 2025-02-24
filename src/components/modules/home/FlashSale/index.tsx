import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllFlashSale } from "@/services/FlashSale";
import { IProduct } from "@/types";
import Link from "next/link";
import FlashSaleCountDown from "./FlashSaleCountDown";

const FlashSale = async () => {
  const { data: products } = await getAllFlashSale();

  return (
    <div className="bg-white bg-opacity-50 py-10">
      <NMContainer>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
            <h2 className="font-bold text-2xl">Flash Sale</h2>
            <FlashSaleCountDown/>
            </div>
            <Link href="/products">
              <Button variant="outline" className="rounded-full">
                All Collection
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8 my-5">
            {products?.slice(0,4)?.map((product: IProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
      </NMContainer>
    </div>
  );
};

export default FlashSale;