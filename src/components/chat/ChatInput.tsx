'use client'

import { useState, useRef, useEffect } from 'react'
import type { ModelId } from '@/lib/sdk/types'
import { PROVIDERS } from '@/constants/models'
import { Loader2, ArrowUp } from 'lucide-react'

interface Props {
  onSend: (content: string) => void
  onStop: () => void
  isStreaming: boolean
  model: ModelId
  setModel: (m: ModelId) => void
}

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Zap, Search, Paperclip, ChevronDown } from 'lucide-react'

export default function ChatInput({ onSend, onStop, isStreaming, model, setModel }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isStreaming) textareaRef.current?.focus()
  }, [isStreaming])

  const adjustHeight = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    adjustHeight()
  }

  const handleSubmit = () => {
    if (!value.trim() || isStreaming) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="px-4 pb-6 md:px-6 pt-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md shadow-sm focus-within:ring-1 focus-within:ring-ring/30 focus-within:bg-card/60 transition-all">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows={1}
            disabled={isStreaming}
            className="w-full resize-none bg-transparent border-none px-5 pt-5 pb-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50 min-h-[52px] max-h-[160px]"
          />

          <div className="flex items-center justify-between px-3 pb-3">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    disabled={isStreaming}
                    className="flex items-center gap-1.5 rounded-lg bg-card/50 text-muted-foreground border border-border/50 px-2.5 py-1.5 text-[13px] font-medium hover:text-foreground hover:bg-card focus:outline-none transition-colors"
                  >
                    {PROVIDERS.flatMap(p => p.models).find(m => m.id === (model || 'llama-3.3-70b-versatile'))?.label || 'LLaMA 3.3 70B'}
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] bg-card border-border shadow-lg">
                  {PROVIDERS.map((p, index) => (
                    <div key={p.id}>
                      {index > 0 && <DropdownMenuSeparator className="bg-border/50" />}
                      <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wider px-2 py-1.5">
                        {p.label}
                      </DropdownMenuLabel>
                      {p.models.map(m => (
                        <DropdownMenuItem
                          key={m.id}
                          onClick={() => setModel(m.id)}
                          className={`text-[13px] px-2.5 py-1.5 cursor-pointer rounded-md mx-1 mb-0.5 ${model === m.id ? 'bg-primary/10 text-primary font-medium focus:bg-primary/15' : 'text-foreground/90 focus:bg-muted/50'}`}
                        >
                          {m.label}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

  

              
            </div>

            <div className="flex items-center gap-3">
              {value.length > 0 && (
                <span className="text-[10px] text-muted-foreground/40">{value.length}</span>
              )}
              {isStreaming ? (
                <button
                  onClick={onStop}
                  className="w-8 h-8 rounded-full bg-destructive hover:bg-destructive/90 flex items-center justify-center transition-colors shadow-sm"
                >
                  <Loader2 className="w-4 h-4 text-destructive-foreground animate-spin" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!value.trim()}
                  className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-30 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowUp className="w-4 h-4 text-primary-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
