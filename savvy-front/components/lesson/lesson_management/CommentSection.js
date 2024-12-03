import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useMutation, gql } from "@apollo/client";
import parse from "html-react-parser";
import moment from "moment";
import { OrangeButton } from "./../styles/DevPageStyles";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION(
    $text: String!
    $blockId: String!
    $lessonId: String!
  ) {
    createComment(text: $text, blockId: $blockId, lessonId: $lessonId) {
      id
      text
      blockId
      status
      userId
      lessonId
      lesson {
        id
      }
      user {
        id
        name
        surname
        image
      }
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

const UPDATE_COMMENT_STATUS_MUTATION = gql`
  mutation UPDATE_COMMENT_STATUS_MUTATION(
    $id: String!
    $text: String
    $status: CommentStatus
  ) {
    updateComment(id: $id, text: $text, status: $status) {
      id
      text
      status
    }
  }
`;

const CREATE_REPLY_MUTATION = gql`
  mutation CREATE_REPLY_MUTATION(
    $text: String!
    $blockId: String!
    $lessonId: String!
    $sourceCommentId: String!
  ) {
    createReply(
      text: $text
      blockId: $blockId
      lessonId: $lessonId
      sourceCommentId: $sourceCommentId
    ) {
      id
      text
      blockId
      status
      userId
      lessonId
      parentComment {
        id
      }
      user {
        id
        name
        surname
        image
      }
    }
  }
`;

const DELETE_REPLY_MUTATION = gql`
  mutation DELETE_REPLY_MUTATION($id: String!) {
    deleteReply(id: $id) {
      id
    }
  }
`;

const CommentSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  padding: 20px 0;
  p {
    margin: 5px 0;
  }
`;

const CreateCommentStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 610px;

  margin: 20px 0;
  border-top: 1px solid #f2f2f2;
  background-color: #f2f2f2;
  color: #474747;
  padding: 20px;
  border-radius: 20px;
`;

const SingleComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 610px;
  margin-top: 30px;
  .parent_comment {
    display: flex;
    flex-direction: row;
    background: #fff;
    z-index: 10;
  }
  .left_column {
    display: flex;
    flex-direction: column;
    width: 65px;
  }
  .parent_connection_line {
    border-left: 2px solid #e4e4e4;
    height: 100%;
    margin-left: 17px;
    margin-top: 10px;
  }
  .right_column {
    display: flex;
    flex-direction: column;
  }
  .comment_author_info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    .comment_author_name {
      font-weight: 600;
      font-size: 1.6rem;
      margin-right: 15px;
    }
    .comment_creation_time {
      color: #757575;
      margin-right: 15px;
      font-size: 1.4rem;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .comment_buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 85%;
    margin-top: 7px;
    border-top: 1px solid #f2f2f2;
    padding-top: 7px;
    button {
      margin-right: 15px;
    }
  }
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e4e4e4;
  margin-right: 15px;
`;

const ReplyComment = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  width: 550px;
  .reply_parent_comment {
    display: flex;
    flex-direction: row;
  }

  .central_column {
    margin-top: 30px;
  }
  .right_column {
    margin-top: 30px;
    max-width: 400px;
  }
`;

const ChildLeftColumn = styled.div`
  border-left: 2px solid #e4e4e4;
  border-left: ${(props) =>
    props.last ? "2px solid #fff" : "2px solid #e4e4e4"};
  height: 100%;
  margin-left: 17px;
  margin-top: 17px;

  width: 38px;
  .child_connection_line {
    border-bottom: 2px solid #e4e4e4;
    border-left: 2px solid #e4e4e4;
    height: 130px;

    border-bottom-left-radius: 30px;
    margin-left: -2px;
    margin-top: -98px;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  font-family: Montserrat;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
  padding: 0;
  &:hover {
    color: #d15005;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  font-family: Montserrat;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
  padding: 0;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CommentSection = (props) => {
  const [comments, setComments] = useState(
    props.comments.length > 0 ? props.comments : []
  );
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const [createReply, { loading: replyLoading, error: replyError }] =
    useMutation(CREATE_REPLY_MUTATION);

  const [createComment, { loading, error }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);
  const [updateComment] = useMutation(UPDATE_COMMENT_STATUS_MUTATION);
  const [deleteReply] = useMutation(DELETE_REPLY_MUTATION);

  const myCallback = (dataFromChild) => {
    setNewComment(dataFromChild);
  };

  const addComment = async () => {
    const res = await createComment({
      variables: {
        text: newComment,
        blockId: props.blockId,
        lessonId: props.lessonId,
      },
    });
    setComments([...comments, res.data.createComment]);
  };

  const handleDeleteComment = async (id) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment({
        variables: {
          id: id,
        },
      });
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  const handleUpdateCommentStatus = async (status, id, text) => {
    await updateComment({
      variables: {
        id: id,
        text: text,
        status: status,
      },
    });
    setComments(
      comments.map((comment) => {
        if (comment.id == id) {
          return {
            ...comment,
            status: status,
          };
        }
        return comment;
      })
    );
  };

  const addReply = async (parentCommentId) => {
    const res = await createReply({
      variables: {
        text: newReply,
        blockId: props.blockId,
        lessonId: props.lessonId,
        sourceCommentId: parentCommentId,
      },
    });
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentCommentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), res.data.createReply],
            }
          : comment
      )
    );
    setReplyTo(null);
    setNewReply("");
  };

  const handleDeleteReply = async (parentCommentId, replyId) => {
    if (confirm("Are you sure you want to delete this reply?")) {
      await deleteReply({
        variables: {
          id: replyId,
        },
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              }
            : comment
        )
      );
    }
  };

  let parentComments = comments.filter((com) => !com.sourceCommentId);

  return (
    <CommentSectionContainer>
      {props.blockId ? (
        <CreateCommentStyles>
          <DynamicLoadedEditor
            value={newComment}
            getEditorText={myCallback}
            placeholder={`Add comment`}
          />
          <OrangeButton onClick={addComment}>
            {loading ? "..." : "Add Comment"}
          </OrangeButton>
        </CreateCommentStyles>
      ) : null}
      {parentComments.map((comment) => (
        <SingleComment key={comment.id}>
          <div className="parent_comment">
            <div className="left_column">
              <div className="comment_author_info">
                {comment.user.image ? (
                  <img src={comment.user.image} />
                ) : (
                  <Photo />
                )}
              </div>
              <div className="parent_connection_line"></div>
            </div>
            <div className="right_column">
              <div className="comment_author_info">
                <div className="comment_author_name">
                  {comment.user.name} {comment.user.surname}
                </div>
                <div className="comment_creation_time">
                  {moment(comment.createdAt).format("LLL")}
                </div>
                <div>
                  {comment.status == "PENDING"
                    ? "🟡"
                    : comment.status == "REJECTED"
                    ? "🔴"
                    : "🟢"}
                </div>
              </div>
              <div className="comment_info">
                <div>{parse(comment.text)}</div>
              </div>

              <div className="comment_buttons">
                <ActionButton onClick={() => setReplyTo(comment.id)}>
                  Reply
                </ActionButton>
                {(props.me.id == comment.user.id ||
                  props.me.permissions.includes("ADMIN")) && (
                  <>
                    <ActionButton
                      onClick={() =>
                        handleUpdateCommentStatus(
                          "APPROVED",
                          comment.id,
                          comment.text
                        )
                      }
                    >
                      Approve
                    </ActionButton>
                    <ActionButton
                      onClick={() =>
                        handleUpdateCommentStatus(
                          "REJECTED",
                          comment.id,
                          comment.text
                        )
                      }
                    >
                      Reject
                    </ActionButton>
                    {/* <ActionButton
                      onClick={() =>
                        handleUpdateCommentStatus(
                          "PENDING",
                          comment.id,
                          comment.text
                        )
                      }
                    >
                      Pending
                    </ActionButton> */}
                    <DeleteButton
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </DeleteButton>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Step 6: Display Replies */}
          {comment.replies &&
            comment.replies.map((reply, i) => (
              <ReplyComment key={reply.id}>
                <div className="reply_parent_comment">
                  <ChildLeftColumn last={i + 1 == comment.replies.length}>
                    <div className="child_connection_line"></div>
                  </ChildLeftColumn>
                  <div className="central_column">
                    <div className="comment_author_info">
                      {reply.user.image ? (
                        <img src={reply.user.image} />
                      ) : (
                        <Photo />
                      )}
                    </div>
                  </div>
                  <div className="right_column">
                    <div className="comment_author_info">
                      <div className="comment_author_name">
                        {reply.user.name} {reply.user.surname}
                      </div>
                      <div className="comment_creation_time">
                        {moment(reply.createdAt).format("LLL")}
                      </div>
                    </div>
                    <div className="comment_info">
                      <div>{parse(reply.text)}</div>
                    </div>
                    <div className="comment_buttons">
                      {props.me.id == reply.user.id && (
                        <DeleteButton
                          onClick={() =>
                            handleDeleteReply(comment.id, reply.id)
                          }
                        >
                          Delete
                        </DeleteButton>
                      )}
                    </div>
                  </div>
                </div>
              </ReplyComment>
            ))}

          {/* Conditional Reply Form */}
          {replyTo === comment.id && (
            <CreateCommentStyles>
              <DynamicLoadedEditor
                value={newReply}
                getEditorText={setNewReply}
                placeholder={`Add a reply`}
              />
              <OrangeButton onClick={() => addReply(comment.id)}>
                {replyLoading ? "..." : "Add Reply"}
              </OrangeButton>
            </CreateCommentStyles>
          )}
        </SingleComment>
      ))}
    </CommentSectionContainer>
  );
};

export default CommentSection;
