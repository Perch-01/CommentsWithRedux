import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import constants from '../constants/values';
import moment from 'moment';
import useReply from '../hooks/useReply';
import useUsername from '../hooks/useUsername';
interface subcomment {
  comment: string;
  timestamp: number;
  username: string;
  replyToUsername: string;
  secondReply: string | null;
}

/**
 * Subcomment component
 * @param {subcomment} data - An object for the sub component
 * @param {number} index - The index of the subcomment
 * @param {number} mainIndex - The index of the main comment
 * @param {Function} deleteInternalComment - Function to delete the comment
 * @returns Renderable component
 */
const SubComment = ({
  data,
  index,
  mainIndex,
  deleteInternalComment,
}: {
  data: subcomment;
  index: number;
  mainIndex: number;
  deleteInternalComment: Function;
}) => {
  const {setReplyData} = useReply();
  const {username: signedInUserName} = useUsername();
  const [date, setDate] = useState(new Date());
  const {comment, timestamp, username, replyToUsername, secondReply} = data;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.avatar} />
        <Text style={styles.username}>
          {username}
          <Text style={styles.replyingTo}>{` replying to `}</Text>
          {replyToUsername}
          {secondReply && (
            <>
              <Text style={styles.replyingTo}>{`\n and `}</Text>
              {secondReply}
            </>
          )}
        </Text>
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
                replyToMain: false,
                index: index,
                mainIndex: mainIndex,
                replyToUsername: replyToUsername,
                secondReply: username,
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
                        deleteInternalComment();
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
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: constants.colors.WHITE,
    paddingVertical: 10,
    marginTop: 5,
    borderLeftWidth: 5,
    borderColor: constants.colors.GREY,
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
    textAlign: 'right',
  },
  replyingTo: {
    fontSize: constants.fontSizes.comment,
    fontWeight: '200',
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
});
export default SubComment;
