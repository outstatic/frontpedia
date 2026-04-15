import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    {
      path: "/submit",
      method: "POST",
    },
    {
      path: "/subscribe",
      method: "POST",
    },
  ],
});
