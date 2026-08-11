/**
 * Shared Google Apps Script endpoint for form submissions.
 * Prefer server-side GOOGLE_SCRIPT_URL; fall back to the public URL used by registration.
 */
export function getGoogleScriptUrl(): string {
  const url =
    (process.env.GOOGLE_SCRIPT_URL as string | undefined)?.trim() ||
    (process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL as string | undefined)?.trim() ||
    'https://script.google.com/macros/s/AKfycbx3KEix1mtaKzco5pj-8ut-VjChYhanuxUt_JPxHPbHPq0d6VZBT5PvhVm7o6qjrqAZ2g/exec';
  return url;
}

export async function forwardToGoogleScript(
  payload: Record<string, unknown>
): Promise<{ ok: boolean; error?: string; status: number }> {
  const url = getGoogleScriptUrl();
  if (!url) {
    return { ok: false, error: 'Google Script URL is not configured.', status: 500 };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });

  if (!response.ok) {
    return {
      ok: false,
      error: `Upstream returned ${response.status}`,
      status: response.status,
    };
  }

  let result: { ok?: boolean; error?: string } = { ok: true };
  try {
    result = (await response.json()) as { ok?: boolean; error?: string };
  } catch {
    /* non-JSON success from Apps Script is fine */
  }

  if (result.ok === false) {
    return { ok: false, error: result.error || 'Submission failed', status: 400 };
  }

  return { ok: true, status: 200 };
}
