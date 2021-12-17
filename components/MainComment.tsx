import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import constants from '../constants/values';
import moment from 'moment';
import SubComment from './SubComment';
import useComments from '../hooks/useComments';
import useReply from '../hooks/useReply';
import useUsername from '../hooks/useUsername';

interface subcomment {
  comment: string;
  timestamp: number;
  username: string;
  secondReply: string | null;
}
interface comment {
  comment: string;
  timestamp: number;
  username: string;
  subComments: Array<subcomment>;
}

/**
 * Main comment component
 * @param {object} data - Data containing the object
 * @param {number} index - Index of data
 * @param {function} deleteComment - Function to delete comment
 * @returns Renderable component
 */

const MainComment = ({
  data,
  deleteComment,
  index,
  deleteInternalComment,
}: {
  data: comment;
  deleteComment: Function;
  deleteInternalComment: Function;
  index: number;
}) => {
  const {username: signedInUserName} = useUsername();
  const [date, setDate] = useState(new Date());
  const {comment, timestamp, username, subComments} = data;
  const {setReplyData} = useReply();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <Text style={styles.body}>{comment}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.date}>
            {moment(new Date(timestamp)).from(date)}
          </Text>
          <View style={styles.optionsArray}>
            <TouchableOpacity
              style={styles.reply}
              onPress={() => {
                setReplyData({
                  replyToMain: true,
                  index: index,
                  replyToUsername: username,
                });
              }}>
              <Image
                source={require('../assets/images/reply.png')}
                resizeMode={'contain'}
              />
              <Text style={styles.replyText}>{'REPLY'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trash}
              onPress={() => {
                if (signedInUserName == username)
                  Alert.alert(
                    'Delete Comment?',
                    'Do you want to delete this comment',
                    [
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          deleteComment();
                        },
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                  );
                else
                  alert(
                    `Change your username to "${username}" to delete this comment`,
                  );
              }}>
              <Image
                source={require('../assets/images/trash.png')}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.subs}>
        {/* <View style={[styles.threadView, {height: threadHeight}]}>
          {threadHeight !== 0 && <View style={[styles.thread]} />}
        </View> */}
        <View style={styles.subCommentsView}>
          <FlatList
            data={subComments}
            //@ts-ignore
            renderItem={({item, index_}: {item: any; index_: number}) => {
              return (
                <SubComment
                  key={index_}
                  data={item}
                  mainIndex={index}
                  index={index_}
                  deleteInternalComment={() => {
                    deleteInternalComment(index_);
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: constants.colors.WHITE,
    paddingVertical: 10,
    marginTop: 10,
  },
  avatar: {
    borderColor: constants.colors.GREY,
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  top: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: constants.fontSizes.username,
    fontWeight: '600',
    marginLeft: 10,
    top: 5,
  },
  body: {
    fontSize: constants.fontSizes.comment,
    fontWeight: '300',
    width: '80%',
    marginVertical: 10,
    lineHeight: constants.fontSizes.comment + 6,
  },
  detailsContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    //  marginBottom: 20,
  },
  date: {
    fontWeight: '500',
    fontSize: 12,
  },
  replyText: {
    fontWeight: '400',
    fontSize: 13,
    marginLeft: 7,
  },
  reply: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsArray: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trash: {
    padding: 5,
    marginLeft: 10,
  },
  subs: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  threadView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '10%',
  },
  thread: {
    width: 5,
    height: '98%',
    backgroundColor: constants.colors.WHITE,
    borderRadius: 10,
  },
  subCommentsView: {
    width: '90%',
  },
});
export default MainComment;
