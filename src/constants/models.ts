import type { Provider, ModelId } from '@/lib/sdk/types'

export interface ProviderConfig {
  id: Provider
  label: string
  models: { id: ModelId; label: string }[]
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'meta',
    label: 'Meta',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'LLaMA 3.3 70B' },
      { id: 'llama-3.1-8b-instant',    label: 'LLaMA 3.1 8B' },
    ]
  },
  {
    id: 'mistral',
    label: 'Mistral',
    models: [
      { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
    ]
  },
  {
    id: 'google',
    label: 'Google',
    models: [
      { id: 'gemma2-9b-it', label: 'Gemma 2 9B' },
    ]
  },
]