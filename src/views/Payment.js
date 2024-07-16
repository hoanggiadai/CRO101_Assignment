import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Payment = ({ route, navigation }) => {
    const [isPressedCard, setIsPressedCard] = useState(false);
    const [isPressedTm, setIsPressedTm] = useState(false);
    const [isPressedPoly, setIsPressedPoly] = useState(false);

    const { product, priceupdate } = route.params; // Lấy dữ liệu sản phẩm từ route params

    const handlePressCard = () => {
        setIsPressedCard(true);
        setIsPressedTm(false);
        setIsPressedPoly(false);
    };

    const handlePressTm = () => {
        setIsPressedCard(false);
        setIsPressedTm(true);
        setIsPressedPoly(false);
    };

    const handlePressPoly = () => {
        setIsPressedCard(false);
        setIsPressedTm(false);
        setIsPressedPoly(true);
    };

    const handlePay = async () => {
        try {
            // Chuẩn bị dữ liệu cần gửi lên API
            const data = {
                product,
                payment: isPressedCard ? 'Credit Card' : isPressedTm ? 'Thanh Toán khi nhận hàng' : isPressedPoly ? 'FPoly Pay' : ''
            };

            // Gửi yêu cầu POST lên API
            const response = await fetch('http://10.24.27.163:3000/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Kiểm tra nếu payment là rỗng
            if (!data.payment) {
                alert('Select a payment method');
                return; // Không tiếp tục thực hiện hàm nếu payment là rỗng
            }

            // Xử lý phản hồi từ API
            if (response.ok) {
                // Đã gửi dữ liệu thành công
                alert('Payment successful!');
            } else {
                // Xử lý lỗi khi gửi dữ liệu
                throw new Error('Failed to send payment data');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to process payment');
        }
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => { navigation.goBack() }}>
                <Image source={require('../img/ic_back.png')} style={styles.ic_back} />
            </Pressable>
            <Text style={styles.title}>Payment</Text>
            <ScrollView>
                <TouchableOpacity
                    style={[
                        styles.box_pay_card,
                        { borderColor: isPressedCard ? '#D17842' : '#AEAEAE', backgroundColor: isPressedCard ? '#252A32' : 'transparent' }
                    ]}
                    onPress={handlePressCard}
                >
                    <Text style={styles.title_pay}>Credit Card</Text>
                    <Image source={require('../img/the_ngan_hang.jpeg')} style={styles.anh_card} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.box_pay_tm,
                        { borderColor: isPressedTm ? '#D17842' : '#AEAEAE', backgroundColor: isPressedTm ? '#252A32' : 'transparent' }
                    ]}
                    onPress={handlePressTm}
                >
                    <Text style={styles.title_pay}>Thanh Toán khi nhận hàng</Text>
                    <Image source={require('../img/gh_nt.jpeg')} style={styles.anh_card} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.box_pay_poly,
                        { borderColor: isPressedPoly ? '#D17842' : '#AEAEAE', backgroundColor: isPressedPoly ? '#252A32' : 'transparent' }
                    ]}
                    onPress={handlePressPoly}
                >
                    <Text style={styles.title_pay}>FPoly Pay</Text>
                    <Image source={require('../img/logo_fpoly.png')} style={[styles.anh_card, { resizeMode: 'center' }]} />
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.bottom_pay}>
                <View style={styles.view_gia_tien}>
                    <Text style={styles.text_gia_tien}>{product.priceupdate}</Text><Text style={styles.text_gia_tien}>$</Text>
                </View>
                <TouchableOpacity style={styles.view_pay} onPress={handlePay}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>PAY</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C0F14',
        flex: 1,
        padding: 15
    },
    ic_back: {
        width: 50,
        height: 50,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    title_pay: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    },
    box_pay_card: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15
    },
    box_pay_tm: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15
    },
    box_pay_poly: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15
    },
    anh_card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    bottom_pay: {
        width: '100%',
        height: 70,
        backgroundColor: '#252A32',
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    view_pay: {
        width: 100,
        height: 50,
        backgroundColor: '#D17842',
        alignSelf: 'center',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10
    },
    text_gia_tien: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 7,
        color: 'white'
    },
    view_gia_tien: {
        position: 'absolute',
        bottom: 0,
        marginLeft: 10,
        marginBottom: 7,
        flexDirection: 'row'
    }
});