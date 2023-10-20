import { CommonReqHeader } from "@/request/request-defined";

export async function GET(request: Request) {
  const res = await fetch("http://192.168.38.174:18080/api/game/list", {
    headers: CommonReqHeader,
    cache: "no-store",
  });
  return Response.json(await res.json());
}
