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
    },
});

export default _schema;
