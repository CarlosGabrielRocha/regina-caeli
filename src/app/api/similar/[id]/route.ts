import { getSimilarProperties } from "../../../../services/propertyService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get("type");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const bedrooms = searchParams.get("bedrooms");
  const result = await getSimilarProperties({
    id,
  });

  const url = new URL(`/property/${id}`, request.url);
  url.searchParams.append("initial", "true");

  if (result.status === "error" || !result.data || result.data.length === 0) {
    return NextResponse.redirect(url);
  }

  const tryLevel = result.try;

  if (tryLevel === 1) {
    if (type) url.searchParams.append("type", type);
    if (city) url.searchParams.append("city", city);
    if (state) url.searchParams.append("state", state);
    if (bedrooms) url.searchParams.append("bedrooms", bedrooms);
  } else if (tryLevel === 2) {
    if (type) url.searchParams.append("type", type);
    if (state) url.searchParams.append("state", state);
    if (bedrooms) url.searchParams.append("bedrooms", bedrooms);
  } else if (tryLevel === 3) {
    if (type) url.searchParams.append("type", type);
    if (state) url.searchParams.append("state", state);
  } else if (tryLevel === 4) {
    if (type) url.searchParams.append("type", type);
  }

  return NextResponse.redirect(url);
}
