import { Client } from '@notionhq/client'

export async function POST(request) {
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

  // ── 콘솔 로그 (항상 출력) ──────────────────────────────────────
  console.log('[얼리액세스 신청]', {
    이름: name,
    이메일: email,
    업종: industry,
    마케팅방식: marketingMethod,
    신청일시: new Date().toISOString(),
  })

  // ── Notion 저장 ───────────────────────────────────────────────
  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!apiKey || !databaseId) {
    // Notion 미설정 시 콘솔 로그만 출력하고 성공 반환
    console.warn('[Notion] 환경변수 미설정 — 콘솔 로그만 출력합니다.')
    return Response.json({ success: true, mode: 'console-only' })
  }

  try {
    const notion = new Client({ auth: apiKey })

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        // Notion 데이터베이스 속성명과 일치해야 합니다.
        // 설정 방법: .env.local.example 파일 참고
        이름: {
          title: [{ text: { content: name } }],
        },
        이메일: {
          email: email,
        },
        업종: {
          rich_text: [{ text: { content: industry } }],
        },
        마케팅방식: {
          select: { name: marketingMethod },
        },
      },
    })

    return Response.json({ success: true, mode: 'notion' })
  } catch (err) {
    console.error('[Notion] API 오류:', err.message)

    // Notion 오류가 있어도 데이터는 콘솔에 남아있으므로 사용자에게는 성공 처리
    return Response.json({ success: true, mode: 'console-fallback' })
  }
}
