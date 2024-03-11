import React, { useState,useEffect } from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {globalStyles} from '../../shared/globalStyles';
import {DateTimeInputOptions} from "./types/InputOptions";

const DateTimeInput = ({value, onChange, type}: DateTimeInputOptions) => {

    type = type || 'datetime'

    const [currentValue, setCurrentValue] = useState<Date | null>(value || new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const useDate = ['date', 'datetime'].includes(type)
    const useTime = ['time', 'datetime'].includes(type)

    useEffect(() => {
        if (onChange) onChange(currentValue || null)
    }, [currentValue]);

    const handleDateChange = (_: DateTimePickerEvent, newVal?: Date) => {
        setCurrentValue(() => newVal || null);

        if (Platform.OS === 'android') {
            setShowDatePicker(() => false);
        }
    }

    const handleTimeChange = (_: DateTimePickerEvent, newVal?: Date) => {
        setCurrentValue(() => newVal || null);

        if (Platform.OS === 'android') {
            setShowTimePicker(() => false);
        }
    }

    const toggleDatePicker = () => {
        setShowDatePicker((prev) => !prev)
    }

    const toggleTimePicker = () => {
        setShowTimePicker((prev) => !prev)
    }
 
    return (
        <View style={[globalStyles.input, localStyle.dateTimeInput]}>
            {useDate && (<DateTimePicker
                value={currentValue || new Date()}
                mode="date"
                onChange={handleDateChange}
            />)}

            {useTime && (<DateTimePicker
                value={currentValue || new Date()}
                mode="time"
                onChange={handleTimeChange}
            />)}
        </View>
    );
};

export default DateTimeInput;

const localStyle = StyleSheet.create({
    dateTimeInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
})