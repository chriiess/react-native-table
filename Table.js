import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, ScrollView, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

let leftFlat = null;
let rightFlat = null;

export default class Table extends PureComponent {
  static propTypes: {
    head: PropTypes.array,
    list: PropTypes.array,
  };

  _keyExtractor = (item, index) => index.toString();

  _leftHeadRender(leftTitles) {
    if (leftTitles.length === 0) {
      return null;
    }
    return (
      <View style={styles.leftListRow}>
        {leftTitles.map((item, i) => (
          <View key={`lhead${i}`} style={styles.cellView}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    );
  }

  _rightHeadRender(rightTitles) {
    if (rightTitles.length === 0) {
      return null;
    }
    return (
      <View style={styles.rightListRow}>
        {rightTitles.map((item, i) => (
          <View key={`rhead${i}`} style={styles.cellView}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    );
  }

  _leftRenderRow(rowData) {
    return (
      <View style={styles.leftListRow}>
        {Object.keys(rowData.item).map(key => (
          <View key={`llist${key}`} style={styles.cellView}>
            <Text>{rowData.item[key]}</Text>
          </View>
        ))}
      </View>
    );
  }

  _rightRenderRow(rowData) {
    return (
      <View style={styles.rightListRow}>
        {Object.keys(rowData.item).map(key => (
          <View key={`rlist${key}`} style={styles.cellView}>
            <Text>{rowData.item[key]}</Text>
          </View>
        ))}
      </View>
    );
  }

  rightScroll(e) {
    const newScrollOffset = e.nativeEvent.contentOffset.y;
    leftFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
  }

  leftScroll(e) {
    const newScrollOffset = e.nativeEvent.contentOffset.y;
    rightFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
  }

  render() {
    const leftHead = this.props.head.splice(0, 1);
    const rightHead = this.props.head.splice(0);

    const list = this.props.list;
    const leftList = [];
    const rightList = [];

    list.map((item, i) => {
      Object.keys(item).map((key, i) => {
        if (i === 0) {
          leftList.push({ [key]: item[key] });
          delete item[key];
          rightList.push(item);
        }
      });
    });

    console.log(leftHead, rightHead, leftList, rightList);

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {this._leftHeadRender(leftHead)}
          <FlatList
            ref={ref => leftFlat = ref}
            data={leftList}
            renderItem={item => this._leftRenderRow(item)}
            keyExtractor={this._keyExtractor}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.right}>
            {this._rightHeadRender(rightHead)}
            <FlatList
              ref={ref => rightFlat = ref}
              data={rightList}
              renderItem={item => this._rightRenderRow(item)}
              onScroll={e => this.rightScroll(e)}
              scrollEventThrottle={1}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginTop: 20,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  left: {
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  right: {
    backgroundColor: 'white',
  },
  leftListRow: {
    alignItems: 'center', // 水平局中
    justifyContent: 'center', // 垂直居中
    borderColor: '#DCD7CD',
  },
  rightListRow: {
    width: '100%',
    flexDirection: 'row',
  },
  cellView: {
    width: 100,
    height: 40,
    // backgroundColor: '#db384c',
    borderColor: '#DCD7CD',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center', // 水平局中
    justifyContent: 'center', // 垂直居中
  },
});
