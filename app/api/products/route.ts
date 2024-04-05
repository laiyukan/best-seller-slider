import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const productsFilePath = path.join(
  process.cwd(),
  "/public/mocks/products.json"
);

export async function GET() {
  try {
    const productsStr = await fsPromises.readFile(productsFilePath, "utf-8");
    const productsJson = JSON.parse(productsStr);
    return NextResponse.json(productsJson);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No products found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}
