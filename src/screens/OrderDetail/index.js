import React, { useState, useEffect } from 'react'
import { View, ScrollView, RefreshControl, SafeAreaView, Text, Image, Modal, TouchableWithoutFeedback, ImageBackground } from 'react-native'

import moment from 'moment';
import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements'

import { toolbar } from '../../component'
import { orderDetail, getDeliveriesDetail, updateDelivery } from '../../networkcall'
import { COLOR } from '../../constants/constants'
import { IMAGE } from '../../images'

import styles from './styles'
import ProgressDialog from '../../View/ProgressDialog';
import ParentView from '../../View/ParentView';

function OrderDetil(props) {

    const { route, navigation } = props;
    const { order_id } = route.params;
    const [showProgress, setShowProgress] = useState(false)
    const [orderData, setOrderData] = useState(null)

    const [statusArray, setStatusArray] = useState([])
    const [mdlUpdateState, setMdlUpdateState] = useState(false)
    const [mdlSelectedStatus, setMdlSelectedStatus] = useState(null)


    useEffect(() => {
        fetchOrderDetail();
    }, [])



    const fetchOrderDetail = () => {
        setShowProgress(true)
        getDeliveriesDetail(order_id)
            .then((response) => {
                setShowProgress(false)
                let data = response.data;
                let success = data.success;
                let message = data.message;
                console.log(JSON.stringify(data));
                if (success == "1") {
                    setOrderData(data.data.delivery_details)
                    let orderData = data.data.delivery_details
                    setStatusArray(
                        [
                            { lable: "DELIVERY ASSIGNED", status: orderData.shipping_delivery_status.assigned, type: 'assigned' },
                            { lable: "ON DELIVERY", status: orderData.shipping_delivery_status.picked, type: 'picked' },
                            { lable: "DELIVERY DELIVERED", status: orderData.shipping_delivery_status.delivered, type: 'delivered' },
                        ]
                    )
                } else {
                    Toast.show(message)
                }
            })
            .catch((error) => {
                setShowProgress(false)
                if (!error.status) {
                    Toast.show("No network connection ")
                }
                console.log(error)
            });
    }

    const updateStatus = (status) => {
        setMdlUpdateState(false)
        setShowProgress(true)
        updateDelivery(order_id, status == "picked" ? 2 : status == 'delivered' ? 3 : 1)
            .then((response) => {
                setShowProgress(false)
                let data = response.data;
                let success = data.success;
                let message = data.message;
                console.log(JSON.stringify(data));
                if (success == "1") {
                    fetchOrderDetail();
                } else {
                    Toast.show(message)
                }
            })
            .catch((error) => {
                setShowProgress(false)
                if (!error.status) {
                    Toast.show("No network connection ")
                }
                console.log(error)
            });
    }

    const fetchSelectedStatus = () => {
        let status = "";
        if (statusArray[2].status == 1) {
            status = statusArray[2].lable
            // setMdlSelectedStatus(statusArray[2].status);
        } else if (statusArray[1].status == 1) {
            status = statusArray[1].lable
            // setMdlSelectedStatus(statusArray[1].status);
        } else if (statusArray[0].status == 1) {
            status = statusArray[0].lable
        }

        console.log(mdlSelectedStatus)
        return status;
    }

    const checkSelectedStatus = () => {
        if (statusArray[2].status == 1) {
            setMdlSelectedStatus(statusArray[2].status);
        } else if (statusArray[1].status == 1) {
            setMdlSelectedStatus(statusArray[1].status);
        }
    }


    const content = () => {
        return (
            <View style={styles.container}>

                {toolbar("Order detail", true, true, () => { navigation.goBack(null) }, null, null)}
                {
                    orderData ?
                        <ScrollView>

                            {
                                statusArray.length > 0 &&
                                <View style={styles.yellowbg}>
                                    <Text style={styles.sectionLable}>Order status</Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            checkSelectedStatus();
                                            setMdlUpdateState(true)
                                        }}>
                                        <View style={styles.updateStausContainer}>
                                            <Text style={styles.updateStaus}>{fetchSelectedStatus()}</Text>
                                            <Icon
                                                type={'font-awesome'}
                                                color={'black'}
                                                size={25}
                                                name={'caret-down'}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            }

                            <View style={styles.teagreenbg}>
                                <Text style={styles.sectionLable}>Buyer detail</Text>
                                <View style={styles.addressContainer}>
                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Name</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>{orderData.buyer_name}</Text>
                                    </View>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Phone no</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>{orderData.buyer_phone_no}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={styles.orangebg}>
                                <Text style={styles.sectionLable}>Order detail</Text>
                                <View style={styles.addressContainer}>
                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Order no</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>{orderData.order_no}</Text>
                                    </View>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Order date</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>{moment(orderData.order_date).format('DD MMMM yyyy') + ""}</Text>
                                    </View>

                                </View>
                            </View>




                            <View style={styles.skyblueBg}>
                                <Text style={styles.sectionLable}>Items ({orderData.order_purchase_items.length})</Text>
                                {
                                    orderData.order_purchase_items.map((element, index) =>
                                        <View style={[styles.prdContainer, { marginBottom: (index == orderData.order_purchase_items.length - 1) ? 0 : 2 }]}>
                                            <View style={styles.prdDetailContainer}>
                                                <Text style={styles.prdTitle}>{element.product_name}</Text>
                                                <View style={styles.prdPriceContainer}>
                                                    <Text style={styles.prdPrice}>MRP Rs. {element.product_selling_price}</Text>
                                                    <Text>*</Text>
                                                    <Text style={styles.prdQty}>Qty: {element.product_quantity}</Text>
                                                    <Text>=</Text>
                                                    <Text style={styles.prdPriceTotal}>Rs. {element.product_selling_price * element.product_quantity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )

                                }
                            </View>


                            <View style={styles.redbg}>
                                <View style={styles.margin16} />
                                <Text style={styles.sectionLable}>Payment summary</Text>
                                <View style={styles.addressContainer}>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Sub total</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>Rs.{orderData.order_total}</Text>
                                    </View>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Discount</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>- Rs.{orderData.order_discount}</Text>
                                    </View>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Total</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>Rs.{orderData.order_net_total}</Text>
                                    </View>

                                    <View style={styles.pricecontainerSub}>
                                        <Text style={styles.textSbTtl}>Payment mode</Text>
                                        <View style={{ flex: 1.0 }} />
                                        <Text style={styles.txtTotal}>{orderData.order_payment_type == 0 ? "Cash on delivery" : "Card"}</Text>
                                    </View>
                                </View>
                            </View>



                            <View style={styles.cynBg}>

                                <View style={styles.margin16} />
                                <Text style={styles.sectionLable}>Drop address</Text>
                                <View style={styles.addressContainer}>
                                    <Text style={styles.addressTxt}>
                                        {orderData.shipping_drop_address.address}
                                        {'\n'}
                                        {orderData.shipping_drop_address.pincode}
                                        {'\n'}
                                        {orderData.shipping_drop_address.phone_no}
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.pinkBg}>
                                <View style={styles.margin16} />
                                <Text style={styles.sectionLable}>Remark</Text>
                                <View style={styles.addressContainer}>
                                    <Text style={styles.addressTxt}>
                                        {orderData.order_buyer_remarks}
                                    </Text>
                                </View>
                                <View style={styles.margin16} />
                            </View>



                        </ScrollView>
                        :
                        null

                }

                {
                    orderData &&
                    <Text style={styles.trackOrder} onPress={() => {
                        navigation.navigate('OrderTracker', {
                            orderData: orderData
                        });
                    }}>Track Order</Text>
                }

                {renderUpdateStausModal()}
                <ProgressDialog show={showProgress} />
                <ParentView />
                <SafeAreaView />
            </View>
        )
    }

    const renderUpdateStausModal = () => {
        if (statusArray.length > 0) {
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={mdlUpdateState}
                    onRequestClose={() => {
                        setMdlUpdateState(false)
                    }} >


                    <View style={{ backgroundColor: 'rgba(0,0,0,0.8)', flex: 1.0 }}>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                setMdlUpdateState(false)
                            }}>
                            <View style={{ flex: 1.0, }} />
                        </TouchableWithoutFeedback>



                        <View style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
                            <ImageBackground style={{ width: '100%', backgroundColor: 'white' }} source={IMAGE.gbnew}>

                                <View style={{ backgroundColor: 'rgba(255,255,255,0.96)', paddingTop: 24, paddingBottom: 24 }}>
                                    <View style={styles.checkboxContainer}>
                                        <View style={[styles.chekcBox,
                                        { backgroundColor: mdlSelectedStatus == statusArray[1].status ? COLOR.blueDark : 'white' }]}>
                                            <Icon
                                                onPress={() => {
                                                    updateStatus(statusArray[1].type);
                                                }}
                                                size={20}
                                                color={'white'}
                                                name={'check'}
                                            />
                                        </View>
                                        <Text
                                            onPress={() => {
                                                updateStatus(statusArray[1].type);
                                            }}
                                            style={styles.statusType}> {statusArray.length > 0 ? statusArray[1].lable : ""}</Text>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <View style={[styles.chekcBox,
                                        { backgroundColor: mdlSelectedStatus == statusArray[2].status ? COLOR.blueDark : 'white' }]}>
                                            <Icon
                                                onPress={() => {
                                                    updateStatus(statusArray[2].type);
                                                }}
                                                size={20}
                                                color={'white'}
                                                name={'check'}
                                            />
                                        </View>
                                        <Text
                                            onPress={() => {
                                                updateStatus(statusArray[2].type);
                                            }}
                                            style={styles.statusType}> {statusArray.length > 0 ? statusArray[2].lable : ""}</Text>
                                    </View>

                                </View>

                            </ImageBackground>
                        </View>
                    </View>


                </Modal>
            )
        }

    }

    return content();
}

export default OrderDetil;