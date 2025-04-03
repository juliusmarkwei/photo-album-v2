/* eslint-disable @typescript-eslint/no-unused-vars */
import * as AWS from "aws-sdk";

const secretsManager = new AWS.SecretsManager({
    region: "us-east-1",
});

const getSecret = async (secretId: string) => {
    try {
        const data = await secretsManager
            .getSecretValue({ SecretId: secretId })
            .promise();
        return data.SecretString;
    } catch (error) {
        throw new Error("Unable to retrieve secret");
    }
};

export const getDbCredentials = async () => {
    const secretString = await getSecret("julius-photoalbum-credentials");
    const { username, password, dbname, port, host } = JSON.parse(secretString);
    return {
        username,
        password,
        host,
        dbName: dbname,
        port: port,
    };
};
