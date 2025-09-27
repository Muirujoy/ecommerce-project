
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ProductResp = {
  id: string;
  title: string;
  price: number;
  images: string[];
  url?: string;
  // add fields you need
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query = "shoes", page = "1" } = req.query;

  try {
    const response = await axios.get("https://real-time-amazon-data.p.rapidapi.com/search", {
      params: {
        query: String(query),
        page: Number(page),
        // any other params this API supports
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    });

    const productsRaw = response.data?.data?.products || [];


    const products: ProductResp[] = productsRaw.map((p: any) => ({
      id: p.asin ?? p.id ?? String(Math.random()), // unique id
      title: p.product_title ?? p.title ?? "Untitled",
      price: Number((p.product_price || "0").toString().replace(/[^0-9.]/g, "")) || 0,
      images: p.product_photo ? [p.product_photo] : [],
      url: p.product_url || p.url || undefined,
    }));

    res.status(200).json({ products });
  } catch (error: any) {
    console.error("RapidAPI fetch error:", error?.response?.data ?? error.message ?? error);
    res.status(502).json({ products: [], message: "Failed to fetch products" });
  }
}
