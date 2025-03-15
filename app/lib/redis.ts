import { Redis } from "@upstash/redis";
import { RedisConfig } from "./types/redis.types";

const getRedisConfig = (): RedisConfig => {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL environment variable is not defined");
  }
  if (!process.env.REDIS_TOKEN) {
    throw new Error("REDIS_TOKEN environment variable is not defined");
  }
  return {
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN
  }
}

// Using Upstash Redis instance to store session information
export const redis = new Redis(getRedisConfig());

// utilization examples:
// await redis.set("foo", "bar");
// const value = await redis.get("foo");
// console.log(value); // bar