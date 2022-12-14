import Loading from "@/components/Loading"
import RecommendList from "@/components/RecommendList"
import Scroll from "@/components/Scroll"
import Slider from "@/components/Slider"
import { useSelector, useDispatch } from "@/hooks/store"
import { getBannerList, getRecommendList } from "@/store/recommend"
import { memo, useEffect } from "react"
import { forceCheck } from 'react-lazyload';

function Recommend(props) {
  const { bannerList, recommendList, loading } = useSelector(state => state.recommend)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.length) dispatch(getBannerList())
    if (!recommendList.length) dispatch(getRecommendList())
  }, [])

  return (
    <div className="fixed top-90px bottom-0 w-full">
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      { loading ? <Loading /> : null }
    </div>  
    
  )
}

export default memo(Recommend)