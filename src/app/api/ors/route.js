export async function POST(req) {
  const body = await req.json();

  const res = await fetch(
    "https://api.openrouteservice.org/v2/directions/foot-walking",
    {
      method: "POST",
      headers: {
        "Authorization": process.env.ORS_API_KEY,
        // "Authorization": "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjQxZTBlYmVhMDBhMjQ4NDVhNjZlMzlmMDA1YWYwMTVmIiwiaCI6Im11cm11cjY0In0=",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  return Response.json(data);
}