import { prisma } from "@/prisma/clients"
import { consumer, TOPICS } from "@/configs/kafka.config"
import { INotification, INotificationRequestPayload } from "@/interfaces"

const createNotification = async (data: Omit<INotification, "id">) => {
  return await prisma.mst_notification.create({
    data: {
      ...data,
      isRead: false,
    },
  })
}

const createProjectChange = async (payload: INotificationRequestPayload) => {
  await createNotification({
    userId: payload.userId,
    type: "project",
    message: `Project ${payload.projectName} has been ${payload.action}`,
    isRead: false,
  })
}

const createTaskChange = async (payload: INotificationRequestPayload) => {
  await createNotification({
    userId: payload.userId,
    type: "task",
    message: `Task ${payload.taskName} has been ${payload.action}!`,
    isRead: false,
  })
}

const processMessage = async (topic: string, payload: INotificationRequestPayload) => {
  const handlers = {
    [TOPICS.PROJECT_CHANGES]: createProjectChange,
    [TOPICS.TASK_CHANGES]: createTaskChange,
  }

  const handler = handlers[topic as keyof typeof handlers]

  if (handler) {
    await handler(payload)
  }
}

const startKafkaConsumer = async () => {
  try {
    await consumer
      .connect()
      .then(() => console.log(`[kafka] - customer connection success`))
      .catch(() => console.log("[kafka] - consumer connection failed"))

    await consumer.subscribe({
      topics: [TOPICS.PROJECT_CHANGES, TOPICS.TASK_CHANGES],
    })

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const messageValue = message.value?.toString()
        if (!messageValue) return

        const payload = JSON.parse(messageValue) as INotificationRequestPayload

        await processMessage(topic, payload)
      },
    })
  } catch (error) {
    throw {
      code: 500,
      status: false,
      error: error,
      data: null,
    }
  }
}

export default startKafkaConsumer