import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { onLogin } = route.params;

    const handleLogin = async () => {
        if (username && password) {
           
            const isAuthenticated = true; 

            if (isAuthenticated) {
                onLogin(username);
            } else {
                alert('Credenciales inválidas. Por favor, intenta de nuevo.');
            }
        } else {
            alert('Por favor, ingresa un nombre de usuario y contraseña.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./rrrrrr.PNG')}
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
        width: '80%',
        height: 150,
        alignSelf: 'center',
        marginBottom: 30,
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



