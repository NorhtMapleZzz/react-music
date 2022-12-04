import { forwardRef, memo, Ref, useEffect, useImperativeHandle, useRef, useState } from "react"
import BScroll from 'better-scroll';

type Props = {
  direction: 'vertical' | 'horizontal'
  click: boolean
  refresh: boolean
  onScroll: (e: Event) => void
  pullUp: () => void
  pullDown: () => void
  pullUpLoading: boolean
  pullDownLoading: boolean
  bounceTop: boolean
  bounceBottom: boolean
  children?: React.ReactNode
}

const Scroll = forwardRef((props: Partial<Props>, ref: Ref<any>) => {
  const [bScroll, setBScroll] = useState<BScroll>()
  
  const scrollContainerRef = useRef()
  
  const { direction, click, refresh, bounceTop, bounceBottom } = props
  const { onScroll, pullUp, pullDown, pullUpLoading, pullDownLoading } = props

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])
  
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () =>{
      bScroll.off('scrollEnd')
    }
  }, [pullUp, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', (pos: {y: number}) => {
      if (pos.y > 50) {
        pullDown()
        console.log(2);
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, bScroll])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) return bScroll
    }
  }))

  return (
    <div ref={scrollContainerRef} className="w-full h-full overflow-hidden">
      {props.children}
    </div>
  )
})

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

export default memo(Scroll)