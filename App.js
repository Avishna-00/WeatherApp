import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from "./styles";

// Importing background images
import ClearSky from './assets/clear-sky.jpg';
import BrokenClouds from './assets/broken-clouds.jpg';
import FewClouds from './assets/few-clouds.jpg';
import Mist from './assets/mist.jpg';
import Rain from './assets/rain.jpg';
import ScatteredClouds from './assets/scattered-clouds.jpg';
import Snow from './assets/snow.jpg';
import Thunderstorm from './assets/thunderstorm.jpg';

// Importing icons
import SearchIcon from './assets/icons/search.png';
import HumidityIcon from './assets/icons/humidity.png';
import WindSpeedIcon from './assets/icons/wind-speed.png';
import ClearSkyIcon from './assets/icons/sun.png';
import CloudsIcon from './assets/icons/clouds.png';
import MistIcon from './assets/icons/mist.png';
import RainIcon from './assets/icons/raining.png';
import SnowIcon from './assets/icons/snow.png';
import ThunderstormIcon from './assets/icons/storm.png';

//API key
const API_KEY = '71a484d73852d24f3b821c789c627ad0';

//Passing object to API call
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const App = () => {
  //Setting the initial states
  const [town, setTown] = useState('Colombo');
  const [lat, setLat] = useState('6.9387469');
  const [lon, setLon] = useState('79.8541134');

  const [weatherData, setWeatherData] = useState({
    coord: {lon: 0, lat: 0},
    weather: [{id: 0, main: "", description: "", icon: ""}],
    main: {temp: 0, humidity: 0,},
    wind: {speed: 0,},
    name: "",
  });

  useEffect(() => {
    setLatLon(town);
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [lat, lon]);

  const setLatLon = (town) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${town}&appid=${API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLat(result[0].lat);
        setLon(result[0].lon);
      })
      .catch(error => console.log('error', error));
  }

  const getWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setWeatherData({
          coord: {
            lon: result.coord.lon,
            lat: result.coord.lat,
          },
          weather: [
            {
              id: result.weather[0].id,
              main: result.weather[0].main,
              description: result.weather[0].description,
              // icon: 'https://openweathermap.org/img/wn/' + result.weather[0].icon + '@2x.png',
            }
          ],
          main: {
            temp: (result.main.temp - 273.15).toFixed(2),
            humidity: result.main.humidity,
          },
          wind: {
            speed: result.wind.speed,
          },
        });
      })
      .catch(error => console.log('error', error));
  }

  const handleOnClickSubmit = () => setLatLon(town);

  const getWeatherBg = (code) =>
    [800].includes(code) ? ClearSky
    : [803, 804].includes(code) ? BrokenClouds
    : [801].includes(code) ? FewClouds
    : [701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(code) ? Mist
    : [802].includes(code) ? ScatteredClouds
    : [500, 501, 502, 503, 504, 300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531].includes(code) ? Rain 
    : [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(code) ? Snow
    : Thunderstorm;

  const getWeatherIcon = (code) =>
    [800].includes(code) ? ClearSkyIcon
    : [801, 802, 803, 804].includes(code) ? CloudsIcon
    : [701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(code) ? MistIcon
    : [500, 501, 502, 503, 504, 300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531].includes(code) ? RainIcon
    : [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(code) ? SnowIcon
    : ThunderstormIcon;

  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bg} resizeMode="cover" source={getWeatherBg(weatherData.weather[0].id)}>
       {/* search bar and search icon */}
        <View style={styles.searchbarContainer}>
          <TextInput style={styles.textInput} value={town} onChangeText={(text) => setTown(text)}/>
          <TouchableOpacity onPress={handleOnClickSubmit}>
            <Image source={SearchIcon}/>
          </TouchableOpacity>
        </View>
        {/* town */}
        <View style={styles.townContainer}>
          <Text style={styles.townText}>{town}</Text>
        </View>
        {/* latitude and longitude */}
        <View style={styles.latLonContainer}>
          <Text style={styles.latLonText}>Latitude: {weatherData.coord.lat}</Text>
          <Text style={styles.latLonText}>Longitude: {weatherData.coord.lon}</Text>
        </View>
        {/* temperature */}
        <View style={styles.tempContainer}>
          <Text style={styles.tempText}>{weatherData.main.temp} °C</Text>
        </View>
        {/* weather icon */}
        <View style={styles.iconContainer}>
          <Image
            // source={{uri: weatherData.weather[0].icon}}
            source={getWeatherIcon(weatherData.weather[0].id)}
            style={{width: 150, height: 150}}
          />
        </View>
        {/* weather description */}
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            {/*{weatherData.weather[0].main}*/}
            {capitalizeFirstLetter(weatherData.weather[0].description)}
          </Text>
        </View>


        <View style={styles.gridContainer}>
          {/* humidity */}
          <View style={styles.gridRow}>
            <View style={styles.cell1}>
              <Image source={HumidityIcon} style={{width: 30, height: 30}}/>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.cellText}>Humidity</Text>
            </View>
            <View style={styles.cell3}>
              <Text style={styles.cellText}>{weatherData.main.humidity}%</Text>
            </View>
          </View>
          {/* wind speed */}
          <View style={styles.gridRow}>
            <View style={styles.cell1}>
              <Image source={WindSpeedIcon} style={{width: 30, height: 30}}/>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.cellText}>Wind speed</Text>
            </View>
            <View style={styles.cell3}>
              <Text style={styles.cellText}>{weatherData.wind.speed} Km/h</Text>
            </View>
          </View>

        </View>

        <StatusBar style="auto" />
      </ImageBackground>

    </View>
  );
}

export default App;
