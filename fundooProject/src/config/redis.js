import { createClient } from "redis";
import logger from './logger';

export const client = createClient({
    host: process.env.APP_HOST,
    port: process.env.REDIS_PORT,
});

export const redisConnect = async (req, res, next) => {
    try {
        await client.connect();
        logger.info("Redis Connected");
    } catch (error) {
        console.log("Redis connection error:", error);
        res.status(error.status || 500).json({ message: error.message || "Error connecting to redis-server" })
    }
}


