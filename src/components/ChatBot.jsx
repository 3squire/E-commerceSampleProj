import { useEffect, useRef, useState } from 'react'
import './ChatBot.css'
import logo from '../assets/dugson-consulting.jpg'

const WHATSAPP_NUMBER = '27693042748'
const SUPPORT_EMAIL = 'neani@dugsonconsulting.co.za'

const faqs = [
  {
    question: 'What products do you sell?',
    keywords: ['product', 'sell', 'stock', 'range', 'catalog'],
    answer: 'We stock Laptops, Phones, Desktop PCs, Audio gear, Smart Watches, Cameras, Keyboards and Tablets — browse the full range on our Products page.',
  },
  {
    question: 'Where are you based?',
    keywords: ['based', 'located', 'location', 'address', 'where'],
    answer: "We're based at 13 Esdoring Street, Centurion, Gauteng, South Africa.",
  },
  {
    question: 'How much do laptops cost?',
    keywords: ['laptop', 'price', 'cost', 'how much'],
    answer: 'Our laptops range from R11,999 to R27,999 depending on specs. Phones start from R7,999 and Desktop PCs from R8,999.',
  },
  {
    question: 'How can I contact you?',
    keywords: ['contact', 'reach', 'phone', 'email', 'call'],
    answer: `Call us on 069 304 2748, email ${SUPPORT_EMAIL}, or tap WhatsApp below for a quick reply.`,
  },
  {
    question: 'What are your business hours?',
    keywords: ['hour', 'open', 'time', 'closed'],
    answer: "We're open Monday to Friday, 08:00–17:00.",
  },
  {
    question: 'Do you deliver?',
    keywords: ['deliver', 'shipping', 'ship', 'courier'],
    answer: 'Yes — orders are processed within 1–3 business days and delivered within 2–7 business days.',
  },
  {
    question: 'What is your return policy?',
    keywords: ['return', 'refund', 'exchange'],
    answer: 'Products can be returned within 14 days if unused, undamaged, and in their original packaging with proof of purchase.',
  },
  {
    question: 'Do products come with a warranty?',
    keywords: ['warranty', 'guarantee'],
    answer: "Selected products include a manufacturer's warranty. It doesn't cover accidental damage, misuse or unauthorized repairs.",
  },
]

const quickQuestions = faqs.slice(0, 4)

function findAnswer(text) {
  const normalized = text.toLowerCase()
  return faqs.find((faq) => faq.keywords.some((keyword) => normalized.includes(keyword)))
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'greeting',
      from: 'bot',
      text: "Hi 👋 I'm the DugsonTech assistant. How can I help you today? Choose a question below or type your own.\n\nIf I can't answer, I'll connect you directly with our team on WhatsApp.",
    },
  ])
  const timeoutRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    const teaserTimer = setTimeout(() => setShowTeaser(true), 1800)
    return () => clearTimeout(teaserTimer)
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const askQuestion = (question, answer) => {
    const userMessage = { id: `u-${Date.now()}`, from: 'user', text: question }
    setMessages((current) => [...current, userMessage])

    timeoutRef.current = setTimeout(() => {
      const match = answer ?? findAnswer(question)?.answer
      setMessages((current) => [
        ...current,
        match
          ? { id: `b-${Date.now()}`, from: 'bot', text: match }
          : {
              id: `b-${Date.now()}`,
              from: 'bot',
              text: "I'm not sure about that one — let's get you connected with our team on WhatsApp for a quick answer.",
              showWhatsApp: true,
            },
      ])
    }, 400)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    askQuestion(trimmed)
    setInput('')
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi DugsonTech, I have a question.')}`
  const emailHref = `mailto:${SUPPORT_EMAIL}`

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="DugsonTech assistant">
          <header className="chatbot-header">
            <img src={logo} alt="" className="chatbot-avatar" />
            <div>
              <strong>DugsonTech</strong>
              <span>Ask us anything</span>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-bubble chatbot-bubble--${message.from}`}>
                {message.text.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {message.showWhatsApp && (
                  <a className="chatbot-inline-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot-quick-questions">
            {quickQuestions.map((faq) => (
              <button key={faq.question} type="button" onClick={() => askQuestion(faq.question, faq.answer)}>
                {faq.question}
              </button>
            ))}
          </div>

          <div className="chatbot-contact-actions">
            <a className="chatbot-whatsapp-btn" href={whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="chatbot-email-btn" href={emailHref}>
              Email Us
            </a>
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a question..."
              aria-label="Type a question"
            />
            <button type="submit" aria-label="Send">
              →
            </button>
          </form>
        </div>
      )}

      {!isOpen && showTeaser && (
        <div className="chatbot-teaser" onClick={() => { setIsOpen(true); setShowTeaser(false) }}>
          <span>How can we help you?</span>
          <button
            type="button"
            className="chatbot-teaser-close"
            onClick={(event) => { event.stopPropagation(); setShowTeaser(false) }}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => { setIsOpen((current) => !current); setShowTeaser(false) }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  )
}

export default ChatBot
