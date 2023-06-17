/**----------------------------------------------------------------*/
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Colors, Layout } from "../../common/styles";
import { NavHeader } from "../../components/navHeader.component";
import RichTextWebView from "../../common/components/RichTextWebView";

/**----------------------------------------------------------------*/

const SpecialArticlePage = props => {
  const { title} = props.navigation.state.params;
  const [articleInfo, setArticleInfo] = React.useState('关于我们');
  /*-----------------------------生命周期---------------------*/
  React.useEffect(() => {

  }, []);
  /*-----------------------------API请求---------------------*/
  /*-----------------------------主视图----------------------*/

  return (
    <SafeAreaView style={[styles.contentStyle]}>
      <NavHeader title={title} style={{ borderBottomWidth: 1, borderBottomColor: Colors.neutral.grayF5 }} />
      <ScrollView><RichTextWebView htmlData={articleInfo} /></ScrollView>
    </SafeAreaView>
  );
};

export default SpecialArticlePage;
const styles = StyleSheet.create({
  contentStyle: {
    ...Layout.flex.full,
    backgroundColor: Colors.neutral.white,
  },
});
