export async function GET() {
  const TENOR_API_KEY = process.env.TENOR_API_KEY;

  try {
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=wholesome+anime&key=${TENOR_API_KEY}&limit=50&media_filter=gif&contentfilter=high`
    );
    const data = await response.json();

    if (!data?.results?.length) {
      return new Response(JSON.stringify({ url: "" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hoursPerWindow = 12;
    const now = Date.now();
    const bucket = Math.floor(now / (1000 * 60 * 60 * hoursPerWindow));

    const index = bucket % data.results.length;
    const chosen = data.results[index];

    const gifUrl =
      chosen?.media_formats?.gif?.url ||
      chosen?.media_formats?.tinygif?.url ||
      "";

    return new Response(JSON.stringify({ url: gifUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Tenor API error:", error);
    return new Response(JSON.stringify({ url: "" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
