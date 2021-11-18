import React, { Component, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { GetMoviesRequest, GetSearchMoviesRequest } from "../service";
import { Rating } from "react-native-ratings";

export default function HomeScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(search==""){
      searchMovieList();
    }else{
    // searchMovie();
    }
  });

  const searchMovieList = async () => {
    try {
      const result = await GetMoviesRequest("1");
      if(result=='error'){
        throw new Error("Cant complete request!");
      }else{
        // alert(JSON.stringify(result.data.results[0]));
        // setList(result.data.results);
        let movies: any[]= []
        if (result.data.results.length > 0) {
          result.data.results.forEach((movie: any) =>
            movies.push({
              id: movie.id,
              title: movie.title,
              image: "https://image.tmdb.org/t/p/w500" + movie.poster_path, //https://image.tmdb.org/t/p/w500/
              vote: movie.vote_average,
            })
          );
        }
        setList(movies)
        // alert(JSON.stringify(list));
      }
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }
  }

  const searchMovie = async () => {
    if(search!==""){
      try {
        const result = await GetSearchMoviesRequest(search);
        if(result=='error'){
          throw new Error("Cant complete request!");
        }else{
          // alert(JSON.stringify(result.data.results[0]));
          // setList(result.data.results);
          let movies: any[]= []
          if (result.data.results.length > 0) {
            result.data.results.forEach((movie: any) =>
              movies.push({
                id: movie.id,
                title: movie.title,
                image: "https://image.tmdb.org/t/p/w500/" + movie.poster_path, //https://image.tmdb.org/t/p/w500/
                vote: movie.vote_average,
              })
            );
          }
          setList(movies)
          // alert(JSON.stringify(list));
        }
      } catch (e) {
        Alert.alert(JSON.stringify(e));
      }
    }
  }

  const lookMovie = (text: string) => {
    setSearch(text);
  }

  const goDetail =(id: string) => {
    navigation.navigate("Detail", { movieId: id });
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello, what do you want watch?</Text>
        <View style={styles.contSearch}>
          <EvilIcons name="search" size={24} color="white" />
          <TextInput
            style={styles.searchStyle}
            placeholder="Search..."
            placeholderTextColor="#fff"
            onChangeText={(text) => lookMovie(text)}
            onSubmitEditing={() => searchMovie()}
            value={search}
          />
        </View>
      </View>
      <View style={styles.board}>
        <Text style={styles.title}>Movies</Text>
        <View style={styles.suBoard}>
          {list.length == 0 && (
            <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
              <Text style={styles.title}>Movies not found</Text>
            </View>
          )}
          {list.map((movie) => (
            <TouchableOpacity
              onPress={()=>goDetail(movie.id)}
              style={styles.movieContainer}
              key={movie.id}
            >
              <Image style={styles.imageStyle} source={{ uri: movie.image }} />
              <Text style={styles.nameStyle}>{movie.title}</Text>
              <Rating
                readonly
                tintColor="#2c3848"
                startingValue={movie.vote / 2}
                imageSize={25}
                style={styles.stars}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5ca0d3", // #999fa6
  },
  header: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    // height: 30,
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#fff",
  },
  searchStyle: {
    color: '#fff',
    width: '100%',
  },
  board: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2c3848",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  contSearch: {
    width: "80%",
    backgroundColor: "#8ebee1",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  suBoard: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  movieContainer: {
    width: "45%",
  },
  imageStyle: {
    width: 150,
    height: 300,
    resizeMode: "contain",
    borderRadius: 30,
  },
  nameStyle: {
    fontSize: 17,
    height: 60,
    color: "#fff",
    paddingRight: 12,
  },
  stars: {
    alignSelf: 'flex-start',
  }
});
