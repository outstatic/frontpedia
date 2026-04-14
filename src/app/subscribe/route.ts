import { subscribe } from "@/lib/subscribe";

export async function POST(request: Request) {
  return await subscribe(request);
}
