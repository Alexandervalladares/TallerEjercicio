import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { onLogin } = route.params;

    const handleLogin = () => {
        if (username && password) {
            onLogin(); // Llama a la función de inicio de sesión cuando las credenciales son válidas
        } else {
            alert('Por favor, ingresa un nombre de usuario y contraseña.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Agrega el logo en la parte superior de la pantalla */}
            <Image
                source={require('./rrrrrr.PNG')} // Reemplaza la ruta con la ubicación del logo
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />

            {/* Enlace para ir a la pantalla de registro */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>
                    ¿No tienes cuenta? Regístrate aquí.
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logo: {
        width: '80%', // Ajusta según sea necesario
        height: 150, // Ajusta según sea necesario
        alignSelf: 'center',
        marginBottom: 30, // Espacio debajo del logo
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    registerText: {
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 15,
    },
});

export default LoginScreen;



