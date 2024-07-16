import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Component cho một dòng dữ liệu sản phẩm
const ProductItem = ({ sp }) => {
    const navigation = useNavigation();

    // Xử lý sự kiện khi nhấn vào một mục
    const onPressItem = () => {
        // Điều hướng đến màn hình Description và truyền dữ liệu sản phẩm
        navigation.navigate('Description', { product: sp });
    }

    return (
        <View style={styles.productContainer}>
            <Pressable onPress={onPressItem}>
                <Image source={{ uri: sp.photo }} style={styles.productImage} />
                <Text style={styles.productName}>{sp.name}</Text>
                <View style={styles.productPriceContainer}>
                    <Text style={styles.productPriceSign}>$</Text>
                    <Text style={styles.productPrice}>{sp.price}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showScrollView, setShowScrollView] = useState(true);
    const [dsSp, setDsSp] = useState([]);

    // Hàm tìm kiếm sản phẩm theo tên
    const searchProduct = (text) => {
        // Lọc sản phẩm theo tên
        const filteredProducts = dsSp.filter(product =>
            product.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchResults(filteredProducts);
        // Ẩn hoặc hiện ScrollView dựa trên kết quả tìm kiếm
        setShowScrollView(text === '');
    };

    // Hàm hiển thị danh sách sản phẩm tìm kiếm
    const renderSearchResults = () => {
        if (searchResults.length === 0 || searchText === '') {
            return null;
        }
        return (
            <FlatList
                style={styles.list}
                data={searchResults}
                renderItem={({ item }) => <ProductItem sp={item} />}
                keyExtractor={item => item.id.toString()}
            />
        );
    };

    const link_api = "http://10.24.27.163:3000/products";

    // Hàm lấy danh sách sản phẩm từ API
    const getList = async () => {
        try {
            let response = await fetch(link_api);
            let data = await response.json();
            setDsSp(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Gọi hàm lấy danh sách sản phẩm khi màn hình được tải
    useEffect(() => {
        getList();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.menuProfile}>
                {/* Mở Drawer Navigation */}
                <Pressable style={styles.menuIcon} onPress={() => { navigation.toggleDrawer() }}>
                    <Image source={require('../img/ic_menu.png')} style={styles.menuIcon} />
                </Pressable>
            </View>
            <Text style={styles.welcomeText}>Find the best{'\n'}coffee for you</Text>
            <TextInput
                placeholder='Find your coffee'
                placeholderTextColor={'#52555a'}
                onChangeText={(text) => {
                    setSearchText(text);
                    searchProduct(text);
                }}
                style={styles.searchInput}
            />
            {renderSearchResults()}
            {showScrollView && (
                <ScrollView>
                    <View style={styles.menuContainer}>
                        <Text style={styles.menuText}>All</Text>
                    </View>
                    <View style={styles.productListContainer}>
                        <SafeAreaView>
                            <FlatList
                                style={styles.list}
                                data={dsSp}
                                renderItem={({ item }) => <ProductItem sp={item} />}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                columnWrapperStyle={styles.columnWrapper}
                                contentContainerStyle={styles.flatListContent} />
                        </SafeAreaView>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0f14',
        padding: 15
    },
    menuProfile: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginStart: 2,
        position: 'absolute',
        left: 0,
    },
    userIcon: {
        width: 30,
        height: 30,
        marginStart: 7,
    },
    welcomeText: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        marginTop: 40,
        marginStart: 20,
        marginBottom: 10
    },
    searchInput: {
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: '#52555a',
        paddingStart: 10,
        color: '#aeaeae',
        backgroundColor: '#252a32',
        marginBottom: 8
    },
    menuContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    menuText: {
        color: '#ffffff',
        marginEnd: 15,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    productContainer: {
        padding: 7,
        backgroundColor: '#252a32',
        marginBottom: 20,
        borderRadius: 10,
        marginEnd: 20,
    },
    productName: {
        fontSize: 20,
        color: '#ffffff',
        marginBottom: 12
    },
    productImage: {
        width: 155,
        height: 170,
        borderRadius: 10,
        marginBottom: 18,
    },
    productPriceContainer: {
        flexDirection: 'row'
    },
    productPriceSign: {
        fontSize: 20,
        color: '#d17842',
        fontWeight: 'bold',
        marginEnd: 8
    },
    productPrice: {
        fontSize: 18,
        color: '#ffffff',
        width: 80
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    productListContainer: {
    },
    list: {
        margin: 0
    },
    noResultsText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    }
});

export default HomeScreen;