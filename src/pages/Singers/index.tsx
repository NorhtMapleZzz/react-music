import { alphaTypes, categoryTypes } from "@/api/config"
import Horizon from "@/components/Horizon"
import Scroll from "@/components/Scroll"
import { useDispatch, useSelector } from "@/hooks/store";
import { memo, useContext, useEffect, useState } from "react"
import { getHotSingerList, getSingerList, singerSlice } from '@/store/singer'
import './style.scss';
import Loading from "@/components/Loading";
import  LazyLoad, { forceCheck } from 'react-lazyload';
import svg from '@/assets/react.svg'
import { CategoryContext, CHANGE_ALPHA, CHANGE_CATEGORY } from "./data";

function Singers(props) {
  const dispatch = useDispatch()

  // const [category, setCategory] = useState('')
  // const [alpha, setAlpha] = useState('')

  const { state, ctxDispatch } = useContext(CategoryContext)
  const {category, alpha} = state

  const { 
    singerList, 
    enterLoading, 
    pageCount, 
    pullDownLoading, 
    pullUpLoading 
  } = useSelector(state => state.singer)
  const { 
    setPageCount, 
    setPullUpLoading, 
    setPullDownLoading, 
    setEnterLoading 
  } = singerSlice.actions
  
  useEffect(() => {
    if (!singerList.length)  {
      dispatch(setEnterLoading(true))
      dispatch(getHotSingerList())
    }
  }, [])

  // 改变分类
  const changeCategory = (category: string) => {
    // 页数归零
    dispatch(setPageCount(0))
    dispatch(setEnterLoading(true))
    dispatch(getSingerList({category, alpha}))
    // setCategory(category)
    ctxDispatch({type: CHANGE_CATEGORY, payload: {category}})
  }

  const changeAlpha = (alpha: string) => {
    // 页数归零
    dispatch(setPageCount(0))
    dispatch(setEnterLoading(true))
    dispatch(getSingerList({category, alpha}))
    // setAlpha(alpha)
    ctxDispatch({type: CHANGE_ALPHA, payload: {alpha}})
  }

  const handlePullUp = () => {
    dispatch(setPullUpLoading(true))
    dispatch(setPageCount(pageCount + 1))
    if (!category) {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList({category, alpha}))
    }
  }

  const handlePullDown = () => {
    dispatch(setPullDownLoading(true))
    dispatch(setPageCount(0))
    if (!category) {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList({category, alpha}))
    }
  }

  const renderSingerList = () => {
    return (
      <div className="singer-list">
        {
          singerList.map((item, index) => (
            <div className="singer-item" key={index}>
              <div className="mr-20px">
                <LazyLoad
                  placeholder={
                    <img className="w-full h-full" src={svg} />
                  } 
                  alt="music"
                >
                  <img className="w-50px h-50px rounded-3px" src={`${item.picUrl}?param=300x300`} alt="music" />
                </LazyLoad>
              </div>
              <span className="text-14px text-#2E3030 font-500">{item.name}</span>
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <div className="nav-container">
      <Horizon 
        list={categoryTypes} 
        title={'分类 (默认热门1):'}
        oldVal={category}
        handleClick={changeCategory}
      />
      <Horizon 
        list={alphaTypes} 
        title={"首字母:"}
        oldVal={alpha}
        handleClick={changeAlpha}
      />
      <div className="list-container">
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={() => {handlePullDown()}}
          pullUpLoading={ pullUpLoading }
          pullDownLoading={ pullDownLoading }
        >
          { renderSingerList() }
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </div>
    </div>  
  )
}

export default memo(Singers)