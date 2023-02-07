import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from '@expo/vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import createNewMemory from './NewMemory';

function IconButton({ onPress, icon, style }) {
    return (
        <Pressable onPress={onPress} style={[styles.iconButton, style]}>
            <Icon name={icon} size={24} color="black" />
        </Pressable>
    )
}

function TextButton({ onPress, text, style }) {
    return (
        <Pressable onPress={onPress} style={[styles.textButton, style]}>
            <Text style={styles.textButtonText}>{text}</Text>
        </Pressable>
    )
}

function MenuButton({ onPress, icon, title, style }) {
    return (
        <Pressable onPress={onPress} style={[styles.menuListButton, style]}>
            <Icon name={icon} size={24} color="black" />
            <Text>{title}</Text>
        </Pressable>
    )
}

function MapScreen({ navigation }) {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            (async () => {
                await fetch("http://127.0.0.1:42069/memories")
                .then((r) => r.json())
                .then((data) => {
                    setMemories(data);
                });
            })();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

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
                showsMyLocationButton={true}
            >
                {memories.map((memory) => (
                    <Marker
                        key={memory.id}
                        coordinate={{ latitude: memory.latitude, longitude: memory.longitude }}
                        title={memory.name}
                    />
                ))}
            </MapView>
            <View style={styles.mapViewFooter}>
                <IconButton
                    icon="md-menu"
                    style={styles.menuButton}
                    onPress={() => navigation.navigate("Menu")}
                />
                <IconButton
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
                <IconButton
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
    const [name, setName] = useState("");
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View style={styles.newMemoryView}>
            <View style={styles.screenHeader}>
            <IconButton
                icon="md-arrow-back"
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            />
            </View>
            <View style={styles.newMemoryForm}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="New Memory"
                    onChangeText={setName}
                />
                <TextButton
                    text="Add"
                    style={styles.addMemoryButton}
                    onPress={async () => {
                        if (location === null) return;

                        await createNewMemory(name, location.coords.latitude, location.coords.longitude);
                    }}     
                />
            </View>
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
    iconButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 64,
        height: 64,
        backgroundColor: "#ffffff",
        borderRadius: "50%"
    },
    textButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 128,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: "50%"
    },
    textButtonText: {

    },
    menuButton: {
        marginRight: 24
    },
    newButton: {
        width: 200,
    },
    screenHeader: {
        height: 72,
        marginTop: 24
    },
    backButton: {
        backgroundColor: "transparent",
        borderRadius: 0
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
    },
    newMemoryView: {
        backgroundColor: "#ffffff"
    },
    newMemoryForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: 12
    },
    input: {
        height: 40,
        padding: 10,
        backgroundColor: "#efefef",
        borderRadius: 4,
        marginBottom: 16
    },
    inputLabel: {
        marginBottom: 8
    },
    addMemoryButton: {
        width: "100%",
        backgroundColor: "#dfdfdf"
    }
});

export default App;