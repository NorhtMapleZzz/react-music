import { alphaTypes, categoryTypes } from "@/api/config"
import Horizon from "@/components/Horizon"
import Scroll from "@/components/Scroll"
import { memo, useState } from "react"
import './style.scss';

const singerList = [1,2,3,4,5,6,7,8,9,10].map(item => {
  return {
    picUrl: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
    name: '隔壁老范',
    accountId: 277313426,
  }
})

const renderSingerList = () => {
  return (
    <div className="singer-list">
      {
        singerList.map((item, index) => (
          <div className="singer-item" key={index}>
            <div className="mr-20px">
              <img className="w-50px h-50px rounded-3px" src={`${item.picUrl}?param=300x300`} alt="music" />
            </div>
            <span className="text-14px text-#2E3030 font-500">{item.name}</span>
          </div>
        ))
      }
    </div>
  )
}

function Singers(props) {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
 
  return (
    <div className="nav-container">
      <Horizon 
        list={categoryTypes} 
        title={'分类 (默认热门):'}
        oldVal={category}
        handleClick={setCategory}
      />
      <Horizon 
        list={alphaTypes} 
        title={"首字母:"}
        oldVal={alpha}
        handleClick={setAlpha}
      />
      <div className="list-container">
        <Scroll>
          { renderSingerList() }
        </Scroll>
      </div>
    </div>  
  )
}

export default memo(Singers)