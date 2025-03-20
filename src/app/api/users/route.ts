import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {  
    try {
        const filePath = path.join(process.cwd(), "public", "users.json");

        // Ensure the file exists before reading
        const data = await fs.readFile(filePath, "utf-8");
        const users = JSON.parse(data);

        return NextResponse.json(users);  
    } catch (error) {
        console.error("Error loading JSON:", error);
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
    }
}
