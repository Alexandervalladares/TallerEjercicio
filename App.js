import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import RegistrarScreen from './components/RegistrarScreen';
import ReminderScreen from './components/ReminderScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activities, setActivities] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

   
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
                const storedUser = await AsyncStorage.getItem('currentUser');
                setIsLoggedIn(loggedInStatus === 'true');
                setCurrentUser(storedUser);
            } catch (error) {
                console.error('Error al recuperar el estado de inicio de sesión:', error);
            }
        };

        checkLoginStatus();
    }, []);

   
    useEffect(() => {
        const getStoredActivities = async () => {
            try {
                const storedActivities = await AsyncStorage.getItem('activities');
                if (storedActivities !== null) {
                    setActivities(JSON.parse(storedActivities));
                }
            } catch (error) {
                console.error('Error al recuperar las actividades almacenadas:', error);
            }
        };

        getStoredActivities();
    }, []);

   
    const saveLoginStatus = async (status, user) => {
        try {
            await AsyncStorage.setItem('isLoggedIn', status.toString());
            if (user) {
                await AsyncStorage.setItem('currentUser', user);
            }
        } catch (error) {
            console.error('Error al guardar el estado de inicio de sesión:', error);
        }
    };

    
    const saveActivities = async (activities) => {
        try {
            await AsyncStorage.setItem('activities', JSON.stringify(activities));
        } catch (error) {
            console.error('Error al guardar las actividades:', error);
        }
    };

    
    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        saveLoginStatus(true, user);
    };

    
    const handleLogout = () => {
        setIsLoggedIn(false);
        saveLoginStatus(false, null);
        setCurrentUser(null);
    };

   
    const handleAddActivity = (newActivity) => {
        const updatedActivities = [...activities, newActivity];
        setActivities(updatedActivities);
        saveActivities(updatedActivities);
    };

   
    const handleEditActivity = (editedActivity) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === editedActivity.id ? editedActivity : activity
        );
        setActivities(updatedActivities);
        saveActivities(updatedActivities);
    };

   
    const handleDeleteActivity = (id) => {
        const updatedActivities = activities.filter((activity) => activity.id !== id);
        setActivities(updatedActivities);
        saveActivities(updatedActivities);
    };

    
    const DrawerNavigator = () => (
        <Drawer.Navigator initialRouteName="Actividades">
            <Drawer.Screen name="Registrar">
                {() => <RegistrarScreen onActivitySubmit={handleAddActivity} />}
            </Drawer.Screen>
            <Drawer.Screen name="Actividades">
                {() => (
                    <ReminderScreen
                        activities={activities}
                        onEditActivity={handleEditActivity}
                        onDeleteActivity={handleDeleteActivity}
                    />
                )}
            </Drawer.Screen>
            <Drawer.Screen name="Cerrar sesión" options={{ unmountOnBlur: true }}>
                {() => {
                    handleLogout();
                    return null; 
                }}
            </Drawer.Screen>
        </Drawer.Navigator>
    );

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <DrawerNavigator />
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        initialParams={{ onLogin: handleLogin }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default App;

