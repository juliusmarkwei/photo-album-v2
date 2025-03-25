import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { getDbCredentials } from "../parameterStoreConfig";

export const AppDataSource = async () => {
    const { username, password, host, dbName, port } = await getDbCredentials();
    return new DataSource({
        type: "postgres",
        host,
        port: Number(port),
        username,
        password,
        database: dbName,
        synchronize: false,
        logging: false,
        entities: [Photo],
        ssl: {
            rejectUnauthorized: false,
        },
        migrations: [],
        subscribers: [],
    });
};
