import Scroll from "@/components/Scroll"
import './style.scss'
import { useDispatch, useSelector } from "@/hooks/store"
import { getRankList } from "@/store/rank"
import { filterIndex } from "@/utils"
import { memo, useEffect } from "react"

function Rank(props) {

  const { rankList, loading } = useSelector(state => state.rank)

  const dispatch = useDispatch()

  let globalStartIndex = filterIndex(rankList),
  officialList = rankList.slice(0, globalStartIndex),
  globalList = rankList.slice(globalStartIndex)

  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankList())
    }
  }, [])

  const renderSongList = (list) => {
    return list.length ? (
      <ul className="song-list">
        {list.map((item, index) => (
          <li className="break-all" key={index}>{index + 1}. {item.first} - {item.second}</li>
        ))}
      </ul>
    ) : null
  }

  const renderRankList = (list, type: string) => {
    return (
      <ul className={type === 'official' ? 'list-wrapper' : 'list-wrapper flex'}>
        {
          list.map((item, index) => (
            <li 
              className={`
                list-child 
                ${item.tracks.length ? 'flex' :''}
              `} 
              key={index}
            >
              <div 
                className={`
                  img_wrapper
                  ${item.tracks.length 
                    ? 'w-27vw h-27vw' 
                    : 'w-32vw h-32vw'
                  }
                `}
              >
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks) }
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <div className="rank-container">
      <Scroll>
        <div>
          <h1 className="official" style={{display: loading ? 'none' : ''}}> 官方榜 </h1>
          { renderRankList(officialList, 'official') }
          <h1 className="global" style={{display: loading ? 'none' : ''}}> 官方榜 </h1>
          { renderRankList(globalList, 'global') }
          {/* { loading ? <Load} */}
        </div>
      </Scroll>
    </div>
  )
}

export default memo(Rank)