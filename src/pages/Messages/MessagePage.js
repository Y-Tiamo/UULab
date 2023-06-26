/**
 * Desc：
 * Author：YYQ
 * Date: 2023/6/13
 *
 * * * * * * * * * * * * * * * * * * *
 * Content Desc:
 *
 * * * * * * * * * * * * * * * * * * *
 */

import React from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {NumHeader} from "../../components/navHeader.component";
import I18n from "react-native-i18n";
import {connect} from "react-redux";
import Models from "../../models";
import {
    SOURCE_MESSAGE_CLOSE,
    SOURCE_MESSAGE_ERROR, SOURCE_MESSAGE_EXIT_GROUP,
    SOURCE_MESSAGE_FINISH,
    SOURCE_MESSAGE_FIX, SOURCE_MESSAGE_GROUP, SOURCE_MESSAGE_INSTRUMENT,
    SOURCE_MESSAGE_RUN, SOURCE_MESSAGE_STOP,
} from "../../common/ImageSource";
import {Colors, Layout, Sizing} from "../../common/styles";
import Badge from "teaset/components/Badge/Badge";
import ListRow from "teaset/components/ListRow/ListRow";
import NavigationService from "../../common/NavigationService";

const MessagePage = () => {
    const MESSAGE_INFO={
        instrument_error:{
            type:'instrument_error',
            icon: SOURCE_MESSAGE_ERROR,
            title: '故障',
            color: "#FF2C00",
            message:{},
            unread_count:0
        },
        maintain :{
            type:'maintain',
            icon: SOURCE_MESSAGE_FIX,
            title: '维修',
            color: "#EF9300",
            message:{},
            unread_count:0
        },
        run_start :{
            type:'run_start',
            icon: SOURCE_MESSAGE_RUN,
            title: '开始运行',
            color: "#4AC46A",
            message:{},
            unread_count:0
        },
        run_finish :{
            type:'run_finish',
            icon: SOURCE_MESSAGE_FINISH,
            title: '运行完成',
            color: "#4BDAAE",
            message:{},
            unread_count:0
        },
        run_stop :{
            type:'run_stop',
            icon: SOURCE_MESSAGE_STOP,
            title: '程序被终止',
            color: "#0C6D71",
            message:{},
            unread_count:0
        },
        instrument_shutdown :{
            type:'instrument_shutdown',
            icon: SOURCE_MESSAGE_CLOSE,
            title: '仪器关闭',
            color: "#F7651A",
            message:{},
            unread_count:0
        },
        exit_group :{
            type:'exit_group',
            icon: SOURCE_MESSAGE_EXIT_GROUP,
            title: '退出群聊',
            color: "#8C9AB5",
            message:{},
            unread_count:0
        },
        group_message :{
            type:'group_message',
            icon: SOURCE_MESSAGE_GROUP,
            title: '群消息',
            color: "#8C9AB5",
            message:{},
            unread_count:0
        },
        instrument_apply:{
            type:'instrument_apply',
            icon: SOURCE_MESSAGE_INSTRUMENT,
            title: '仪器',
            color: "#8C9AB5",
            message:{},
            unread_count:0
        },
    }
    const [messages,setMessages]=React.useState([])
    const [unreadCount,setCount]=React.useState(0)
    const List=[
        {
            "type":"instrument_error",
            "unread_count": 88,
            "message":{
                "read":0,
                "create_time":123456789,
                "content":"XXXXXXX",
                "type":"instrument_error",
            }
        },
        {
            "type":"run_stop",
            "unread_count": 1,
            "message":{
                "read":0,
                "create_time":123456789,
                "content":"XXXXXXX",
                "type":"run_stop",
            }
        }
    ]
    /*-------------------------生命周期----------------------------*/
    React.useEffect(()=>{
        getSortData()
    },[])
    /*-------------------------API----------------------------*/
    function getSortData() {
        let data=[]
        let num=0
        List.map((item,index)=>{
            if (MESSAGE_INFO.hasOwnProperty(item.type)){
                let message={
                    ...MESSAGE_INFO[item.type],
                    message:item.message,
                    unread_count:item.unread_count
                }
                data.push(message)
                num+=message.unread_count
            }
        })
        setMessages(data)
        setCount(num)
    }
    /*-------------------------回调事件----------------------------*/
    /*-------------------------事件----------------------------*/
    /*-------------------------子视图----------------------------*/
    /*-------------------------主视图----------------------------*/
    return (
        <>
            <NumHeader title={I18n.t('title_message')} num={unreadCount}/>
            <SafeAreaView style={styles.container}>
                <ScrollView style={[Layout.flex.full, {paddingTop: Sizing.adaptionSpace(30)}]}>
                    {messages.map((item, index) => {
                        return (
                            <MessageSortItem key={String(item) + index} item={item}/>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};
export const Message = connect(state => ({
    localeEnv: state[Models.home].localeEnv
}))(MessagePage);
export default Message;

const MessageSortItem = (props) => {
    const {item}=props
    const onPress = () => {
        NavigationService.navigate('MessageListPage',{
            item
        })
    }
    return <ListRow
        title={<Item item={item}/>}
        swipeActions={[
            <ListRow.SwipeActionButton title={I18n.t('delete')} type='danger' onPress={() => alert('Remove')}/>,
            <ListRow.SwipeActionButton title={I18n.t('cancel')}/>,
        ]}
        onPress={onPress}
        style={{backgroundColor:Colors.neutral.grayF8}}
        bottomSeparator={null}
    />
}
const Item = (props) => {
    const {icon, title, color, message,unread_count} = props.item
    const {content, create_time} = message

    return <View style={styles.itemContainerStyle}>
        <View>
            <Image source={icon} style={styles.iconStyle}/>
            {unread_count > 0 && <Badge
                count={unread_count}
                style={{position: 'absolute', right: 0}}
                countStyle={{fontSize: Sizing.t8}}
            />}
        </View>
        <View style={{marginLeft: Sizing.t10, flex: 1}}>
            <View style={[Layout.flex.row, Layout.crossAxis.spaceBetween]}>
                <Text style={[styles.sortTextStyle, {color}]}>{title}</Text>
                <Text style={styles.timeTextStyle}>{create_time}</Text>
            </View>
            <Text style={styles.contentTextStyle}>{content}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral.grayF8
    },
    itemContainerStyle: {
        ...Layout.flex.row,
        marginHorizontal: Sizing.t20,
        marginBottom: Sizing.t20,
        backgroundColor:Colors.neutral.grayF8
    },
    iconStyle: {
        width: Sizing.adaptionSpace(50),
        height: Sizing.adaptionSpace(50),
    },
    sortTextStyle: {
        fontSize: Sizing.t16,
        marginBottom: Sizing.t16
    },
    timeTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.gray99
    },
    contentTextStyle: {
        fontSize: Sizing.t12,
        color: Colors.neutral.gray66
    },
});
