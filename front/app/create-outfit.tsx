import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateOutfit = () => {
  const [userId, setUserId] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [clothing, setClothing] = useState([]);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch userId from AsyncStorage
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setUserId(userId || '');
    };
    fetchUserId();

    // Fetch user's clothing from API
    const fetchClothing = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8081/api/clothing?userId=${userId}`);
        const clothingData = await response.json();
        setClothing(clothingData);
      } catch (error) {
        alert('Error fetching clothing.');
      }
    };

    if (userId) {
      fetchClothing();
    }
  }, [userId]);

  const handleCreateOutfit = async () => {
    if (!outfitName || !selectedTop || !selectedBottom) {
      // Handle validation for missing outfit name or clothing items
      alert('Please provide outfit name and select both top and bottom clothing.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8081/api/outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: outfitName,
          topId: selectedTop.id,
          bottomId: selectedBottom.id,
          userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Navigate to the outfits screen or another appropriate screen
        router.push({ pathname: '/(tabs)/outfit' });
      } else {
        alert('Failed to create outfit.');
      }
    } catch (error) {
      alert('An error occurred while creating the outfit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Outfit Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={outfitName}
        onChangeText={setOutfitName}
      />

      {/* Select Top Clothing */}
      <Text style={styles.clothingLabel}>Select Top Clothing:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {clothing
          .filter((item) => item.tag === 'TOP')
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.imageContainer,
                selectedTop?.id === item.id && styles.selectedItem,
              ]}
              onPress={() => setSelectedTop(item)}
            >
              <Image
                source={{ uri: `data:image/png;base64,${item.imageBase64}` }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Select Bottom Clothing */}
      <Text style={styles.clothingLabel}>Select Bottom Clothing:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {clothing
          .filter((item) => item.tag === 'BOTTOM')
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.imageContainer,
                selectedBottom?.id === item.id && styles.selectedItem,
              ]}
              onPress={() => setSelectedBottom(item)}
            >
              <Image
                source={{ uri: `data:image/png;base64,${item.imageBase64}` }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Create Outfit Button */}
      <Button title="Create" onPress={handleCreateOutfit} disabled={loading} />
      {loading && <Text>Creating outfit...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  clothingLabel: {
    fontSize: 16,  // Increased the font size for better visibility
    fontWeight: 'bold',  // Made the font bold
    marginBottom: 8,  // Added space between the text and the ScrollView
  },
  imageContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,  // Increased the container size significantly
    height: 180, // Increased the container height significantly
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    width: '100%', // Let the image take up the full width of the container
    height: '100%', // Let the image take up the full height of the container
    resizeMode: 'contain', // Ensure image is not stretched
  },
  selectedItem: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});

export default CreateOutfit;
