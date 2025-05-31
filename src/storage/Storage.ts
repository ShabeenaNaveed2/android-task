import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Interface';

const STORAGE_KEY = 'TASK_LIST';
export const storeTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getStoredTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
