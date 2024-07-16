import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Register = ({ navigation }) => {
    // Khởi tạo state cho các trường thông tin đăng ký
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Hàm xử lý khi nhấn nút Đăng ký
    const handleRegister = async () => {
        // Kiểm tra nếu có trường nào trống
        if (!fullName || !email || !userName || !password || !rePassword || !phone || !address) {
            alert("Please fill in all fields");
            return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (password !== rePassword) {
            alert("Passwords do not match");
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        // Dữ liệu đăng ký
        const userData = {
            fullName,
            email,
            userName,
            password,
            phone,
            address
        };

        try {
            // Gửi yêu cầu POST đến API để thêm người dùng mới
            const response = await fetch('http://10.24.27.163:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // Kiểm tra kết quả từ API
            if (response.ok) {
                alert("Registration successful!");
                // Reset các trường sau khi đăng ký thành công
                setFullName('');
                setEmail('');
                setUserName('');
                setPassword('');
                setRePassword('');
                setPhone('');
                setAddress('');
            } else {
                // Xử lý lỗi từ API
                alert("Registration failed. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../img/logo_fpoly.png')} style={styles.logo_fpoly} resizeMode='center' />
            <Image source={require('../img/anh_nen.png')} style={styles.anh_nen} />
            <Text style={styles.text_welcome}>Welcome to Lungo !!</Text>
            <Text style={styles.text_welcome_2}>Register to Continue</Text>
            <TextInput
                style={styles.input}
                placeholder='Full Name'
                onChangeText={setFullName}
                value={fullName}
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='UserName'
                onChangeText={setUserName}
                value={userName}
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='Re-Password'
                onChangeText={setRePassword}
                secureTextEntry={true}
                value={rePassword}
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='Phone'
                onChangeText={setPhone}
                value={phone}
                keyboardType='numeric'
                placeholderTextColor={'#52555a'}
            />
            <TextInput
                style={styles.input}
                placeholder='Address'
                onChangeText={setAddress}
                value={address}
                placeholderTextColor={'#52555a'}
            />
            <Pressable style={styles.view_register} onPress={handleRegister}>
                <Text style={styles.text_register}>Register</Text>
            </Pressable>
            <View style={styles.view_login}>
                <Text style={styles.text_login_white}>You have account? Click</Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={styles.text_login}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15
    },
    anh_nen: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 10
    },
    logo_fpoly: {
        width: 120,
        height: 40,
    },
    text_welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    },
    text_welcome_2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#52555a',
        textAlign: 'center',
        marginTop: 10
    },
    input: {
        fontSize: 17,
        height: 45,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#52555a',
        color: '#52555a',
        padding: 5,
        paddingStart: 10,
        marginTop: 10
    },
    view_register: {
        backgroundColor: '#d17842',
        height: 70,
        borderRadius: 25,
        marginTop: 15,
        justifyContent: 'center',
        marginBottom: 10
    },
    text_register: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    view_login: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    text_login_white: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 2
    },
    text_login: {
        color: '#d17842',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 5
    }
});