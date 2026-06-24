import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

console.log(process.cwd());
console.log(process.env.TELEGRAM_API_ID);
console.log(process.env.TELEGRAM_API_HASH);
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input";

const apiId = Number(
  process.env.TELEGRAM_API_ID
);

const apiHash =
  process.env.TELEGRAM_API_HASH || "";

const client =
  new TelegramClient(
    new StringSession(""),
    apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );

(async () => {
  await client.start({
    phoneNumber: async () =>
      await input.text(
        "Phone Number:"
      ),

    password: async () =>
      await input.text(
        "2FA Password:"
      ),

    phoneCode: async () =>
      await input.text(
        "Code:"
      ),

    onError: console.log,
  });

  console.log(
    client.session.save()
  );

  process.exit(0);
})();