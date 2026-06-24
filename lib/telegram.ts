import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = Number(
  process.env.TELEGRAM_API_ID
);

const apiHash =
  process.env.TELEGRAM_API_HASH || "";

const session =
  process.env.TELEGRAM_SESSION || "";

export const client =
  new TelegramClient(
    new StringSession(session),
    apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );