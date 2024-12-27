import { init, i } from "@instantdb/react";

export const db = init({
  appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344",
  schema: i.schema({
    entities: {
      contacts: i.entity({
        name: i.string(),
      }),
      messages: i.entity({
        contact: i.string(),
        text: i.string(),
        timestamp: i.string(),
      }),
    },
  }),
});
