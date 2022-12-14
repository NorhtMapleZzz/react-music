import { 
  TypedUseSelectorHook, 
  useSelector as useStoreSelector,
  useDispatch as useStoreDispatch
} from 'react-redux'
import type { RootState, AppDispatch } from '../store/index';

export const useDispatch: () => AppDispatch = useStoreDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useStoreSelector