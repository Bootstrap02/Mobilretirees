
import React, { useState, useRef, useEffect } from 'react';
import { faqCategories } from './Questions';

const allFaqs = faqCategories.flatMap(cat =>
  cat.faqs.map(faq => ({ ...faq, category: cat.id, label: cat.label, icon: cat.icon }))
);

const searchFaqs = (message) => {
  const words = message.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
    .filter(w => !['the','and','are','for','how','can','what','does','why','who','when','where','was','this','that','have','with','from','will','your','you','our','its','but','not','his','her','they','them'].includes(w));
  if (words.length === 0) return [];
  const scored = allFaqs.map(faq => {
    const text = (faq.q + ' ' + faq.a).toLowerCase();
    let score = 0;
    words.forEach(w => {
      if (faq.q.toLowerCase().includes(w)) score += 3;
      else if (text.includes(w)) score += 1;
    });
    return { ...faq, score };
  });
  return scored.filter(f => f.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
};

const BOT_INTRO = {
  id: 'intro', from: 'bot',
  text: "Hello! 👋 I'm the EMRAN Help Assistant. Ask me anything about membership, benefits, the website, or any EMRAN matter.",
  faqs: [], time: new Date(),
};

const WHATSAPP_NUMBER = '2349069412463';
const WHATSAPP_DEFAULT_MESSAGE = 'Hi, I need help on the EMRAN website.';
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

const LiveChat = () => {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState('');
  const [messages, setMessages] = useState([BOT_INTRO]);
  const [typing, setTyping]     = useState(false);
  const [expanded, setExpanded] = useState({});
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const toggleAnswer = (msgId, faqIdx) => {
    const key = `${msgId}_${faqIdx}`;
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text, time: new Date() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const matches = searchFaqs(text);
      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'bot',
        text: matches.length > 0
          ? `I found ${matches.length} answer${matches.length > 1 ? 's' : ''} that may help:`
          : "I couldn't find a specific answer for that. Try rephrasing, or email emranannuitants@gmail.com for direct support.",
        faqs: matches, time: new Date(),
      }]);
    }, 900);
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const quickQuestions = [
    "How do I reset my password?",
    "What are the annual dues?",
    "How do I claim a death benefit?",
    "How do I edit my profile?",
    "What is EMRAN?",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .chat-widget * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .chat-msg-in  { animation: msgIn  0.28s cubic-bezier(0.34,1.56,0.64,1) both; }
        .chat-msg-out { animation: msgOut 0.22s ease both; }
        @keyframes msgIn  { from{opacity:0;transform:translateY(8px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes msgOut { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:none} }
        .faq-result-btn { transition:background 0.18s; border:none; cursor:pointer; }
        .faq-result-btn:hover { background:#f0f3fa !important; }
        .quick-q { transition:all 0.18s; cursor:pointer; border:none; }
        .quick-q:hover { background:#001F5B !important; color:#fff !important; }
        .chat-input:focus { outline:none; box-shadow:0 0 0 2px rgba(227,6,19,0.25); }
        .chat-window-enter { animation:windowIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes windowIn { from{opacity:0;transform:scale(0.85) translateY(24px)} to{opacity:1;transform:none} }
        .dot-typing span { display:inline-block;width:6px;height:6px;background:#001F5B;border-radius:50%;animation:dot 1.2s infinite; }
        .dot-typing span:nth-child(2){animation-delay:0.2s}
        .dot-typing span:nth-child(3){animation-delay:0.4s}
        @keyframes dot{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes glowPulse {
          0%   { box-shadow: 0 0 0 0 rgba(227,6,19,0.55), 0 4px 20px rgba(227,6,19,0.35); }
          50%  { box-shadow: 0 0 0 10px rgba(227,6,19,0), 0 4px 20px rgba(227,6,19,0.35); }
          100% { box-shadow: 0 0 0 0 rgba(227,6,19,0), 0 4px 20px rgba(227,6,19,0.35); }
        }
        @keyframes floatBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .chat-bubble-live {
          animation: glowPulse 2s ease-in-out infinite, floatBounce 3s ease-in-out infinite;
          transition: transform 0.2s;
        }
        .chat-bubble-live:hover { transform: scale(1.08) !important; animation: none; }
        @keyframes labelPop {
          0%,100% { transform:translateX(-50%) scale(1); opacity:1; }
          50%      { transform:translateX(-50%) scale(1.05); opacity:0.9; }
        }
        .chat-label { animation: labelPop 2.5s ease-in-out infinite; white-space: nowrap; }
        .whatsapp-btn { transition: transform 0.18s, background 0.18s; }
        .whatsapp-btn:hover { transform: scale(1.08); background:#1ebe57 !important; }

        /* ── CHAT WINDOW: responsive sizing ──
           On mobile:  covers most of the screen, sits above the bottom nav bar
           On desktop: fixed height, never taller than viewport - 120px, 
                       always visible fully without clipping at the top           */
        .chat-window {
          position: fixed;
          right: 20px;
          bottom: 90px;           /* above mobile bottom bar */
          width: 360px;
          max-width: calc(100vw - 32px);
          /* Never taller than the available viewport height minus some margin */
          height: min(520px, calc(100vh - 120px));
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 12px 60px rgba(0,31,91,0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1001;
        }

        /* On wider desktop screens push it a bit higher from the bottom */
        @media (min-width: 768px) {
          .chat-window {
            bottom: 88px;
            height: min(560px, calc(100vh - 120px));
          }
        }
      `}</style>

      <div className="chat-widget">

        {/* ── Chat Window — now uses .chat-window class with fixed positioning ── */}
        {open && (
          <div className="chat-window chat-window-enter">

            {/* Header */}
            <div style={{ background:'linear-gradient(135deg,#001F5B 0%,#003494 100%)', padding:'16px 20px', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🤖</div>
              <div>
                <div style={{ fontWeight:700, color:'#fff', fontSize:14 }}>EMRAN Help Assistant</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.65)', display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', display:'inline-block' }} />
                  Online · powered by FAQs
                </div>
              </div>

              {/* WhatsApp handoff */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                title="Continue on WhatsApp" className="whatsapp-btn"
                style={{ marginLeft:'auto', background:'#25D366', border:'none', borderRadius:'50%', width:30, height:30, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, textDecoration:'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0012.04 2zm0 18.13h-.01c-1.48 0-2.94-.4-4.21-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.26-4.36c0-4.54 3.7-8.24 8.27-8.24 2.21 0 4.28.86 5.84 2.42a8.17 8.17 0 012.42 5.83c0 4.55-3.7 8.25-8.26 8.25zm4.53-6.18c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.24-.86.85-.86 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28z"/>
                </svg>
              </a>

              <button onClick={() => setOpen(false)}
                style={{ background:'rgba(255,255,255,0.12)', border:'none', borderRadius:'50%', width:28, height:28, cursor:'pointer', color:'#fff', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                ×
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:12 }}>
              {messages.map((msg) => (
                <div key={msg.id} className={msg.from==='bot'?'chat-msg-in':'chat-msg-out'}
                  style={{ display:'flex', flexDirection:'column', alignItems:msg.from==='bot'?'flex-start':'flex-end' }}>
                  {msg.from==='bot' && (
                    <div style={{ display:'flex', alignItems:'flex-end', gap:8, maxWidth:'90%' }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background:'#f0f3fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>🤖</div>
                      <div>
                        <div style={{ background:'#f0f3fa', borderRadius:'4px 16px 16px 16px', padding:'10px 14px', fontSize:13.5, color:'#1a2340', lineHeight:1.55 }}>{msg.text}</div>
                        {msg.faqs && msg.faqs.length > 0 && (
                          <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:6 }}>
                            {msg.faqs.map((faq, fi) => {
                              const key = `${msg.id}_${fi}`;
                              const isOpen = expanded[key];
                              return (
                                <div key={fi} style={{ background:'#fff', borderRadius:12, border:'1px solid #e8ecf4', overflow:'hidden' }}>
                                  <button className="faq-result-btn" onClick={() => toggleAnswer(msg.id, fi)}
                                    style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, padding:'10px 12px', background:isOpen?'#f7f8fc':'#fff', textAlign:'left' }}>
                                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                                      <span style={{ fontSize:13 }}>{faq.icon}</span>
                                      <span style={{ fontSize:12.5, fontWeight:600, color:'#001F5B', lineHeight:1.4 }}>{faq.q}</span>
                                    </div>
                                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ transform:isOpen?'rotate(180deg)':'none', transition:'transform 0.25s', flexShrink:0 }}>
                                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#001F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </button>
                                  {isOpen && <div style={{ padding:'8px 12px 12px', fontSize:12.5, color:'#4a5568', lineHeight:1.6, borderTop:'1px solid #f0f3fa' }}>{faq.a}</div>}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div style={{ fontSize:10, color:'#aab0be', marginTop:4, paddingLeft:2 }}>{fmt(msg.time)}</div>
                      </div>
                    </div>
                  )}
                  {msg.from==='user' && (
                    <div style={{ maxWidth:'78%' }}>
                      <div style={{ background:'#001F5B', borderRadius:'16px 4px 16px 16px', padding:'10px 14px', fontSize:13.5, color:'#fff', lineHeight:1.55 }}>{msg.text}</div>
                      <div style={{ fontSize:10, color:'#aab0be', marginTop:4, textAlign:'right' }}>{fmt(msg.time)}</div>
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="chat-msg-in" style={{ display:'flex', alignItems:'flex-end', gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'#f0f3fa', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
                  <div style={{ background:'#f0f3fa', borderRadius:'4px 16px 16px 16px', padding:'12px 16px' }}>
                    <div className="dot-typing"><span/><span/><span/></div>
                  </div>
                </div>
              )}
              {messages.length === 1 && !typing && (
                <div style={{ marginTop:4 }}>
                  <div style={{ fontSize:11, color:'#aab0be', marginBottom:8, paddingLeft:36 }}>Suggested questions:</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5, paddingLeft:36 }}>
                    {quickQuestions.map((q, i) => (
                      <button key={i} className="quick-q" onClick={() => { setInput(q); setTimeout(sendMessage, 50); }}
                        style={{ background:'#f0f3fa', border:'1px solid #e8ecf4', borderRadius:20, padding:'7px 14px', fontSize:12.5, color:'#001F5B', fontWeight:500, textAlign:'left' }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding:'10px 12px', borderTop:'1px solid #f0f3fa', display:'flex', gap:8, flexShrink:0 }}>
              <input ref={inputRef} className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Ask a question…"
                style={{ flex:1, padding:'10px 14px', borderRadius:24, border:'1.5px solid #e8ecf4', fontSize:13.5, color:'#1a2340', background:'#f7f8fc' }}/>
              <button onClick={sendMessage} disabled={!input.trim()}
                style={{ width:40, height:40, borderRadius:'50%', background:input.trim()?'#E30613':'#e8ecf4', border:'none', cursor:input.trim()?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.2s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke={input.trim()?'#fff':'#aab0be'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Floating Bubble (fixed position, separate from window) ── */}
        <div style={{ position:'fixed', bottom:24, right:20, zIndex:1002, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          {!open && (
            <div className="chat-label"
              style={{ background:'#001F5B', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20, letterSpacing:'0.04em', boxShadow:'0 2px 8px rgba(0,31,91,0.25)' }}>
              💬 Chat with us
            </div>
          )}
          <button
            className={open ? '' : 'chat-bubble-live'}
            onClick={() => setOpen(o => !o)}
            style={{ width:56, height:56, borderRadius:'50%', background:open?'#001F5B':'linear-gradient(135deg,#E30613 0%,#b30010 100%)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:24, position:'relative' }}>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ) : '💬'}
            {!open && (
              <span style={{ position:'absolute', top:2, right:2, width:10, height:10, borderRadius:'50%', background:'#4ade80', border:'2px solid #fff' }}/>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
