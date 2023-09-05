import { cleanEnv, port, str, host } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    PORT: port(),
    POSTGRES_HOST: host(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
  });
}

export default validateEnv;
