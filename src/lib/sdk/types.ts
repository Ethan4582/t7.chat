export type Provider = 'groq' | 'meta' | 'mistral' | 'google'

export type ModelId = 
  | 'llama-3.3-70b-versatile'
  | 'llama-3.1-8b-instant'
  | 'mixtral-8x7b-32768'
  | 'gemma2-9b-it'

export interface LLMProvider {
  id: Provider
  models: ModelId[]
  chat(messages: ChatMessage[], model: ModelId): AsyncGenerator<string>
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface InferenceLog {
  session_id: string
  provider: Provider
  model: ModelId
  latency_ms: number
  prompt_tokens: number
  completion_tokens: number
  status: 'success' | 'error'
  input_preview: string   // first 100 chars, PII redacted
  output_preview: string  // first 100 chars, PII redacted
  error?: string
}