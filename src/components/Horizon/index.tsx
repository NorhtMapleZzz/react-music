import React, { memo, useEffect, useRef } from "react";
import Scroll from "../Scroll";
import './index.scss'

export type HorizonProps = {
  list: Array<any>,
  oldVal: string
  title: string
  handleClick: (...args) => void
}


function Horizon(props: HorizonProps) {

  const { list, oldVal, title } = props
  const { handleClick } = props

  return (
    <React.Fragment>
      <Scroll direction="horizontal">
        <div className="list">
          <span>{title}</span>
          {
            list.map(item => (
              <div className={
                "horizon-item" + (oldVal === item.key ? ' selected' : '')}
                key={item.key}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </div>
            ))
          }
        </div>     
      </Scroll>
    </React.Fragment>
    
  )
}

Horizon.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}

export default memo(Horizon)