import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["localhost:9092"],
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: "notification-group" })

export const TOPICS = {
    PROJECT_CHANGES: "project-changes",
    TASK_CHANGES: "task-changes",
} as const
