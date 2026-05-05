'use client'

import { useState, useRef } from 'react'
import { SERVICE_NAME, PRICE_MONTHLY, BETA_SLOTS } from '@/lib/constants'

// ─── Icons ───────────────────────────────────────────────────────
function IconCheck({ className = 'text-slate-900' }) {
  return (
    <svg className={`w-5 h-5 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function IconX() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────
const PAIN_POINTS = [
  '에이전시 담당자가 바뀌고 나서 콘텐츠 퀄리티가 달라졌다',
  '리포트를 받았는데 숫자가 좋은 건지 나쁜 건지 모르겠다',
  '트렌드는 매일 바뀌는데, 에이전시와의 소통은 그것보다 느려 항상 뒤쳐진다',
  '우리 브랜드의 무드가 에이전시에 제대로 전달되지 않는다',
]

const COMPARISON = [
  { agency: '월 수백만원', service: `월 ${PRICE_MONTHLY}` },
  { agency: '담당자 역량에 따라 품질 달라짐', service: '브랜드 보이스 일관 유지' },
  { agency: '"다음주에 해드릴게요"', service: '당일 소재 생성' },
  { agency: '월말 PPT 한 장', service: '실시간 성과 대시보드' },
  { agency: '계약 기간 Lock-in', service: '언제든 해지' },
]

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    marketingMethod: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || '제출에 실패했습니다. 다시 시도해주세요.')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-slate-900 select-none">
            {SERVICE_NAME}
          </span>
          <button
            onClick={scrollToForm}
            className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold
                       px-5 py-2.5 rounded-full transition-colors duration-150"
          >
            무료 체험판 신청
          </button>
        </div>
      </nav>

      {/* ── Section 1: Hero ────────────────────────────────────── */}
      <section className="bg-slate-900 px-6 py-28 md:py-40">
        <div className="max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700
                          rounded-full px-4 py-1.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-slate-300 text-xs font-medium tracking-wide">
              베타 테스터 {BETA_SLOTS}팀 모집중
            </span>
          </div>

          <h1 className="text-[2.6rem] md:text-6xl font-semibold text-white leading-[1.65] tracking-normal mb-7">
            대행사에 월 수백만원 쓰는데<br />
            <span className="text-slate-400">뭐가 되고 있는지 모르시겠죠?</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-snug mb-2 max-w-2xl">
            광고, 콘텐츠, 리포트까지 에이전시가 하던 일을 <span className="text-white font-semibold">1/10 비용</span>으로
          </p>
          <p className="text-slate-400 text-lg md:text-xl leading-snug mb-12 max-w-2xl">
            전문 마케터 없이도 에이전시 수준으로 운영되는 툴
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-100
                       text-slate-900 font-bold px-8 py-4 rounded-full text-base
                       transition-colors duration-150"
          >
            무료 체험판 신청하기
            <IconArrow />
          </button>
        </div>
      </section>

      {/* ── Section 2: Pain Points ─────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-14 leading-tight">
            이런 경험 있으신가요?
          </h2>

          <div className="space-y-4">
            {PAIN_POINTS.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-slate-50 border border-slate-100
                           rounded-2xl px-6 py-5"
              >
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-slate-900
                                flex items-center justify-center">
                  <IconCheck className="text-white w-3.5 h-3.5" />
                </div>
                <p className="text-slate-700 text-base md:text-lg leading-snug">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-8 text-center">
            <p className="text-slate-600 text-lg leading-relaxed">
              이 중 하나라도 해당되신다면,
            </p>
            <p className="text-slate-900 text-xl font-bold mt-1">
              아래 연락처를 남겨주세요
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2-B: Product Value ─────────────────────────── */}
      <section className="bg-slate-900 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.4] mb-6">
            마케팅 대행사에 매달 수백만원,<br />
            <span className="text-slate-400">매출은 그만큼 늘었나요?</span>
          </h2>

          <p className="text-slate-400 text-lg mb-12">
            {SERVICE_NAME} 대시보드에서 바로 확인해보세요
          </p>

          {/* Card */}
          <div className="rounded-2xl border border-slate-700 overflow-hidden">

            {/* Card header */}
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-600" />
                  <span className="w-3 h-3 rounded-full bg-slate-600" />
                  <span className="w-3 h-3 rounded-full bg-slate-600" />
                </div>
                <span className="text-slate-300 text-sm font-semibold tracking-wide">
                  {SERVICE_NAME}
                </span>
              </div>
              <span className="text-slate-400 text-sm">
                마케팅 성과를 바로 숫자로 확인해보세요.
              </span>
            </div>

            {/* Card body */}
            <div className="bg-slate-800/50 px-6 py-8 grid md:grid-cols-2 gap-3">
              {[
                '월간 콘텐츠 캘린더 1개',
                '인스타그램 피드 카피 주 3개',
                '블로그 포스팅 초안 월 4개',
                '숏폼 영상 주 1개',
                '메타 광고 카피 소재 월 8개',
                '월간 성과 리포트 1개',
                '카톡 피드백 무제한',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800 rounded-xl px-5 py-4 border border-slate-700">
                  <span className="text-blue-400 text-lg flex-shrink-0">✓</span>
                  <span className="text-slate-200 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-white hover:bg-slate-100
                         text-slate-900 font-bold px-8 py-4 rounded-full text-base
                         transition-colors duration-150"
            >
              무료 체험판 신청하기
              <IconArrow />
            </button>
          </div>

        </div>
      </section>

      {/* ── Section 3: Comparison ──────────────────────────────── */}
      <section className="bg-slate-50 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <span className="section-label">Why {SERVICE_NAME}</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-14 leading-tight">
            에이전시 대신, 이렇게 달라집니다
          </h2>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

            {/* Header row */}
            <div className="grid grid-cols-2">
              <div className="bg-slate-200 py-4 px-6 md:px-8">
                <span className="text-slate-500 text-sm font-bold tracking-wider uppercase">
                  기존 에이전시
                </span>
              </div>
              <div className="bg-slate-900 py-4 px-6 md:px-8">
                <span className="text-white text-sm font-bold tracking-wider uppercase">
                  {SERVICE_NAME}
                </span>
              </div>
            </div>

            {/* Data rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-t border-slate-100 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                }`}
              >
                <div className="py-4 px-6 md:px-8 flex items-center gap-3 border-r border-slate-100">
                  <IconX />
                  <span className="text-slate-400 text-sm md:text-base">{row.agency}</span>
                </div>
                <div className="py-4 px-6 md:px-8 flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-900
                                  flex items-center justify-center">
                    <IconCheck className="text-white w-3 h-3" />
                  </div>
                  <span className="text-slate-800 font-semibold text-sm md:text-base">
                    {row.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA Form ────────────────────────────────── */}
      <section
        id="cta-form"
        ref={formRef}
        className="bg-white px-6 py-24 md:py-32"
      >
        <div className="max-w-xl mx-auto">
          <span className="section-label text-blue-500">Early Access</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
            베타 테스터 {BETA_SLOTS}팀을 모집합니다
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-12">
            베타 테스터 {BETA_SLOTS}팀에게는 전 서비스가 무료로 제공됩니다.<br />
            출시 알람을 받을 메일 주소를 남겨주세요.
          </p>

          {submitted ? (
            /* ── Success state ── */
            <div className="bg-slate-900 rounded-2xl px-8 py-14 text-center">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-white text-xl font-bold">
                신청해주셔서 감사합니다.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@company.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  업종
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  placeholder="예: 의류, 식품, 뷰티 등"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  현재 마케팅 방식
                </label>
                <div className="relative">
                  <select
                    name="marketingMethod"
                    value={formData.marketingMethod}
                    onChange={handleChange}
                    required
                    className="form-input appearance-none pr-10 cursor-pointer"
                  >
                    <option value="">선택해주세요</option>
                    <option value="에이전시 이용중">에이전시 이용중</option>
                    <option value="인하우스">인하우스</option>
                    <option value="직접 운영 중">직접 운영 중</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm pt-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-slate-900 hover:bg-slate-700
                           disabled:bg-slate-300 disabled:cursor-not-allowed
                           text-white font-bold py-4 rounded-xl text-base
                           transition-colors duration-150 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    제출 중...
                  </>
                ) : (
                  '무료 체험판 신청하기'
                )}
              </button>

              <p className="text-center text-slate-400 text-xs pt-2">
                스팸 없음. 개인정보는 서비스 운영 목적으로만 사용됩니다.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Section 5: Trust Footer ────────────────────────────── */}
      <footer className="bg-slate-900 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-slate-700 rounded-full
                          px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-slate-400 text-xs font-medium tracking-wide">
              베타 테스터 모집중
            </span>
          </div>

          <p className="text-white text-xl md:text-2xl font-bold leading-relaxed mb-12">
            현재 베타 테스터 모집 중 —
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 border border-slate-600
                       hover:border-slate-400 text-slate-300 hover:text-white
                       font-semibold px-7 py-3.5 rounded-full text-sm
                       transition-colors duration-150"
          >
            지금 신청하기
            <IconArrow />
          </button>

          <div className="mt-16 pt-8 border-t border-slate-800">
            <p className="text-slate-600 text-sm">
              © 2025 {SERVICE_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
