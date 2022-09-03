import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { Checkbox } from 'native-base';
import global from '../../helpers/styles'

const screen_x = Dimensions.get('window').width
const screen_y = Dimensions.get('window').height


const Student = ({ student, toogleStudent }) => {

    return (
        <View style={styles.student}>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {student.sex === 1 ?
                    <Image source={require('../../../assets/img/student_man.png')} style={{ height: screen_y / 20 }} resizeMode='contain' />
                    :
                    <Image source={require('../../../assets/img/student_woman.png')} style={{ height: screen_y / 20 }} resizeMode='contain' />
                }
                <View>
                    <Text style={[global.fontB, { fontSize: screen_x / 25 }]}>{student.last_name}</Text>
                    <Text style={[global.fontB, { fontSize: screen_x / 25 }]}>{student.first_name}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', paddingRight: screen_x / 20 }}>
                <Checkbox accessibilityLabel="This is a dummy checkbox" size="lg"  onChange={(value) => toogleStudent(student, value)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    student: {
        backgroundColor: '#ffffff',
        padding: screen_x / 40,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screen_y / 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 0.84,
        elevation: 0.9,
    }
});

export default Student