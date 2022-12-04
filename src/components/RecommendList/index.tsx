import { getCount } from "@/utils"
import { memo } from "react"
import LazyLoad from 'react-lazyload';
import svg from '@/assets/react.svg'

export type RecList = {
  id: number
  picUrl: string
  playCount: number
  name: string
}

type RecommendListProps = {
  recommendList: Array<RecList>
}

function RecommendList(props: RecommendListProps) {

  return (
    <div className="list-wrapper">
      <h1 className="title"> 推荐歌单 </h1>
      <div className="w-full flex flex-wrap justify-around">
        {props.recommendList.map((item, index) => (
          <div className="relative w-[32%]" key={item.id + index}>
            <div className="relative h-0 pb-full">
              <div className="decorate"></div>
              {/* 加此参数可以减小请求的图片资源大小 ?param=300x300 */}
              <LazyLoad
                placeholder={
                  <img className="w-full h-full" src={svg} />
                } 
                alt="music"
              >
                <img 
                  className="absolute w-full h-full rounded-[3px]" 
                  src={item.picUrl + "?param=300x300"} 
                  alt="music"
                />
              </LazyLoad>
              <div className="play-count">
                <i className="iconfont align-top">&#xe885;</i>
                <span className="count">{getCount(item.playCount)}</span>
              </div>
            </div>
            <div className="desc">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(RecommendList)