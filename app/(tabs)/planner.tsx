import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Store {
  id: string;
  name: string;
  distance: string;
  pointsMultiplier: number;
  cashback: number;
  deals: string[];
  isEcoFriendly: boolean;
}

const mockStores: Store[] = [
  {
    id: '1',
    name: 'Organic Grocer',
    distance: '0.5 miles',
    pointsMultiplier: 2,
    cashback: 5,
    deals: [
      'Double points on organic produce',
      '10% off bulk items',
      'Free reusable bag with $50 purchase'
    ],
    isEcoFriendly: true,
  },
  {
    id: '2',
    name: 'Wellness Market',
    distance: '1.2 miles',
    pointsMultiplier: 1.5,
    cashback: 3,
    deals: [
      '50% more points on supplements',
      'Buy one get one 50% off on smoothies',
      'Free wellness consultation'
    ],
    isEcoFriendly: true,
  },
  {
    id: '3',
    name: 'Fresh Pantry',
    distance: '0.8 miles',
    pointsMultiplier: 1,
    cashback: 2,
    deals: [
      'Triple points on first purchase',
      'Free delivery on orders over $30',
      'Member-exclusive discounts'
    ],
    isEcoFriendly: false,
  },
];

export default function PlannerScreen() {
  const insets = useSafeAreaInsets();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [filters, setFilters] = useState({
    ecoFriendly: false,
    maxCashback: false,
    sortByPoints: false,
  });

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredStores = [...mockStores].sort((a, b) => {
    if (filters.ecoFriendly && a.isEcoFriendly !== b.isEcoFriendly) {
      return a.isEcoFriendly ? -1 : 1;
    }
    if (filters.maxCashback) {
      return b.cashback - a.cashback;
    }
    if (filters.sortByPoints) {
      return b.pointsMultiplier - a.pointsMultiplier;
    }
    return 0;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Shopping Planner</ThemedText>
        <ThemedText style={styles.subtitle}>Plan your wellness shopping trip</ThemedText>
      </ThemedView>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filters.ecoFriendly && styles.filterButtonActive]}
          onPress={() => toggleFilter('ecoFriendly')}
        >
          <IconSymbol name="leaf.fill" size={20} color={filters.ecoFriendly ? '#4CAF50' : '#718096'} />
          <ThemedText style={[styles.filterText, filters.ecoFriendly && styles.filterTextActive]}>
            Eco-friendly
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filters.maxCashback && styles.filterButtonActive]}
          onPress={() => toggleFilter('maxCashback')}
        >
          <IconSymbol name="dollarsign.circle.fill" size={20} color={filters.maxCashback ? '#4CAF50' : '#718096'} />
          <ThemedText style={[styles.filterText, filters.maxCashback && styles.filterTextActive]}>
            Max Cashback
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filters.sortByPoints && styles.filterButtonActive]}
          onPress={() => toggleFilter('sortByPoints')}
        >
          <IconSymbol name="star.fill" size={20} color={filters.sortByPoints ? '#4CAF50' : '#718096'} />
          <ThemedText style={[styles.filterText, filters.sortByPoints && styles.filterTextActive]}>
            Points
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.storesContainer}>
        {filteredStores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={[styles.storeCard, selectedStore?.id === store.id && styles.storeCardSelected]}
            onPress={() => setSelectedStore(store)}
          >
            <View style={styles.storeHeader}>
              <ThemedText type="title" style={styles.storeName}>{store.name}</ThemedText>
              {store.isEcoFriendly && (
                <View style={styles.ecoBadge}>
                  <IconSymbol name="leaf.fill" size={16} color="#4CAF50" />
                </View>
              )}
            </View>
            
            <View style={styles.storeDetails}>
              <View style={styles.detailRow}>
                <IconSymbol name="location.fill" size={16} color="#718096" />
                <ThemedText style={styles.detailText}>{store.distance}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <IconSymbol name="star.fill" size={16} color="#718096" />
                <ThemedText style={styles.detailText}>{store.pointsMultiplier}x points</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <IconSymbol name="dollarsign.circle.fill" size={16} color="#718096" />
                <ThemedText style={styles.detailText}>{store.cashback}% cashback</ThemedText>
              </View>
            </View>

            {selectedStore?.id === store.id && (
              <View style={styles.dealsContainer}>
                <ThemedText style={styles.dealsTitle}>Current Deals</ThemedText>
                {store.deals.map((deal, index) => (
                  <View key={index} style={styles.dealItem}>
                    <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
                    <ThemedText style={styles.dealText}>{deal}</ThemedText>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
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
    color: '#718096',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#E8F5E9',
  },
  filterText: {
    fontSize: 14,
    color: '#718096',
  },
  filterTextActive: {
    color: '#4CAF50',
  },
  storesContainer: {
    flex: 1,
    padding: 20,
  },
  storeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeCardSelected: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeName: {
    fontSize: 20,
  },
  ecoBadge: {
    backgroundColor: '#E8F5E9',
    padding: 6,
    borderRadius: 12,
  },
  storeDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#718096',
  },
  dealsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  dealsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2D3748',
  },
  dealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dealText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
}); 