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
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NumHeader } from "../../components/navHeader.component";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import Models from "../../models";
import {
  SOURCE_MESSAGE_CLOSE,
  SOURCE_MESSAGE_ERROR, SOURCE_MESSAGE_EXIT_GROUP,
  SOURCE_MESSAGE_FINISH,
  SOURCE_MESSAGE_FIX, SOURCE_MESSAGE_GROUP, SOURCE_MESSAGE_INSTRUMENT,
  SOURCE_MESSAGE_RUN, SOURCE_MESSAGE_STOP,
} from "../../common/ImageSource";
import { Colors, Layout, Sizing } from "../../common/styles";
import Badge from "teaset/components/Badge/Badge";

const MessagePage = () => {
  const MESSAGE_SORT=[
    {
      icon:SOURCE_MESSAGE_ERROR,
      title:'故障',
      color:"#FF2C00",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_FIX,
      title:'维修',
      color:"#EF9300",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_RUN,
      title:'开始运行',
      color:"#4AC46A",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_FINISH,
      title:'运行完成',
      color:"#4BDAAE",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_STOP,
      title:'程序被终止',
      color:"#0C6D71",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_CLOSE,
      title:'仪器关闭',
      color:"#F7651A",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_EXIT_GROUP,
      title:'退出群聊',
      color:"#8C9AB5",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_GROUP,
      title:'群消息',
      color:"#8C9AB5",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
    {
      icon:SOURCE_MESSAGE_INSTRUMENT,
      title:'仪器',
      color:"#8C9AB5",
      message:{
        time:'3分钟前',
        content:'sdaddadsdadadasdasd',
        un_read:0
      }
    },
  ]
  /*-------------------------生命周期----------------------------*/
  /*-------------------------API----------------------------*/
  /*-------------------------回调事件----------------------------*/
  /*-------------------------事件----------------------------*/
  /*-------------------------子视图----------------------------*/
  /*-------------------------主视图----------------------------*/
  return (
    <>
      <NumHeader title={I18n.t('title_message')} num={"0"} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={[Layout.flex.full,{paddingTop:Sizing.adaptionSpace(30)}]}>
          {MESSAGE_SORT.map((item,index)=>{
            return(
              <MessageSortItem key={String(item)+index} item={item}/>
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
  const {icon,title,color,message}=props.item
  const {content,time,un_read}=message
  return<View style={styles.itemContainerStyle}>
    <View >
      <Image source={icon} style={styles.iconStyle}/>
      {un_read>0&&<Badge
        count={un_read}
        style={{position:'absolute',right:0}}
        countStyle={{fontSize:Sizing.t8}}
      />}
    </View>
    <View style={{marginLeft:Sizing.t10,flex:1}}>
      <View style={[Layout.flex.row,Layout.crossAxis.spaceBetween]}>
        <Text style={[styles.sortTextStyle,{color}]}>{title}</Text>
        <Text style={styles.timeTextStyle}>{time}</Text>
      </View>
      <Text style={styles.contentTextStyle}>{content}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F5F5F5"
  },
  itemContainerStyle:{
    ...Layout.flex.row,
    marginHorizontal:Sizing.t20,
    marginBottom:Sizing.t20,
  },
  iconStyle:{
    width:Sizing.adaptionSpace(50),
    height:Sizing.adaptionSpace(50),
  },
  sortTextStyle:{
    fontSize:Sizing.t16,
    marginBottom: Sizing.t16
  },
  timeTextStyle:{
    fontSize:Sizing.t12,
    color:Colors.neutral.gray99
  },
  contentTextStyle:{
    fontSize:Sizing.t12,
    color:Colors.neutral.gray66
  },
});
