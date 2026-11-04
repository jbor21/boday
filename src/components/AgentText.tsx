import { parseRichText, type RichSpan } from '../lib/agentChat'

function Spans({ spans }: { spans: RichSpan[] }) {
  return (
    <>
      {spans.map((span, i) => (span.bold ? <strong key={i} className="font-semibold">{span.text}</strong> : <span key={i}>{span.text}</span>))}
    </>
  )
}

/** An agent reply: paragraphs, bold, and lists. Text only; nothing is parsed as HTML. */
export function AgentText({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      {parseRichText(text).map((block, i) => {
        if (block.kind === 'p') return <p key={i} className="whitespace-pre-wrap"><Spans spans={block.spans} /></p>
        const List = block.kind === 'ul' ? 'ul' : 'ol'
        return (
          <List key={i} className={`space-y-1 pl-5 ${block.kind === 'ul' ? 'list-disc' : 'list-decimal'}`}>
            {block.items.map((item, j) => <li key={j}><Spans spans={item} /></li>)}
          </List>
        )
      })}
    </div>
  )
}
