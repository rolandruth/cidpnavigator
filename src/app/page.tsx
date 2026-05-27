'use client';

import React, { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

const STARTER_QUESTIONS = [
  'What is CIDP and how is it different from GBS?',
  'What are the first-line treatments for CIDP?',
  'How does Vyvgart Hytrulo work?',
  'What questions should I ask my neurologist?',
  'My insurance denied IVIG — what can I do?',
];

function formatMessage(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactElement[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    if (listType === 'ul') {
      elements.push(
        <ul key={key++} className="list-disc pl-5 mb-3 space-y-1">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={key++} className="list-decimal pl-5 mb-3 space-y-1">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
          ))}
        </ol>
      );
    }
    listItems = [];
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      flushList();
      const headingText = trimmed.replace(/^#{2,3} /, '');
      elements.push(
        <p key={key++} className="font-semibold mt-3 mb-1">
          {headingText}
        </p>
      );
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listItems.push(trimmed.slice(2));
      continue;
    }

    const numberedMatch = trimmed.match(/^\d+\.\s(.+)/);
    if (numberedMatch) {
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listItems.push(numberedMatch[1]);
      continue;
    }

    flushList();

    if (trimmed === '') {
      elements.push(<br key={key++} />);
    } else {
      elements.push(
        <p key={key++} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }} />
      );
    }
  }

  flushList();
  return <>{elements}</>;
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-black/5 px-1 rounded text-sm">$1</code>');
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Auto-send question from ?q= URL param (used by Google sitelinks SearchAction)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) sendMessage(q.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    // Only auto-scroll if the user is already near the bottom (within 150px)
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 150) {
      el.scrollTop = el.scrollHeight; // instant assignment — no animation to restart
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput('');
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok || !response.body) throw new Error(`API error: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        // Batch DOM updates to animation frames — prevents jerk from micro-chunks
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { role: 'assistant', content: accumulated, streaming: true },
            ]);
            rafIdRef.current = null;
          });
        }
      }

      // Flush any pending RAF and do the final formatted update
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: accumulated, streaming: false },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again or contact the GBS/CIDP Foundation at 1-866-224-3301.',
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'CIDP Treatment Navigator',
        url: 'https://cidpnavigator.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://cidpnavigator.com/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'CIDP Treatment Navigator',
        url: 'https://cidpnavigator.com',
        logo: 'https://cidpnavigator.com/og-image.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'roland.ruth@gmail.com',
          contactType: 'customer support',
        },
      },
      {
        '@type': 'WebApplication',
        name: 'CIDP Treatment Navigator',
        url: 'https://cidpnavigator.com',
        applicationCategory: 'HealthApplication',
        description:
          'Free AI educational assistant for CIDP (Chronic Inflammatory Demyelinating Polyneuropathy) patients. Understand IVIG, Vyvgart Hytrulo, SCIg, and plasma exchange treatments, prepare neurologist questions, and navigate insurance appeals.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
      },
      {
        '@type': 'MedicalWebPage',
        name: 'CIDP Treatment Navigator',
        url: 'https://cidpnavigator.com',
        about: {
          '@type': 'MedicalCondition',
          name: 'Chronic Inflammatory Demyelinating Polyneuropathy',
          alternateName: 'CIDP',
          code: { '@type': 'MedicalCode', code: 'G61.81', codingSystem: 'ICD-10' },
        },
        audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
        medicalAudience: 'Patient',
        lastReviewed: '2025-05-27',
      },
    ],
  };

  return (
    // Outer shell: full viewport height, two-column on desktop
    <div className="flex flex-col h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Top bar: full width ── */}
      <header className="flex-none bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              CN
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 leading-tight text-sm sm:text-base">
                CIDP Treatment Navigator
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Educational assistant — not a doctor</p>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/faq" className="hover:text-blue-600 hidden sm:block">FAQ</Link>
            <Link href="/about" className="hover:text-blue-600 hidden sm:block">About</Link>
            <Link href="/privacy" className="hover:text-blue-600 hidden sm:block">Privacy</Link>
            <a
              href="https://www.gbs-cidp.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              GBS/CIDP Foundation
            </a>
          </nav>
        </div>
      </header>

      {/* ── Disclaimer ── */}
      <div className="flex-none bg-amber-50 border-b border-amber-200 px-4 py-2">
        <p className="text-xs text-amber-800 max-w-7xl mx-auto">
          <strong>Educational use only.</strong> Cannot diagnose or recommend treatment. Always consult your neurologist.
        </p>
      </div>

      {/* ── Body: chat + sidebar ── */}
      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">

        {/* Chat column */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Message list */}
          <main ref={mainRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="text-4xl mb-4">🧠</div>
                <h2 className="text-lg font-medium text-slate-700 mb-1">
                  Ask me anything about CIDP
                </h2>
                <p className="text-sm text-slate-500 mb-2 max-w-sm">
                  I explain CIDP treatments (IVIG, Vyvgart Hytrulo, SCIg, plasma exchange), help you prepare neurologist questions, decode insurance denials, and find clinical trials — grounded in the 2021 EAN/PNS guideline.
                </p>
                <Link href="/faq" className="text-xs text-blue-600 hover:underline mb-5 block">
                  Browse common CIDP questions →
                </Link>
                <div className="flex flex-col gap-2 w-full max-w-md mb-6">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-sm px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 text-slate-700 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                {/* Ad in empty state — shown while there's space */}
                <div className="w-full max-w-md">
                  <AdUnit adSlot="1234567890" adFormat="rectangle" className="mt-2" />
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      msg.content ? (
                        msg.streaming ? (
                          // Plain text while streaming — avoids markdown flicker on partial tokens
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                            <span className="inline-block w-0.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />
                          </p>
                        ) : (
                          <div>{formatMessage(msg.content)}</div>
                        )
                      ) : (
                        <span className="flex gap-1 py-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </span>
                      )
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))
            )}
          </main>

          {/* Input bar */}
          <footer className="flex-none bg-white border-t border-slate-200 px-4 py-3">
            <form onSubmit={handleSubmit} className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about CIDP treatments, appointments, insurance..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 max-h-32 overflow-y-auto"
                style={{ lineHeight: '1.5' }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-none w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send"
              >
                <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-400">
                Enter to send · Shift+Enter for new line
              </p>
              <nav className="flex gap-3 text-xs text-slate-400">
                <Link href="/faq" className="hover:text-slate-600">FAQ</Link>
                <Link href="/about" className="hover:text-slate-600">About</Link>
                <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>
              </nav>
            </div>
          </footer>
        </div>

        {/* ── Sidebar: visible on lg+ screens ── */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 border-l border-slate-200 bg-white overflow-y-auto">
          {/* Sidebar ad — primary placement */}
          <div className="p-4 border-b border-slate-100">
            <p className="text-xs text-slate-400 mb-2 text-center">Advertisement</p>
            <AdUnit adSlot="0987654321" adFormat="rectangle" />
          </div>

          {/* Quick info panel */}
          <div className="p-4 space-y-4 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-800 mb-1">About this tool</p>
              <p className="leading-relaxed">
                An AI assistant for CIDP patients, grounded in the 2021 EAN/PNS guideline and FDA-approved drug information. Not a substitute for your neurologist.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Need human help?</p>
              <a
                href="tel:18662243301"
                className="text-blue-600 hover:underline font-medium"
              >
                1-866-224-3301
              </a>
              <p className="text-slate-500 mt-0.5">GBS/CIDP Foundation Health Navigator</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Resources</p>
              <ul className="space-y-1">
                <li>
                  <Link href="/faq" className="text-blue-600 hover:underline">
                    CIDP FAQ — Common Questions
                  </Link>
                </li>
                <li>
                  <a href="https://www.gbs-cidp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GBS/CIDP Foundation
                  </a>
                </li>
                <li>
                  <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    ClinicalTrials.gov
                  </a>
                </li>
                <li>
                  <a href="https://primaryimmune.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Immune Deficiency Foundation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Second sidebar ad */}
          <div className="p-4 mt-auto border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2 text-center">Advertisement</p>
            <AdUnit adSlot="1122334455" adFormat="auto" />
          </div>
        </aside>

      </div>
    </div>
  );
}
