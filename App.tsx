import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { startBackgroundTask, stopBackgroundTask } from './src/components/FetchWorker';

const App = () => {
  useEffect(() => {
    let isMounted = true;
    const startTask = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 9000));
        if (isMounted) {
          await startBackgroundTask();
        }
      } catch (e) {
      }
    };

    startTask();
    return () => {
      isMounted = false;
      try {
        stopBackgroundTask();
      } catch (e) {
      }
    };
  }, []);
  return <AppNavigator />;
};

export default App;
