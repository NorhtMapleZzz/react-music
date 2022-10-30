import { defineConfig, presetUno, presetAttributify, transformerDirectives } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: {
    // 'extend-click': 'relative before:absolute before:-inset-[10px]',
    // 'uno-top': 'flex justify-between py-[5px] px-[10px] bg-[#d44439] \
    //   [&>span]:(leading-[40px] text-[#f1f1f1] text-[20px])',
    // 'uno-tab': 'h-[44px] flex justify-around bg-[#d44439] [&>a]:(flex-1 py-[2px] text-[14px] text-[#e4e4e4])',
    // 'uno-selected': '[&>span]:(py-[3px] font-bold border-solid \
    //   text-[#f1f1f1] border-bottom-2 border-[#f1f1f1])',
    // 'uno-tab-item': 'h-full flex justify-center items-center',
    // 'slider-container': 'relative '
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
})