import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        if (!username || !password || !email) {
            // Mostrar alerta si algún campo está vacío
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        try {
            // Verifica si el usuario ya existe en `AsyncStorage`
            const existingUser = await AsyncStorage.getItem(`user:${username}`);
            if (existingUser) {
                // Mostrar alerta si el usuario ya está registrado
                Alert.alert('Error', 'El usuario ya está registrado.');
                return;
            }

            // Guarda el usuario en `AsyncStorage` con su contraseña
            const user = { username, email, password };
            await AsyncStorage.setItem(`user:${username}`, JSON.stringify(user));

            // Mostrar alerta de éxito y navegar a la pantalla de inicio de sesión
            Alert.alert('Éxito', 'Usuario registrado con éxito', [
                { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            // Manejar errores durante el registro
            console.error('Error al registrar usuario:', error);
            Alert.alert('Error', 'No se pudo registrar el usuario. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Registrar" onPress={handleRegister} />

            {/* Enlace para volver a la pantalla de inicio de sesión */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>
                    ¿Ya tienes cuenta? Inicia sesión aquí.
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
    loginText: {
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 15,
    },
});

export default RegisterScreen;
