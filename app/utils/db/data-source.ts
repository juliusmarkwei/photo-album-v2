import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { getDbCredentials } from "../secretManagerConfig";

const NODE_ENV = process.env.NODE_ENV;

export const AppDataSource = async () => {
    let dbCredentials;

    if (NODE_ENV === "development") {
        // Local database credentials
        dbCredentials = {
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            dbName: "photoalbum",
        };
    } else {
        // Fetch credentials from secret manager for other environments
        dbCredentials = await getDbCredentials();
    }

    const { host, port, username, password, dbName } = dbCredentials;

    return new DataSource({
        type: "postgres",
        host,
        port,
        username,
        password,
        database: dbName,
        synchronize: true,
        logging: false,
        entities: [Photo],
        ssl: NODE_ENV === "development" ? false : { rejectUnauthorized: false },
        migrations: [],
        subscribers: [],
        migrationsRun: true,
    });
};
