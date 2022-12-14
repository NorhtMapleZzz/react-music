import { createContext, ReactNode, useReducer } from "react";

interface InitData {
  category: string
  alpha: string
}

interface ActionTypes {
  type: string
  payload: Partial<InitData>
}

interface CategoryContextType {
  state: InitData
  ctxDispatch: (params: ActionTypes) => void
}

const initData: InitData = {
  category: '',
  alpha: ''
}



export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

const reducer = (state: InitData, action: ActionTypes) => {
  const { type, payload } = action
  switch (type) {
    case CHANGE_CATEGORY:
      return { ...state, ...payload }
    case CHANGE_ALPHA:
      return { ...state, ...payload }
    default:
      return { ...state }
  }
}

export const Data = (props: { children: ReactNode }) => {
  const [state, ctxDispatch] = useReducer(reducer, initData)

  return (
    <CategoryContext.Provider value={{state, ctxDispatch}}>
      {props.children}
    </CategoryContext.Provider>
  )
}