import { NextResponse } from 'next/server';
/** Retired permanently: shared-key sign-in is not an authentication method. */
export async function POST() {
  return NextResponse.json({ error: 'Use Google sign-in.' }, { status: 410, headers: { 'Cache-Control': 'no-store' } });
}
