import { memo } from "react"

function LoadingV2() {
  return (
    <div className="loading-v2">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </div>
  )
}
export default memo(LoadingV2)