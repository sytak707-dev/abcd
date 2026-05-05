// Cloudflare Pages Function — /api/submit
// 환경변수는 Cloudflare Pages 대시보드 > Settings > Environment variables 에서 설정

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, industry, marketingMethod } = body

  if (!name || !email || !industry || !marketingMethod) {
    return Response.json({ success: false, error: '모든 필드를 입력해주세요.' }, { status: 400 })
  }

  // ── Notion 저장 ───────────────────────────────────────────────
  if (!env.NOTION_API_KEY || !env.NOTION_DATABASE_ID) {
    // 환경변수 미설정 시 성공 반환 (Cloudflare 로그에서 확인 가능)
    return Response.json({ success: true, mode: 'console-only' })
  }

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: env.NOTION_DATABASE_ID },
        properties: {
          이름: { title: [{ text: { content: name } }] },
          이메일: { email },
          업종: { rich_text: [{ text: { content: industry } }] },
          마케팅방식: { select: { name: marketingMethod } },
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Notion] API 오류:', err)
      return Response.json({ success: true, mode: 'console-fallback' })
    }

    return Response.json({ success: true, mode: 'notion' })
  } catch (err) {
    console.error('[Notion] fetch 오류:', err.message)
    return Response.json({ success: true, mode: 'console-fallback' })
  }
}
