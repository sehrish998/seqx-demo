import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { IRootState, IAppDispatch } from './redux';

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
