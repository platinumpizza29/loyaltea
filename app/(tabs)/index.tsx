import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { LoyaltyCard } from '@/components/LoyaltyCard';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>My Loyalty Cards</ThemedText>
        <ThemedText style={styles.subtitle}>Track your rewards and points</ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardsContainer}>
        <LoyaltyCard
          title="Tea Haven"
          currentPoints={450}
          nextReward="Free Matcha Latte"
          pointsToNextReward={50}
          onPress={() => console.log('Tea Haven card pressed')}
        />
        <LoyaltyCard
          title="Wellness Cafe"
          currentPoints={780}
          nextReward="20% Off Next Purchase"
          pointsToNextReward={220}
          onPress={() => console.log('Wellness Cafe card pressed')}
        />
        <LoyaltyCard
          title="Organic Bites"
          currentPoints={1200}
          nextReward="Free Smoothie"
          pointsToNextReward={300}
          onPress={() => console.log('Organic Bites card pressed')}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  cardsContainer: {
    padding: 20,
    gap: 16,
  },
});
