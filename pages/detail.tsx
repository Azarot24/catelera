import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { GetMovieDetailRequest } from "../service";
import { EvilIcons } from "@expo/vector-icons";

export default function DetailScreen({ route, navigation }) {
  // const { itemId } = route.params;
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if(movieId == null){
      navigation.goBack()
    }else{
      searchMovieDEtail();
    }
  });

  const searchMovieDEtail = async () => {
    try {
      const result = await GetMovieDetailRequest(movieId);
      if (result == "error") {
        throw new Error("Cant complete request!");
      } else {
        // alert(JSON.stringify(result.data)); genres
        let genres = '';
        result.data.genres.forEach((genre: any) => (genres = genre.name + ', ' + genres));

        let companies = "";
        result.data.production_companies.forEach(
          (comp: any) => (companies = comp.name + ", " + companies)
        );

        let temp: any = {
          title: result.data.title,
          titleO: result.data.original_title,
          overview: result.data.overview,
          date: result.data.release_date,
          genres: genres,
          companies: companies,
          image:
            "https://image.tmdb.org/t/p/original" + result.data.backdrop_path,
          vote: result.data.vote_average / 2,
        };
        setMovie(temp);
        // alert(JSON.stringify(temp));
      }
    } catch (e) {
      Alert.alert(JSON.stringify(e));
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrow}
      >
        <EvilIcons name="arrow-left" size={50} color="white" />
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={{ uri: movie.image }} />
      <View style={styles.contText}>
        <Text style={styles.textT}>Title: {movie.title}</Text>
        <Text style={styles.textT}>Original title: {movie.titleO}</Text>
        {
          <Rating
            readonly
            tintColor="#2c3848"
            startingValue={movie.vote}
            imageSize={25}
            style={styles.stars}
          />
        }
        <Text style={styles.textO}>{movie.overview}</Text>
        <Text style={styles.textC}>Genre: {movie.genres}</Text>
        <Text style={styles.textC}>Study: {movie.companies}</Text>
        <Text style={styles.textC}>Release: {movie.date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3848",
  },
  contText: {
    flex: 1,
    paddingHorizontal: 10,
  },
  arrow: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 20,
  },
  imageStyle: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  textT: {
    color: "#fff",
    fontSize: 20,
  },
  textO: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    paddingVertical: 10,
  },
  textC: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 5,
  },
  stars: {
    alignSelf: "flex-end",
  },
});
