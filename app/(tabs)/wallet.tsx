import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { LoyaltyCard } from "@/components/LoyaltyCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Theme";

const mockCards = [
  {
    id: "1",
    title: "Tea Haven",
    currentPoints: 450,
    nextReward: "Free Matcha Latte",
    pointsToNextReward: 50,
  },
  {
    id: "2",
    title: "Wellness Cafe",
    currentPoints: 780,
    nextReward: "20% Off Next Purchase",
    pointsToNextReward: 220,
  },
  {
    id: "3",
    title: "Organic Bites",
    currentPoints: 1200,
    nextReward: "Free Smoothie",
    pointsToNextReward: 300,
  },
];

export default function WalletScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Wallet
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          All your loyalty cards in one place
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.cardsContainer}>
        {mockCards.map((card) => (
          <View key={card.id} style={styles.cardWrapper}>
            <LoyaltyCard
              title={card.title}
              currentPoints={card.currentPoints}
              nextReward={card.nextReward}
              pointsToNextReward={card.pointsToNextReward}
              onPress={() => console.log(`${card.title} card pressed`)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#718096",
  },
  cardsContainer: {
    flex: 1,
    padding: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
});
