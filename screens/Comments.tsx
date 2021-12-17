import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import constants from '../constants/values';
import useUsername from '../hooks/useUsername';
import Header from '../components/Header';
import MainComment from '../components/MainComment';
import CommentInput from '../components/CommentInput';
import useComments from '../hooks/useComments';
import useReply from '../hooks/useReply';
/**
 * Common screen container component
 * @param {any} children - Nested components
 * @returns Renderable component
 */

const Comments = ({navigation}: any) => {
  const {username} = useUsername();
  const {comments, setCommentData} = useComments();
  const [message, setMessage] = useState('');
  const {reply, setReplyData} = useReply();
  useEffect(() => {
    setReplyData({});
  }, []);
  const sendComment = () => {
    if (Object.keys(reply).length === 0) {
      const comment = {
        comment: message,
        timestamp: new Date().getTime(),
        username: username,
        subComments: [],
      };
      let newcomments = [...comments];
      newcomments.unshift(comment);
      setCommentData(newcomments);
    } else {
      if (reply?.replyToMain) {
        const index = reply?.index;
        const replyToUsername = reply?.replyToUsername;
        const comment = {
          comment: message,
          timestamp: new Date().getTime(),
          username: username,
          replyToUsername: replyToUsername,
        };
        let newcomments = [...comments];
        newcomments[index].subComments.push(comment);
        setCommentData(newcomments);
      } else {
        const index = reply?.index;
        const mainIndex = reply?.mainIndex;
        const replyToUsername = reply?.replyToUsername;
        const secondReply = reply?.secondReply;

        const comment = {
          comment: message,
          timestamp: new Date().getTime(),
          username: username,
          replyToUsername: replyToUsername,
          secondReply: secondReply,
        };
        let newcomments = [...comments];
        newcomments[mainIndex].subComments.push(comment);
        setCommentData(newcomments);
      }
    }
  };

  const deleteComment = (index: number) => {
    let newcomments = [...comments];
    newcomments.splice(index, 1);
    setCommentData(newcomments);
  };
  const deleteInternalComment = (index1: number, index2: number) => {
    let newcomments = [...comments];
    newcomments[index1].subComments.splice(index2, 1);
    setCommentData(newcomments);
  };
  useEffect(() => {
    setMessage('');
  }, [comments]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <>
        <Header
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          {/* <Text style={styles.title}>{`COMMENTS`}</Text> */}
          <View style={styles.containerSafe}>
            <FlatList
              data={comments}
              renderItem={({item, index}) => {
                return (
                  <MainComment
                    key={index}
                    index={index}
                    data={item}
                    deleteComment={() => {
                      deleteComment(index);
                    }}
                    deleteInternalComment={(value: number) => {
                      deleteInternalComment(index, value);
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
        <CommentInput
          sendComment={sendComment}
          value={message}
          onChangeText={setMessage}
          placeholder="Add a comment"
        />
      </>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 150,
  },
  containerSafe: {
    width: '100%',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: constants.fontSizes.logo,
    fontWeight: '700',
    marginTop: '1%',
    marginBottom: 10,
  },
});

export default Comments;
