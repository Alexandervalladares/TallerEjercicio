import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ReminderScreen = ({ activities, onEditActivity, onDeleteActivity }) => {
    const navigation = useNavigation(); // Obtén la instancia de navegación

    const handleAddActivity = () => {
        navigation.navigate('Registrar');
    };

    const handleEditActivity = (activity) => {
        navigation.navigate('Registrar', {
            activity,
            onActivityUpdate: onEditActivity,
        });
    };

    return (
        <View style={styles.container}>
            {activities.length === 0 ? (
                <Text style={styles.emptyText}>No hay actividades registradas.</Text>
            ) : (
                <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.item, { backgroundColor: item.color }]}>
                            <Text style={styles.text}>{item.activityName}</Text>
                            <Text style={styles.text}>Materia: {item.subject}</Text>
                            <Text style={styles.text}>Equipo: {item.teamName}</Text>
                            <Text style={styles.text}>Fecha de entrega: {item.dueDate}</Text>
                            <Text style={styles.text}>Hora de entrega: {item.dueTime}</Text>

                            {/* Botones para editar y eliminar actividad */}
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Editar"
                                    color="#6200EE"
                                    onPress={() => handleEditActivity(item)}
                                />
                                <Button
                                    title="Eliminar"
                                    color="red"
                                    onPress={() => onDeleteActivity(item.id)}
                                />
                            </View>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={handleAddActivity}>
                <Icon name="add" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#6200EE',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ReminderScreen;





