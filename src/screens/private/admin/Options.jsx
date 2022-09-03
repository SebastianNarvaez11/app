import { StyleSheet, Text, View } from 'react-native';
import TapBar from '../../../components/TapBar';



const Options = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Holaa desde Options Admin</Text>
            <TapBar navigation={navigation} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Options;
