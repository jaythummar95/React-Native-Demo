import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView, RefreshControl, Image, Modal, ImageBackground, TouchableWithoutFeedback, ActivityIndicator } from "react-native";

import { CommonActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast'
import moment from 'moment'

import { toolbar } from '../../component/'
import { Storage } from '../../constants/GPStorage'
import { Logout, orderList, getDeliveries } from '../../networkcall'
import { COLOR, FONT, DIMENSIOS, } from "../../constants/constants";

import styles from "./styles";
import ParentView from '../../View/ParentView';
import ProgressDialog from '../../View/ProgressDialog';
import { IMAGE } from '../../images'

function Dash(props) {

    const { navigation } = props
    const [showProgress, setShowProgress] = useState(false)
    const [isRefashing, setRefreshing] = useState(false);
    const [isRefashingBotom, setRefreshingBottom] = useState(false);
    const [isApiCalling, setIsApiCalling] = useState(false);
    const [emptyString, setEmptyString] = useState("")
    const [dataOrder, setDataOrder] = useState([])
    const [page, setPage] = useState(1)
    const [totalpage, settotalpage] = useState(0)
    const [statusFilter, setStatusFilter] = useState('all')
    const [mdlFilterStatus, setMdlFilterStatus] = useState(false)


    useEffect(() => {
        fetchOrder(true, true, statusFilter);
    }, []);


    const onRefresh = () => {
        setRefreshing(true)
        setPage(1)
        fetchOrder(false, true, statusFilter);

    }

    const statusArray = [
        { lable: "ALL DELIVERY", type: 'all' },
        { lable: "ASSIGNED DELIVERY", type: 'assigned' },
        { lable: "ON DELIVERY", type: 'picked' },
        { lable: "DELIVERED DELIVERY", type: 'delivered' },
    ]

    const fetchFilteredStatus = () => {
        let item = statusArray.find((item) => item.type == statusFilter)
        return item.lable;
    }

    const fetchSelectedStatus = (orderData) => {
        let status = "";
        if (orderData.shipping_delivery_status.delivered == 1) {
            status = "DELIVERY DELIVERED"
        } else if (orderData.shipping_delivery_status.picked == 1 || orderData.shipping_delivery_status.shipped == 1) {
            status = "ON DELIVERY"
        } else if (orderData.shipping_delivery_status.assigned == 1) {
            status = "DELIVERY ASSIGNED"
        }
        return status;
    }

    const fetchFilerParam = (mFilter) => {

        let filter = '';
        if (mFilter == 'assigned') {
            filter = 1;
        }
        if (mFilter == 'picked' || mFilter == 'shipped') {
            filter = 2;
        }
        if (mFilter == 'delivered') {
            filter = 3;
        }

        return filter;
    }

    const fetchOrder = async (showProgress, isLoadingFirsttime, mFilter) => {

        setShowProgress(showProgress);
        setIsApiCalling(true);
        setRefreshingBottom(!isLoadingFirsttime)
        setStatusFilter(mFilter)
        let filter = await fetchFilerParam(mFilter);
        console.log("FILTER", filter)

        getDeliveries(isLoadingFirsttime ? 1 : page, filter)
            .then((response) => {

                setShowProgress(false)
                setRefreshing(false)
                setIsApiCalling(false);
                setRefreshingBottom(false)

                let data = response.data;
                let success = data.success;
                let message = data.message;

                // console.log(data.data)


                if (success == "1") {
                    if (isLoadingFirsttime) {
                        setDataOrder(data.data.delivery_list)
                        console.log(JSON.stringify(data.data.delivery_list))

                    } else {
                        let list = data.data.delivery_list;
                        list.forEach(element => {
                            dataOrder.push(element)
                        });
                        setDataOrder(dataOrder)
                    }

                    setPage(data.data.page + 1)
                    settotalpage(data.data.totalpage)

                } else {
                    setEmptyString("No delivery found")
                }
            })
            .catch((error) => {

                console.log(error)

                setIsApiCalling(false);
                setRefreshing(false)
                setShowProgress(false)
                setRefreshingBottom(false)
                if (!error.status) {
                    setEmptyString("No network connection ")
                }

            })
    }



    const apiCallLogout = () => {
        setShowProgress(true);
        Logout()
            .then((response) => {
                setShowProgress(false);
                let data = response.data;
                let success = data.success;
                let message = data.message;
                if (success == 1) {

                    Storage.setAsyncItem('userData', null)

                    navigation.dispatch(state => {
                        return CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Authantication' }]
                        })
                    })
                } else {
                    Toast.show(message);
                }
            })
            .catch(error => {
                console.log(error);

                setShowProgress(false);
                if (!error.status) {
                    Toast.show('No network connection');
                }
            })
    }


    const handleOnItemClick = (order_id) => {
        navigation.navigate('OrderDetail', {
            order_id: order_id
        })
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }


    const renderStatusFilterModal = () => {
        if (statusArray.length > 0) {
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={mdlFilterStatus}
                    onRequestClose={() => {
                        setMdlFilterStatus(false)
                    }} >


                    <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', flex: 1.0 }}>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                setMdlFilterStatus(false)
                            }}>
                            <View style={{ flex: 1.0, }} />
                        </TouchableWithoutFeedback>


                        <View style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
                            <ImageBackground style={{ width: '100%', backgroundColor: 'white', }} source={IMAGE.gbnew}>
                                <View style={{ backgroundColor: 'rgba(255,255,255,0.97)', paddingTop: 24, paddingBottom: 24, }}>
                                    {
                                        statusArray.map(element =>

                                            <View style={styles.checkboxContainer}>
                                                <View style={[styles.chekcBox,
                                                { backgroundColor: statusFilter == element.type ? COLOR.blueDark : 'white' }]}>
                                                    <Icon
                                                        onPress={() => {
                                                            // setStatusFilter(element.type);
                                                            setMdlFilterStatus(false)
                                                            fetchOrder(true, true, element.type);

                                                        }}
                                                        size={20}
                                                        color={'white'}
                                                        name={'check'}
                                                    />
                                                </View>
                                                <Text
                                                    onPress={() => {
                                                        // setStatusFilter(element.type);
                                                        setMdlFilterStatus(false);
                                                        fetchOrder(true, true, element.type);

                                                    }}
                                                    style={styles.statusType}> {element.lable}</Text>
                                            </View>
                                        )
                                    }
                                </View>


                            </ImageBackground>

                        </View>
                    </View>
                </Modal>
            )
        }

    }


    const renderDeliveryItem = (lable, value) => {
        return (

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.ordLable}>{lable}</Text>
                <View style={{ flex: 1.0 }} />
                <Text style={styles.ordValue}>{value}</Text>
            </View>

        )
    }


    return (
        <View style={styles.container} >
            {toolbar(
                "Orders",            //Title
                false,                    //Display only back and title
                false,                    //Is back button
                () => {                  //callBackBack Menu 
                    console.log("back press")
                    navigation.navigate('MyAccount');
                },
                () => {
                    apiCallLogout();
                }, null)
            }

            <View>

                <TouchableWithoutFeedback
                    onPress={() => {
                        setMdlFilterStatus(true)
                    }}>
                    <View style={styles.filterStatusContainer}>
                        <Text style={styles.filterStatus}>{fetchFilteredStatus()}</Text>
                        <Icon
                            type={'font-awesome'}
                            color={COLOR.colorPrimaryDark}
                            size={25}
                            name={'caret-down'}
                        />
                    </View>
                </TouchableWithoutFeedback>


                <ScrollView
                    contentContainerStyle={{ height: DIMENSIOS.height - 56 }}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            //do something
                            if (!isApiCalling) {
                                if (totalpage != 0) {
                                    fetchOrder(false, false, statusFilter);
                                }
                            }

                        }
                    }}
                    refreshControl=
                    {
                        <RefreshControl
                            refreshing={isRefashing}
                            colors={[COLOR.colorPrimary]}
                            onRefresh={() => { onRefresh() }}
                        />
                    }>
                    <View style={styles.container}>

                        {
                            dataOrder.map((element, index) =>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        handleOnItemClick(element.order_id);
                                    }}>
                                    <View style={styles.ordItemContainer}>

                                        <View style={styles.ordItemDetailContaier}>
                                            {renderDeliveryItem("Orner no :", element.order_no)}
                                            {renderDeliveryItem("Buyer name :", element.buyer_name)}
                                            {renderDeliveryItem("Buyer phone no :", element.buyer_phone_no)}
                                            {renderDeliveryItem("Date of order :", moment(element.order_date).format('DD MMMM yyyy') + "")}
                                            {renderDeliveryItem("Amount :", `Rs.${element.order_net_total}`)}
                                            {renderDeliveryItem("Status :", fetchSelectedStatus(element))}
                                        </View>
                                    </View>

                                </TouchableWithoutFeedback>


                            )
                        }

                        {isRefashingBotom && <ActivityIndicator color={COLOR.colorPrimary} size={'small'} style={{ margin: 16 }} />}

                    </View>
                </ScrollView>


                {
                    dataOrder.length > 0 ? null : <View style={styles.emptyView}>
                        <Image source={IMAGE.empty_list} style={styles.emptyimage} />
                        <Text style={styles.emptytext}>{"No delivery found"}</Text>
                    </View>
                }

            </View>





            <SafeAreaView />
            <ParentView />
            <ProgressDialog show={showProgress} />
            {renderStatusFilterModal()}
        </View>
    )


}


export default Dash;