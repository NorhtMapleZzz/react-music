import { defineConfig, presetUno, presetAttributify, transformerDirectives } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
})