import React, { useState, useEffect } from 'react'
import { View, ScrollView, RefreshControl, SafeAreaView, Text, Image } from 'react-native'

import { Icon } from 'react-native-elements';

import { toolbar } from '../../../component'
import { orderDetail } from '../../../networkcall'
import { COLOR } from '../../../constants/constants'
import { IMAGE } from '../../../images'

import styles from './styles'
import ProgressDialog from '../../../View/ProgressDialog';
import ParentView from '../../../View/ParentView';

function OrderTracker(props) {

    const { navigation, route } = props;
    const { orderData } = route.params;

    const [statusArray, setStatusArray] = useState([
        { lable: "ASSIGNED", status: orderData.shipping_delivery_status.assigned, type: 'assigned' },
        { lable: "ON DELIVERY", status: orderData.shipping_delivery_status.picked, type: 'picked' },
        { lable: "DELIVERED", status: orderData.shipping_delivery_status.delivered, type: 'delivered' },
    ])


    const content = () => {
        return (
            <View style={styles.container}>
                {toolbar("Track order", true, true, () => { navigation.goBack(null) }, null, null)}
                <ScrollView>
                    <View>
                        <Text style={styles.title}>Order Status</Text>
                        <Text style={styles.orderId}>{orderData.order_no}</Text>
                        <View style={{ alignSelf: 'center', marginStart: -32, paddingTop: 24 }}>
                            {
                                statusArray.map((element, index) =>
                                    <View style={styles.trackingcell}>

                                        {/* <Image source={IMAGE.empty_cart} style={styles.trackigImage} /> */}

                                        <View style={styles.trackLineContainer}>
                                            <View style={[styles.trackingLine, { marginBottom: element.type == 'delivered' ? 90 : 0 }]} />
                                            <View style={styles.emptyStatus} >
                                                {
                                                    element.status == 1 &&
                                                    <Icon
                                                        name={"check"}
                                                        type="font-awesome"
                                                        color={"white"}
                                                        size={12}
                                                        containerStyle={styles.rightIcon}
                                                    />
                                                }

                                            </View>
                                        </View>

                                        <View>
                                            <Text style={styles.orderStatus}>{element.lable}</Text>
                                            {/* <Text style={styles.orderStatusDate}>2020 07 04 08:45 AM</Text> */}
                                        </View>
                                    </View>
                                )
                            }
                        </View>

                    </View>
                </ScrollView>
                <ParentView />
                <SafeAreaView />
                <ProgressDialog />
            </View>
        )
    }

    return content();
}

export default OrderTracker;