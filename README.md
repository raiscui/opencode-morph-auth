# opencode-morph-auth

OpenCode provider plugin for [Morph](https://morphllm.com) open-weight models,
usable in OpenCode and [magpie](https://usemagpie.ai).

Signs in with a Morph API key (from the
[dashboard](https://morphllm.com/dashboard/api-keys)); no browser flow needed.
All models serve OpenAI Chat Completions at `https://api.morphllm.com/v1`.

## Models

| Model id | Name | Multimodal |
|---|---|---|
| morph-kimik31 | Kimi K3.1 Pro | text |
| morph-glm53-744b | GLM-5.3 744B | text |
| morph-glm53flash | GLM-5.3-Flash | image input |
| morph-dsv41flash | DeepSeek V4.1 Flash | image input |
| morph-dsv41flash-1017 | DeepSeek V4.1 Flash 1017 | image input |

All: 1M context, tools, structured output, reasoning. Pricing:
https://www.morphllm.com/pricing

## Install (magpie)

```sh
git clone https://github.com/raiscui/opencode-morph-auth ~/.local/share/magpie-plugins/
magpie plugin add ~/.local/share/magpie-plugins/opencode-morph-auth
magpie plugin login morph   # paste the API key
magpie provider test morph
```

In the app: Plugins → Add a plugin → give this folder, then sign in from the
provider row.

## Note

- Morph also serves Anthropic Messages at `/v1/messages`; this plugin uses the
  OpenAI-compatible surface via `@ai-sdk/openai-compatible`. magpie's gateway
  translates any agent API into chat completions, so Anthropic-speaking agents
  work too.
- `morph-dsv41flash-abliterated` needs vendor approval and is deliberately
  not listed; add it in `CHAT_MODELS` once your account has access.
