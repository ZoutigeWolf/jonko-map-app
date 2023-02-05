import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from '@expo/vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const RoundButton = ({ onPress, icon, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.roundButton, style]}>
        <Icon name={icon} size={24} color="black" />
    </TouchableOpacity>
);

const MenuButton = ({title, icon, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.menuListButton}>
        <Icon name={icon} size={24} color="black" />
        <Text>{title}</Text>
    </TouchableOpacity>
);

function MapScreen({ navigation }) {
    return (
        <View style={styles.mapView}>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
                showsUserLocation={true}
            />
            <View style={styles.mapViewFooter}>
                <RoundButton
                    icon="md-menu"
                    style={styles.menuButton}
                    onPress={() => navigation.navigate("Menu")}
                />
                <RoundButton
                    icon="md-add"
                    style={styles.newButton}
                    onPress={() => navigation.navigate("New Memory")}
                />
            </View>
        </View>
    );
}

function MenuScreen({ navigation }) {
    return (
        <View style={styles.menuView}>
            <View style={styles.screenHeader}>
                <RoundButton
                    icon="md-arrow-back"
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.menuList}>
                <MenuButton title="Memories" icon="md-albums"/>
                <MenuButton title="Memories" icon="md-albums"/>
                <MenuButton title="Memories" icon="md-albums"/>
                <MenuButton title="Memories" icon="md-albums"/>
                <MenuButton title="Memories" icon="md-albums"/>
            </View>
        </View>
    );
}

function NewMemoryScreen({ navigation }) {
    return (
        <View style={styles.screenHeader}>
        <RoundButton
            icon="md-arrow-back"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        />
    </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}} />
                <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown: false}} />
                <Stack.Screen name="New Memory" component={NewMemoryScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: '#454545',
    },
    mapViewFooter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24
    },
    roundButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        height: 64,
        backgroundColor: "#ffffff",
        borderRadius: "50%"
    },
    menuButton: {
        marginRight: 24
    },
    newButton: {
        width: 200,
    },
    screenHeader: {
        height: 50,
        marginTop: 24
    },
    backButton: {
        backgroundColor: "transparent",
    },
    menuView: {
        backgroundColor: "#ffffff",
    },
    menuList: {
        display: "flex",
        flexDirection: "column",
    },
    menuListButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    }
});

export default App;