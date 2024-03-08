import axios from 'axios';
import { Alert } from 'react-native';
import {useQuery} from 'react-query';

async function useGetAllTodosRequest() {
  try {
    const res: any = await axios.get<any>(`https://jsonplaceholder.typicode.com/posts`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export function useGetAllTodo() {
  return useQuery(['/useGetAllTodos'], () =>
  useGetAllTodosRequest(),
  );
}