import { StyleSheet, Text, View } from 'react-native';



const Home = () => {
    return (
        <View style={styles.container}>
            <Text>Holaa desde Home Student</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Home;
