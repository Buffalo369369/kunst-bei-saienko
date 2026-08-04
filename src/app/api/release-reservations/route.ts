import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { getCronSecret } from "@/lib/server/env";

function isAuthorized(request: Request) {
  const authorization = request.headers.get("authorization");
  const expectedAuthorization = `Bearer ${getCronSecret()}`;

  if (!authorization || authorization.length !== expectedAuthorization.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(authorization),
    Buffer.from(expectedAuthorization)
  );
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date().toISOString();

  // Находим все просроченные брони
  const { data: artworks, error } = await supabaseAdmin
    .from("artworks")
    .select("id")
    .eq("status", "Reserviert")
    .lt("reserved_until", now);

  if (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  if (!artworks || artworks.length === 0) {
    return NextResponse.json({
      success: true,
      released: 0,
    });
  }

  // Освобождаем их
  const { error: updateError } = await supabaseAdmin
    .from("artworks")
    .update({
      status: "Verfügbar",
      reserved_until: null,
    })
    .in(
      "id",
      artworks.map((art) => art.id)
    );

  if (updateError) {
    console.error(updateError);

    return NextResponse.json({
      success: false,
      error: updateError.message,
    });
  }

  return NextResponse.json({
    success: true,
    released: artworks.length,
  });
}
