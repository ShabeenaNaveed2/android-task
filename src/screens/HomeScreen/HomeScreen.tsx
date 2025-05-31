import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { View, FlatList, TextInput, RefreshControl, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import {styles} from './styles'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAccessToken, fetchTasks } from '../../api/Api';
import { storeTasks, getStoredTasks } from '../../storage/Storage';
import TaskItem from '../../components/TaskItem';
import { Task } from '../../types/Interface';

type RootStackParamList = {
  Home: { scannedCode?: string } | undefined;
  QRScanner: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtered, setFiltered] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadTasks = useCallback(async () => {
    try {
      const token = await fetchAccessToken();
      const data = await fetchTasks(token);
      await storeTasks(data);
      setTasks(data);
      setFiltered(data);
    } catch (e) {
      try {
        const fallback = await getStoredTasks();
        setTasks(fallback);
        setFiltered(fallback);
      } catch (err) {
        Alert.alert('Error', 'Failed to load tasks from both network and cache.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('lastBackgroundFetch').catch(() => { });
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      tasks.filter(t =>
        Object.values(t).some(val =>
          String(val).toLowerCase().startsWith(q)
        )
      )
    );
  }, [search, tasks]);

  useEffect(() => {
    if (route.params?.scannedCode) {
      const scanned = route.params.scannedCode.trim();
      setSearch(scanned);
    }
  }, [route.params?.scannedCode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('QRScanner' as never)}>
          <Icon
            name="qrcode-scan"
            type="material-community"
            size={25}
            color="#000"
          />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: {
        paddingRight: 30,
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="black" />
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.task}
          renderItem={({ item }) => <TaskItem task={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await loadTasks();
                setRefreshing(false);
              }}
            />
          }
        />
      )}
    </View>
  );
};


export default HomeScreen;
