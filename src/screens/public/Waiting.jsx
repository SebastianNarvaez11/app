import { Text, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base'

const Waiting = () => {
    return (
        <View style={styles.container}>
            <Spinner size="lg" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default Waiting;
