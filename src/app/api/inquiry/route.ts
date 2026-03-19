// Intelligent inquiry endpoint — skeleton, ready for AI integration
// Will power the dynamic question flow based on event type, budget, and date

import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  // TODO: Implement intelligent inquiry flow with AI
  return NextResponse.json(
    { error: "Inteligentní formulář není zatím aktivní." },
    { status: 501 }
  );
}
