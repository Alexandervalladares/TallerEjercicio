import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrarScreen = ({ onActivitySubmit }) => {
    const [activityName, setActivityName] = useState('');
    const [subject, setSubject] = useState('');
    const [teamName, setTeamName] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [dueTime, setDueTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Función para determinar el color de la actividad según la fecha de entrega
    const getActivityColor = (dueDate) => {
        const today = new Date();
        const dueDateObj = new Date(dueDate);

        // Comparar la fecha de entrega con la fecha z
        if (dueDateObj.toDateString() === today.toDateString()) {
            return '#4caf50'; // Verde para entregas del día de hoy
        } else if (dueDateObj < today) {
            return '#f44336'; // Rojo para entregas pasadas
        } else {
            return '#2196f3'; // Azul para entregas futuras
        }
    };

    const handleActivitySubmit = () => {
        if (activityName && subject && teamName && dueDate && dueTime) {
            const color = getActivityColor(dueDate);
            const newActivity = {
                id: Date.now(),
                activityName,
                subject,
                teamName,
                dueDate: dueDate.toLocaleDateString(),
                dueTime: dueTime.toLocaleTimeString(),
                color, // Agrega el color a la actividad
            };
            onActivitySubmit(newActivity);
            // Limpia los campos después de agregar la actividad
            setActivityName('');
            setSubject('');
            setTeamName('');
            setDueDate(new Date());
            setDueTime(new Date());
            Alert.alert('Actividad registrada con éxito');
        } else {
            Alert.alert('Por favor, completa todos los campos.');
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dueDate;
        setShowDatePicker(false);
        setDueDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || dueTime;
        setShowTimePicker(false);
        setDueTime(currentTime);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Actividades</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Actividad"
                value={activityName}
                onChangeText={setActivityName}
            />
            <TextInput
                style={styles.input}
                placeholder="Materia"
                value={subject}
                onChangeText={setSubject}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre del Equipo de Trabajo"
                value={teamName}
                onChangeText={setTeamName}
            />
            {/* Selector de fecha */}
            <View style={styles.pickerContainer}>
                <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <Text>{dueDate.toLocaleDateString()}</Text>
            </View>
            {/* Selector de hora */}
            <View style={styles.pickerContainer}>
                <Button title="Seleccionar Hora" onPress={() => setShowTimePicker(true)} />
                {showTimePicker && (
                    <DateTimePicker
                        value={dueTime}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}
                <Text>{dueTime.toLocaleTimeString()}</Text>
            </View>

            <Button title="Registrar Actividad" onPress={handleActivitySubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
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
    pickerContainer: {
        marginBottom: 15,
    },
});

export default RegistrarScreen;




