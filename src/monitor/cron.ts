import cron from "node-cron";

import { monitorWorker } from "./monitor-worker";

export function startCron() {
    cron.schedule(
        "* * * * *",
        async () => {
            await monitorWorker();
        }
    );
}