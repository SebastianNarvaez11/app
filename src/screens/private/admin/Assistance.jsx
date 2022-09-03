import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, FlatList, Button } from 'react-native'
import { Select, AlertDialog, useToast } from "native-base";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Spinner from '../../../components/Spinner'
import Grade from '../../../components/Assistance/Grade'
import Student from '../../../components/Assistance/Student'
import global from '../../../helpers/styles'


import { getStudentsByGradeAndSchedule, createAssistance, getAssistancesToday } from '../../../redux/actions/assistanceActions';
import { resetStudents, updateStudent } from '../../../redux/slices/assistanceSlice';
import { formartSchedule } from '../../../helpers/formats';
import { dateToString } from '../../../helpers/parseDate'


const screen_x = Dimensions.get('window').width
const screen_y = Dimensions.get('window').height

const date = new Date()


const Assistance = ({ navigation }) => {

    const dispatch = useDispatch()
    const toast = useToast();

    const { students, loadingStudents, loadingAssistances, assistances, isFetchingAssistance } = useSelector(state => state.assitance)
    const { grades, loadingGrades } = useSelector(state => state.grade)


    const [showAlert, setShowAlert] = useState(false);



    const [schedule, setSchedule] = useState();
    const [grade, setGrade] = useState();

    const selectGrade = (id) => {
        setGrade(id)
        if (schedule !== undefined) {
            dispatch(getStudentsByGradeAndSchedule(id, schedule))
        }
    }

    const selectSchedule = (schedule) => {
        setSchedule(schedule)
        dispatch(getAssistancesToday(schedule))
    }


    const toogleStudent = (student, value) => {
        student = { ...student, attended: value }
        dispatch(updateStudent(student))
    }



    useEffect(() => {
        return () => { dispatch(resetStudents()) }
    }, []);


    const renderGrade = ({ item }) => (
        <TouchableOpacity onPress={() => selectGrade(item.id)}>
            <Grade grade={item} isActive={item.id === grade ? true : false} assistances={assistances} />
        </TouchableOpacity>
    )

    const renderStudent = ({ item }) => (
        <Student student={item} toogleStudent={toogleStudent} />
    )


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome5 name="arrow-left" size={24} color="#2f3447" />
                    </TouchableOpacity>
                    <Text style={[global.fontB, { fontSize: screen_x / 20 }]}>
                        {dateToString(date)}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: screen_y / 30, paddingBottom: screen_y / 80 }}>
                    <View >
                        {!schedule ?
                            <Text style={[global.font, { fontSize: screen_x / 25, color: '#989ebe' }]}>Selecciona una jornada:</Text>
                            :
                            <Text style={[global.fontB, { fontSize: screen_x / 12 }]}>{formartSchedule(schedule)}</Text>
                        }
                    </View>
                    <Select borderRadius={20} alignSelf='center' selectedValue={schedule} width={screen_x / 4} placeholder="Jornadas" onValueChange={(itemValue) => selectSchedule(itemValue)}>
                        <Select.Item label="Mañana" value={1} />
                        <Select.Item label="Tarde" value={2} />
                        <Select.Item label="Unica" value={3} />
                    </Select>
                </View>


                <SafeAreaView>
                    {isFetchingAssistance ?
                        <Spinner size={screen_x / 6} />
                        :
                        schedule !== undefined &&
                        <FlatList
                            data={grades}
                            renderItem={renderGrade}
                            keyExtractor={item => item.id}
                            horizontal
                            fadingEdgeLength={10}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                        />
                    }
                </SafeAreaView>

            </View>

            <View style={styles.end}>
                {grade !== undefined &&

                    (assistances.filter(assis => assis.grade.id === grade).length === 1 ?
                        <Text style={[global.fontB, { alignSelf: 'center', marginTop: screen_y / 10, fontSize: 20, marginHorizontal: screen_x / 10 }]}>Ya se registro una asistencia para este grado</Text>
                        :
                        loadingStudents ?
                            <View style={{ paddingTop: screen_x / 4 }}>
                                <Spinner size={screen_x / 4} text='Cargando estudiantes' />
                            </View>
                            :
                            <SafeAreaView style={{ marginTop: screen_y / 35 }}>
                                {students.length === 0 ?
                                    <Text style={[global.fontB, { alignSelf: 'center', marginTop: screen_y / 10, fontSize: 20, marginHorizontal: screen_x / 10 }]}>No se encontraron estudiantes</Text>
                                    :
                                    <FlatList
                                        contentContainerStyle={{ paddingBottom: screen_y / 10 }}
                                        data={students}
                                        renderItem={renderStudent}
                                        keyExtractor={item => item.id}
                                        fadingEdgeLength={10}
                                        showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={16}
                                        showsVerticalScrollIndicator={false}
                                    />
                                }
                            </SafeAreaView>
                    )
                }
            </View>

            <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)} >
                <AlertDialog.Content>
                    {loadingAssistances ?
                        <View style={{ marginVertical: screen_y / 15 }}>
                            <Spinner size={screen_x / 6} text='Registrando asistencia' />
                        </View>
                        :
                        <>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Guardar Asistencia</AlertDialog.Header>
                            <AlertDialog.Body>
                                Estudiantes Ausentes:
                                {students.map((student, index) => (student.attended === undefined || student.attended === false) && <Text key={index}>{student.last_name} {student.first_name}</Text>)}
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <View style={{ marginRight: 5 }}>
                                    <Button color='#ff6951' onPress={() => setShowAlert(false)} title='Cancelar' />
                                </View>

                                <Button color='#1ccd9d' title='Guardar' onPress={() => dispatch(createAssistance(grade, schedule, students, toast, setShowAlert))} />
                            </AlertDialog.Footer>
                        </>
                    }
                </AlertDialog.Content>
            </AlertDialog>

            {assistances.filter(assis => assis.grade.id === grade).length === 1 || students.length !== 0 &&
                <TouchableOpacity style={styles.btn_save} onPress={() => setShowAlert(true)}>
                    <FontAwesome name="save" size={screen_x / 15} color="#ffffff" />
                </TouchableOpacity>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7ff',
    },
    top: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: screen_y / 14,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: screen_x / 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 0.84,
        elevation: 0.9,
    },
    end: {
        flex: 3,
        paddingHorizontal: screen_x / 20,
    },
    btn_save: {
        position: 'absolute',
        bottom: screen_y / 40,
        right: screen_x / 20,
        backgroundColor: '#5460fe',
        padding: 15,
        borderRadius: 20,
        width: screen_x / 7,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    }
});


export default Assistance;