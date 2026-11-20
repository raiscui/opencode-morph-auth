const PROVIDER = "morph"
const OPENAI_BASE = "https://api.morphllm.com/v1"

// Docs: https://docs.morphllm.com/sdk/components/fast-models
// All chat models: 1M context, tools + structured output + reasoning, OpenAI Chat
// Completions and Anthropic Messages on the same key.
const CHAT_MODELS = {
  "morph-kimik31": {
    name: "Kimi K3.1 Pro",
    limit: { context: 1_000_000, output: 65536 },
    reasoning: true,
    tool_call: true,
  },
  "morph-glm53-744b": {
    name: "GLM-5.3 744B",
    limit: { context: 1_000_000, output: 65536 },
    reasoning: true,
    tool_call: true,
  },
  "morph-glm53flash": {
    name: "GLM-5.3-Flash",
    limit: { context: 1_000_000, output: 65536 },
    reasoning: true,
    tool_call: true,
    attachment: true,
  },
  "morph-dsv41flash": {
    name: "DeepSeek V4.1 Flash",
    limit: { context: 1_000_000, output: 65536 },
    reasoning: true,
    tool_call: true,
    attachment: true,
  },
  "morph-dsv41flash-1017": {
    name: "DeepSeek V4.1 Flash 1017",
    limit: { context: 1_000_000, output: 65536 },
    reasoning: true,
    tool_call: true,
    attachment: true,
  },
}

export const MorphAuthPlugin = async () => ({
  config: async (cfg) => {
    cfg.provider ??= {}
    cfg.provider[PROVIDER] ??= {
      name: "Morph",
      npm: "@ai-sdk/openai-compatible",
      api: OPENAI_BASE,
      models: CHAT_MODELS,
    }
  },

  auth: {
    provider: PROVIDER,
    methods: [{ type: "api", label: "Morph API key", placeholder: "morph-…" }],
    async loader(getAuth) {
      const auth = await getAuth()
      if (auth?.type !== "api") return {}
      return {
        baseURL: OPENAI_BASE,
        async fetch(input, init) {
          const headers = new Headers(init?.headers)
          headers.set("authorization", `Bearer ${auth.key}`)
          return fetch(input, { ...init, headers })
        },
      }
    },
  },

  provider: {
    id: PROVIDER,
    // models.dev carries Morph's whole catalog, Fast Apply / WarpGrep entries
    // included; expose only the chat models picked for this plugin.
    async models(provider) {
      const picked = Object.fromEntries(
        Object.keys(CHAT_MODELS)
          .filter((id) => provider.models[id])
          .map((id) => [id, provider.models[id]]),
      )
      return Object.keys(picked).length ? picked : provider.models
    },
  },
})

export default { id: "morph-auth", server: MorphAuthPlugin }
