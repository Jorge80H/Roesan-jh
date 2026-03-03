import { i } from "@instantdb/core";

const _schema = i.schema({
    entities: {
        contact_messages: i.entity({
            name: i.string(),
            phone: i.string(),
            email: i.string().indexed(),
            message: i.string(),
            createdAt: i.number().indexed(),
        }),
        chat_sessions: i.entity({
            status: i.string(), // 'active', 'closed', 'archived'
            userName: i.string().optional(),
            userPhone: i.string().optional(),
            createdAt: i.number(),
            updatedAt: i.number(),
        }),
        messages: i.entity({
            role: i.string(), // 'user', 'assistant', 'system'
            content: i.string(),
            createdAt: i.number().indexed(),
        }),
    },
    links: {
        chatSessionMessages: {
            forward: {
                on: "chat_sessions",
                has: "many",
                label: "messages",
            },
            reverse: {
                on: "messages",
                has: "one",
                label: "session",
            },
        },
    },
});

export default _schema;
