import { NextResponse } from 'next/server'

/** Farcaster Mini App webhook endpoint (required by manifest) */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Handle webhook payload if needed (e.g. notifications)
    return NextResponse.json({ ok: true, received: !!body })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'checkers-clash-webhook' })
}
