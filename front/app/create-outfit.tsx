import React, { useState, useEffect, useRef } from 'react';
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

  // Refs to store references to the scrollviews
  const topClothingScrollViewRef = useRef(null);
  const bottomClothingScrollViewRef = useRef(null);

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

  const handleRandomClothing = () => {
    // Filter out clothing by type
    const topClothing = clothing.filter((item) => item.tag === 'TOP');
    const bottomClothing = clothing.filter((item) => item.tag === 'BOTTOM');

    // Select a random item from each
    const randomTop = topClothing[Math.floor(Math.random() * topClothing.length)];
    const randomBottom = bottomClothing[Math.floor(Math.random() * bottomClothing.length)];

    // Set the random selections as the selected top and bottom
    setSelectedTop(randomTop);
    setSelectedBottom(randomBottom);
  };

  // Scroll to selected item in the top clothing list and center it
  const scrollToSelectedTop = (id) => {
    const index = clothing.findIndex((item) => item.id === id);
    if (topClothingScrollViewRef.current && index !== -1) {
      const itemWidth = 180; // Each clothing item width
      const screenWidth = 300; // Scroll view width (adjust if needed)
      const offset = (index * itemWidth) - (screenWidth / 2) + (itemWidth / 2); // Center the item

      topClothingScrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  // Scroll to selected item in the bottom clothing list and center it
  const scrollToSelectedBottom = (id) => {
    const index = clothing.findIndex((item) => item.id === id);
    if (bottomClothingScrollViewRef.current && index !== -1) {
      const itemWidth = 180; // Each clothing item width
      const screenWidth = 300; // Scroll view width (adjust if needed)
      const offset = (index * itemWidth) - (screenWidth / 2) + (itemWidth / 2); // Center the item

      bottomClothingScrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  useEffect(() => {
    if (selectedTop) {
      scrollToSelectedTop(selectedTop.id);
    }
  }, [selectedTop]);

  useEffect(() => {
    if (selectedBottom) {
      scrollToSelectedBottom(selectedBottom.id);
    }
  }, [selectedBottom]);

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={topClothingScrollViewRef}
      >
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
                source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Select Bottom Clothing */}
      <Text style={styles.clothingLabel}>Select Bottom Clothing:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={bottomClothingScrollViewRef}
      >
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
                source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Random Select Button */}
      <View style={styles.buttonContainer}>
        <Button title="Generate Outfit" onPress={handleRandomClothing} />
      </View>

      {/* Create Outfit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Create Outfit" onPress={handleCreateOutfit} disabled={loading} />
        {loading && <Text>Creating outfit...</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start', // Ensure content is aligned to the top
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imageContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  selectedItem: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateOutfit;
