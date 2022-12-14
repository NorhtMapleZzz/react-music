import { memo } from "react"


function Loading({show = true}) {
  return (
    <div 
      className="loading-wrapper"
      style={show ? {display: ''} : {display: 'none'}}
    >
      <div></div>
      <div></div>
    </div>
  )
}

export default memo(Loading)