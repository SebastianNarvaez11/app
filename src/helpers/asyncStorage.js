import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log(error);
        return false
    }
}


export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {
        console.log(error);
        return false
    }
}


export const delData = async (key) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log(error);
        return false
    }
}
