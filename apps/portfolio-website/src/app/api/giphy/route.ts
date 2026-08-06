import { NextResponse } from "next/server";

const TWELVE_HOURS = 60 * 60 * 12;

interface GiphyRandomResponse {
  data?: {
    images?: {
      fixed_height_small?: {
        url?: string;
      };
      downsized_medium?: {
        url?: string;
      };
      original?: {
        url?: string;
      };
    };
  };
  meta?: {
    status?: number;
    msg?: string;
  };
}

export async function GET() {
  const apiKey = process.env.GIPHY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        url: "",
        error: "GIPHY_API_KEY is not configured",
      },
      { status: 500 },
    );
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      tag: "wholesome anime",
      rating: "g",
    });

    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },

        // Keep roughly the same GIF for twelve hours.
        next: {
          revalidate: TWELVE_HOURS,
        },
      },
    );

    const data =
      (await response.json()) as GiphyRandomResponse;

    if (!response.ok) {
      console.error(
        "GIPHY request failed:",
        response.status,
        data.meta?.msg,
      );

      return NextResponse.json(
        {
          url: "",
          error:
            data.meta?.msg ??
            "GIPHY request failed",
        },
        { status: response.status },
      );
    }

    const gifUrl =
      data.data?.images?.fixed_height_small?.url ??
      data.data?.images?.downsized_medium?.url ??
      data.data?.images?.original?.url ??
      "";

    if (!gifUrl) {
      return NextResponse.json(
        {
          url: "",
          error: "GIPHY returned no GIF",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { url: gifUrl },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("GIPHY API error:", error);

    return NextResponse.json(
      {
        url: "",
        error: "Unable to load GIF",
      },
      { status: 500 },
    );
  }
}