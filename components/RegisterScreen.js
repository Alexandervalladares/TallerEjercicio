import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RegisterScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        if (username && password && email) {
           
            alert('Usuario registrado con éxito');

            
            route.params.onLogin(username);
            
            
            navigation.navigate('Login');
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./rrrrrr.PNG')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Registrar Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
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
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerText}>
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

export default RegisterScreen;
