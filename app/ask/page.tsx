'use client'
import { Suspense, useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, AlertCircle, BookOpen, Loader2, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: { title: string; slug: string; ref?: string; excerpt: string }[]
  fallback?: boolean
  fallbackReason?: string
}

const EXAMPLES = [
  'อริยสัจ ๔ คืออะไร',
  'ทำไมไม่ควรดื่มสุรา',
  'การนั่งสมาธิเริ่มต้นยังไง',
  'เปรตคืออะไร มีกี่จำพวก',
  'นิวรณ์ ๕ มีอะไรบ้าง',
]

function AskPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prefilledRef = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const ask = useCallback(async (question: string) => {
    if (!question.trim()) return
    setInput('')
    const userMsg: Message = { role: 'user', content: question }
    let snapshot: Message[] = []
    setMessages((prev) => {
      snapshot = prev
      return [...prev, userMsg]
    })
    setLoading(true)

    try {
      const history = snapshot.map((m) => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      })
      const data = await res.json()

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.ok ? data.answer : '',
        sources: data.searchResults,
        fallback: data.fallback,
        fallbackReason: data.fallbackReason,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', fallback: true, fallbackReason: 'Network error' },
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-fire question when navigated with ?q= (from SelectionToolbar etc.)
  useEffect(() => {
    if (!initialQuery || prefilledRef.current) return
    prefilledRef.current = true
    ask(initialQuery)
  }, [initialQuery, ask])

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-56px)]">

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-16 space-y-6">
            <div>
              <MessageCircle className="w-12 h-12 mx-auto text-stone-300 mb-3" />
              <h2 className="text-lg font-medium text-stone-700">ถามเกี่ยวกับพระไตรปิฎก</h2>
              <p className="text-sm text-stone-400 mt-1">AI จะตอบพร้อมอ้างอิงพระสูตร</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => ask(ex)}
                  className="text-sm px-4 py-2 bg-white border border-stone-200 rounded-full hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all text-stone-600"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[85%] space-y-3', msg.role === 'user' ? 'items-end' : 'items-start')}>

              {/* Bubble */}
              {msg.role === 'user' ? (
                <div className="bg-amber-500 text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm">
                  {msg.content}
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Fallback notice */}
                  {msg.fallback && (
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      AI ไม่พร้อมใช้งานในขณะนี้ — แสดงผลการค้นหาแทน
                    </div>
                  )}

                  {/* AI answer */}
                  {msg.content && (
                    <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-stone-700 leading-relaxed prose prose-sm prose-stone max-w-none prose-p:my-2 prose-headings:font-semibold prose-h2:text-base prose-h3:text-sm prose-strong:text-stone-800 prose-blockquote:border-amber-300 prose-blockquote:bg-amber-50 prose-blockquote:my-2 prose-blockquote:py-0.5 prose-blockquote:rounded-r-md prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Sources */}
                  {msg.sources?.length ? (
                    <div className="space-y-2">
                      <p className="text-xs text-stone-400 font-medium">แหล่งอ้างอิง</p>
                      {msg.sources.map((s, si) => (
                        <Link
                          key={si}
                          href={`/wiki/${s.slug}`}
                          className="block p-3 bg-white border border-stone-200 rounded-lg hover:border-amber-300 transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-stone-700">{s.title}</p>
                              {s.ref && <p className="text-xs text-amber-600">{s.ref}</p>}
                              {s.excerpt && (
                                <p
                                  className="text-xs text-stone-400 mt-1 line-clamp-2"
                                  dangerouslySetInnerHTML={{ __html: s.excerpt }}
                                />
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-tl-sm">
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-stone-200 pt-4">
        <form
          onSubmit={(e) => { e.preventDefault(); ask(input) }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ถามเกี่ยวกับพระไตรปิฎก..."
            disabled={loading}
            className="flex-1 bg-stone-100 border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-amber-300 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-amber-500 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-xs text-stone-400 mt-2 text-center">
          ตอบโดยอ้างอิงพระไตรปิฎก — หากไม่มีข้อมูลจะแจ้งให้ทราบ
        </p>
      </div>
    </div>
  )
}

export default function AskPage() {
  return (
    <Suspense fallback={null}>
      <AskPageContent />
    </Suspense>
  )
}
