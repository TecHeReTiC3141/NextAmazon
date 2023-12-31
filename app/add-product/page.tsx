import {Metadata} from "next";
import prisma from "@/app/lib/db/prisma"
import {redirect} from "next/navigation";
import SubmitBtn from "@/app/ui/components/SubmitBtn";


export const metadata: Metadata = {
    title: "Add product",
}

async function addProduct(formData: FormData) {
    "use server"
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const name = formData.get("name")?.toString() || "",
        description = formData.get("description")?.toString() || "",
        imageUrl = formData.get("image-url")?.toString() || "",
        price = Number(formData.get("price") || 0);
    if (!name || !description || !price || !imageUrl) {
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: {
            name, description, imageUrl, price
        }
    });
    redirect("/");
}

export default async function CreateProductPage() {
    return (
        <div className="min-h-screen ">
            <h1 className="text-xl mb-4 text-center font-bold">Add product</h1>
            <form action={addProduct} className="form-control w-full">
                <input required
                       type="text"
                       name="name"
                       id="name"
                       placeholder="Name here"
                       className="input input-bordered mb-3 last:mb-0"/>
                <textarea
                    name="description"
                    id="description" cols={26} rows={10}
                    placeholder="Description here"
                    required
                    className="textarea textarea-bordered mb-3 last:mb-0"
                ></textarea>
                <input required
                       type="url"
                       name="image-url"
                       id="image-url"
                       placeholder="Image URL"
                       className="input input-bordered mb-3 last:mb-0"/>
                <input required
                       type="number"
                       name="price"
                       id="price"
                       placeholder="Price"
                       className="input input-bordered mb-3 last:mb-0"/>
                <SubmitBtn className="btn-block">Add product</SubmitBtn>
            </form>
        </div>
    );
}