import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    height: Dimensions.get('window').height + 40,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  searchbarContainer: {
    height: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  textInput: {
    height: 48,
    width: 280,
    paddingHorizontal: 20,
    fontSize: 24,
    color: '#ffffff',
  },
  townContainer: {
    height: 180,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  townText: {
    fontSize: 62,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  latLonContainer: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  latLonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tempContainer: {
    height: 100,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 36,
  },
  iconContainer: {
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gridContainer: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridRow: {
    height: 40,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
  },
  cell1: {
    width: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  cell2: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
  },
  cell3: {
    width: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  cellText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
  },
});

export default styles;
