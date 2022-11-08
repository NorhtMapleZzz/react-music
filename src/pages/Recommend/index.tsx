import RecommendList from "@/components/RecommendList"
import Scroll from "@/components/Scroll"
import Slider from "@/components/Slider"
import { useAppDispatch, useAppSelector } from "@/hooks/store"
import { getBannerList, getRecommendList } from "@/store/reducer"
import { memo, useEffect } from "react"

function Recommend(props) {
  const { bannerList, recommendList } = useAppSelector(state => state.recommend)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBannerList())
    dispatch(getRecommendList())
  }, [])

  return (
    <div className="fixed top-90px bottom-0 w-full">
      <Scroll>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </div>  
    
  )
}

export default memo(Recommend)