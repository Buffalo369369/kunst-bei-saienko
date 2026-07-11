import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const now = new Date().toISOString();

  // Находим все просроченные брони
  const { data: artworks, error } = await supabase
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
  const { error: updateError } = await supabase
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