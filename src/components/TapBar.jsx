import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const TapBar = ({ navigation }) => {

    const route = useRoute();

    return (
        <View style={styles.tapbar}>
            <FontAwesome name="user" size={30} color="#2f3447" onPress={() => navigation.navigate('Inicio')} />
            <Entypo name="home" size={30} color={route.name === 'Inicio' ? "#5460FE" : "#2f3447"} onPress={() => navigation.navigate('Inicio')} />
            <Ionicons name="settings-sharp" size={30} color={route.name === 'Opciones' ? "#5460FE" : "#2f3447"} onPress={() => navigation.navigate('Opciones')} />
        </View>
    );
};

const styles = StyleSheet.create({
    tapbar: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height * 8) / 100
    },
});


export default TapBar;
