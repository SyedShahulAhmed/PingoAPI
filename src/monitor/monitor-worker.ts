import Endpoint from "@/models/endpoint.model";
import { checkEndpoint } from "./check-endpoint";

export async function monitorWorker() {
  try {
    const endpoints = await Endpoint.find({});

    for (const endpoint of endpoints) {
      await checkEndpoint(endpoint);
    }
  } catch (error) {
    throw error;
  }
}
