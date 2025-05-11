import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LoyaltyCardProps {
  title: string;
  currentPoints: number;
  nextReward: string;
  pointsToNextReward: number;
  onPress?: () => void;
}

export const LoyaltyCard: React.FC<LoyaltyCardProps> = ({
  title,
  currentPoints,
  nextReward,
  pointsToNextReward,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={['#F5F7FA', '#E4E8F0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Current Points</Text>
            <Text style={styles.pointsValue}>{currentPoints}</Text>
          </View>
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardLabel}>Next Reward</Text>
            <Text style={styles.rewardValue}>{nextReward}</Text>
            <Text style={styles.pointsToNext}>
              {pointsToNextReward} points to go
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  pointsContainer: {
    marginTop: 5,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A5568',
  },
  rewardContainer: {
    marginTop: 5,
  },
  rewardLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
  },
  pointsToNext: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
}); 