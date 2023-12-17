import prisma from "@/app/lib/db/prisma";
import Link from "next/link";
import ProductCard from "@/app/ui/components/ProductCard";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"},
  });

  return (
      <div>
        {products.map(prod => (
            <ProductCard product={prod} key={prod.id}/>
        ))}
      </div>
  )
}
