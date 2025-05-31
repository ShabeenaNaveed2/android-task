import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types/Interface';
import { INTER_BOLD, INTER_MEDIUM } from '../styles/font';
import { colors } from '../styles/colors'

const TaskItem = ({ task }: { task: Task }) => (
  <View style={styles.card}>
    <View style={[styles.colorBar, { backgroundColor: task.colorCode }]} />
    <View style={styles.details}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.subtitle}>{task.task}</Text>
      <Text style={styles.description}>{task.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 12,
  },
  colorBar: {
    width: 25,
    borderRadius: 4,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: INTER_BOLD,
    marginBottom: 4,
    color: colors.DarkGray,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: INTER_MEDIUM,
    color: colors.MediumGray,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: colors.Grey,
  },
});

export default TaskItem;
