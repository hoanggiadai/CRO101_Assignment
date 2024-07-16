import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const ContactScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userName, setUserName] = useState('');
    const [information, setInformation] = useState('');

    // Hàm xử lý khi nhấn nút gửi
    const handleSendButtonPress = async () => {
        // Kiểm tra các trường nhập
        if (!fullName || !email || !phone || !userName || !information) {
            Alert.alert('Please fill in all fields');
            return;
        }

        try {
            // Tạo payload dữ liệu để gửi lên API
            const payload = {
                fullName,
                email,
                phone,
                userName,
                information
            };

            // Gửi dữ liệu lên API
            const response = await fetch('http://10.24.27.163:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Kiểm tra kết quả từ API và hiển thị thông báo tương ứng
            if (response.ok) {
                Alert.alert('Data sent successfully');
            } else {
                Alert.alert('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            Alert.alert('Failed to send data');
        }
    };

    return (
        <View style={styles.container}>
            {/* Menu và hình ảnh người dùng */}
            <View style={styles.menu_profile}>
                <Pressable style={styles.ic_menu} onPress={() => navigation.toggleDrawer()}>
                    <Image source={require('../img/ic_menu.png')} style={styles.ic_menu} />
                </Pressable>
            </View>
            {/* Hình nền */}
            <Image source={require('../img/anh_nen.png')} style={styles.anh_nen} />
            {/* Ô nhập thông tin */}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={setFullName}
                placeholderTextColor="#52555a"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                placeholderTextColor="#52555a"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                onChangeText={setPhone}
                placeholderTextColor="#52555a"
            />
            <TextInput
                style={styles.input}
                placeholder="User Name"
                onChangeText={setUserName}
                placeholderTextColor="#52555a"
            />
            <TextInput
                style={styles.inputInformation}
                multiline
                numberOfLines={5}
                placeholder="Information Here..."
                onChangeText={setInformation}
                placeholderTextColor="#52555a"
            />
            {/* Nút Gửi */}
            <Pressable style={styles.view_send} onPress={handleSendButtonPress}>
                <Text style={styles.text_send}>SEND</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15
    },
    menu_profile: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    ic_menu: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 0,
    },
    anh_nen: {
        width: 150,
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
    },
    input: {
        fontSize: 17,
        height: 62,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#52555a',
        color: '#52555a',
        padding: 5,
        paddingStart: 10,
        marginTop: 15
    },
    inputInformation: {
        fontSize: 17,
        height: 150, // Chiều cao đủ để chứa 5 dòng văn bản
        borderColor: '#52555a',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top', // Để văn bản bắt đầu từ phía trên cùng của TextInput
        marginTop: 15,
        marginBottom: 20,
        color: '#52555a'
    },
    view_send: {
        backgroundColor: '#d17842',
        height: 70,
        borderRadius: 25,
        marginTop: 15,
        justifyContent: 'center',
        marginBottom: 10
    },
    text_send: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default ContactScreen;