import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-web";
import NavBar from "../components/navBar";
import SearchByLocationBar from "../components/SearchByLocationBar";
import ViewRestaurants, { testRestaurants, } from "../components/viewRestaurants";


export default function HomeScreen({ navigation }) {
  const [restaurantResults, getRestaurantResults] = useState(testRestaurants);
  const getYelpRestaurants = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer wZCH7TWc34mJfGGd8iA6nWXkFLwygn4_7MpPuVTSzMtvqPki5OGoQnjz4BjlhDmanub8LXN9EebsWOkhzgG1F6xeLYZlbEJf2dW5u6_FTGX0M0H9jzXsWeWMh30XZHYx'
      }
    };
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetURL = 'https://api.yelp.com/v3/businesses/search?location=LosAngeles&term=restaurants'
    return fetch(proxyUrl + targetURL, options)
      .then((response) => response.json())
      .then((json) => getRestaurantResults(json.businesses));
  };

  useEffect(() => {
    getYelpRestaurants();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subView}>
        <Text style={styles.title}>ZotFoods</Text>
        <SearchByLocationBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ViewRestaurants yelpData={restaurantResults} navigation={navigation} />
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    fontSize: "40px",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#eee", 
    flex: 1
  },
  subView: {
    backgroundColor: "white", 
    padding: 15
  },
  scrollOptions: {

  },
});