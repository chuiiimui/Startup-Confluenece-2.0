import { NextResponse } from 'next/server';
import { forwardToGoogleScript } from '@/lib/googleScript';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = {
      ...body,
      registrationType: 'partner',
      timestamp:
        typeof body.timestamp === 'string' ? body.timestamp : new Date().toISOString(),
    };

    const result = await forwardToGoogleScript(payload);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: result.status >= 400 ? result.status : 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
