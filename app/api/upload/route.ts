import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { buildPathname } from "@/app/utils/listImages";

export const POST = async (request: NextRequest) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;

        const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
        const unique = Date.now().toString(36);
        const pathname = buildPathname(
            category || "Other",
            name || file.name,
            unique,
            ext
        );

        await put(pathname, file, {
            access: "public",
            addRandomSuffix: false,
            contentType: file.type,
        });

        return NextResponse.json(
            { message: "File uploaded successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error uploading file" },
            { status: 500 }
        );
    }
};
