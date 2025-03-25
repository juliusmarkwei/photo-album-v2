import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/app/utils/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { AppDataSource } from "@/app/utils/db/data-source";
import { Photo } from "@/app/utils/db/entity/Photo";

const BUCKETNAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const AWSREGION = process.env.NEXT_PUBLIC_AWS_REGION;

export const POST = async (request: NextRequest) => {
    try {
        const dataSource = await AppDataSource();

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;

        // convert file to buffer
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const imageKey = `uploads/${category || "Other"}/${new Date()}-${
            name || file.name
        }`;
        const uploadParams = {
            Bucket: BUCKETNAME,
            Key: imageKey,
            Body: fileBuffer,
            ContentType: file.type,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const newPhoto = new Photo();
        newPhoto.name = name;
        newPhoto.category = category;
        newPhoto.description = description;
        newPhoto.url = `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(
            imageKey
        )}`;

        const photoRepository = dataSource.getRepository(Photo);
        await photoRepository.save(newPhoto);

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
