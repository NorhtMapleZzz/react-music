import { memo } from "react"

function Loading() {
  return (
    <div className="loading-wrapper">
      <div></div>
      <div></div>
    </div>
  )
}

export default memo(Loading)