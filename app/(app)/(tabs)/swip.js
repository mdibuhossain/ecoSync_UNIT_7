import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";

const MyComponent = () => {
  const scrollViewRef = useRef(null);
  const [categories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
    "Category 11",
    "Category 12",
    "Category 13",
    "Category 14",
    "Category 15",
    "Category 16",
    "Category 17",
  ]);
  const [foods] = useState([
    { category: "Category 1", items: ["Food 1", "Food 2", "Food 3"] },
    { category: "Category 2", items: ["Food 4", "Food 5", "Food 6"] },
    { category: "Category 3", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 4", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 5", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 6", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 7", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 8", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 9", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 10", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 11", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 12", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 13", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 14", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 15", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 16", items: ["Food 7", "Food 8", "Food 9"] },
    { category: "Category 17", items: ["Food 7", "Food 8", "Food 9"] },
  ]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    // Scroll to selected category when it goes out of the visible area
    if (scrollViewRef.current) {
      const screenWidth = Dimensions.get("window").width;
      const categoryWidth = 140; // Adjust this value according to your category width
      const selectedCategoryOffset = selectedCategoryIndex * categoryWidth;
      const scrollViewWidth = screenWidth - 40; // Adjust this value according to your layout
      const maxVisibleCategories = Math.floor(scrollViewWidth / categoryWidth);

      if (selectedCategoryOffset > scrollViewWidth) {
        scrollViewRef.current.scrollTo({
          x: selectedCategoryOffset - (scrollViewWidth - categoryWidth),
          animated: true,
        });
      } else if (selectedCategoryIndex >= maxVisibleCategories) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      } else {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
      }
    }
  }, [selectedCategoryIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <Text
            key={index}
            style={[
              styles.category,
              index === selectedCategoryIndex && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            {category}
          </Text>
        ))}
      </ScrollView>

      <Swiper
        loop={false}
        index={selectedCategoryIndex}
        showsPagination={false}
        showsButtons={false}
        onIndexChanged={(index) => setSelectedCategoryIndex(index)}
      >
        {foods.map((foodCategory, index) => (
          <View key={index}>
            <FlatList
              data={foodCategory.items}
              renderItem={({ item }) => (
                <Text style={styles.foodItem}>{item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  category: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
    width: 70,
  },
  selectedCategory: {
    backgroundColor: "gray",
    color: "white",
  },
  foodItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MyComponent;
