import { forwardRef, memo, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import BScroll from 'better-scroll';
import '../Loading/index'
import Loading from "../Loading/index";
import LoadingV2 from "../Loading-V2";
import { debounce } from "@/utils";

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


  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () =>{
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp,pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos: {y: number}) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }

    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

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

  const PullUpDisplayStyle = pullUpLoading ? {display: ""} : { display:"none" };
  const PullDownDisplayStyle = pullDownLoading ? { display: ""} : { display:"none" };
  return (
    <div ref={scrollContainerRef} className="w-full h-full overflow-hidden">
      {props.children}
      {/* 底部加载 */}
      <div 
        className="absolute left-0 right-0 w-15 h-15 m-auto z-100"
        style={ PullUpDisplayStyle }
      >
        <Loading></Loading>
      </div>
      {/* 顶部刷新 */}
      <div 
        className="absolute left-0 right-0 top-0 h-30px m-auto z-100"
        style={ PullDownDisplayStyle }
      >
        <LoadingV2></LoadingV2>
      </div>
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