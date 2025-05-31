import BackgroundService from 'react-native-background-actions';
import { fetchAccessToken, fetchTasks } from '../api/Api';
import { storeTasks } from '../storage/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sleep = (time: number) =>
  new Promise<void>(resolve => setTimeout(resolve, time));

const backgroundTask = async (taskData?: { delay: number }) => {
  const delay = taskData?.delay ?? 60 * 60 * 1000;

  while (BackgroundService.isRunning()) {
    try {
      const token = await fetchAccessToken();
      const tasks = await fetchTasks(token);
      await storeTasks(tasks);

      const timestamp = new Date().toISOString();
      await AsyncStorage.setItem('lastBackgroundFetch', timestamp);
    } catch (err) {
    }
    await sleep(delay);
  }
};
const options = {
  taskName: 'TaskSync',
  taskTitle: 'Task Sync Running',
  taskDesc: 'Updating tasks every 60 minutes...',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: { delay: 60 * 60 * 1000 },
};

export const startBackgroundTask = async () => {
  if (!BackgroundService.isRunning()) {
    await BackgroundService.start(backgroundTask, options);
  }
};

export const stopBackgroundTask = async () => {
  await BackgroundService.stop();
};
