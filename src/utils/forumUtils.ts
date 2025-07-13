import { ForumTopic, ForumReply, User } from '@/types/forum';

export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem('currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const getForumTopics = (): ForumTopic[] => {
  const savedTopics = localStorage.getItem('forumTopics');
  return savedTopics ? JSON.parse(savedTopics) : [];
};

export const getForumReplies = (): ForumReply[] => {
  const savedReplies = localStorage.getItem('forumReplies');
  return savedReplies ? JSON.parse(savedReplies) : [];
};

export const saveForumTopics = (topics: ForumTopic[]): void => {
  localStorage.setItem('forumTopics', JSON.stringify(topics));
};

export const saveForumReplies = (replies: ForumReply[]): void => {
  localStorage.setItem('forumReplies', JSON.stringify(replies));
};

export const addReply = (topicId: string, content: string, user: User): ForumReply => {
  const newReply: ForumReply = {
    id: Date.now().toString(),
    topicId,
    content,
    author: user.nickname,
    authorEmail: user.email,
    createdAt: new Date().toISOString(),
    likes: 0
  };

  const existingReplies = getForumReplies();
  existingReplies.unshift(newReply);
  saveForumReplies(existingReplies);

  // Обновляем счетчик ответов в темах
  const existingTopics = getForumTopics();
  const topicIndex = existingTopics.findIndex(topic => topic.id === topicId);
  if (topicIndex >= 0) {
    existingTopics[topicIndex].replies = (existingTopics[topicIndex].replies || 0) + 1;
    existingTopics[topicIndex].lastReply = {
      author: user.nickname,
      time: "только что"
    };
    saveForumTopics(existingTopics);
  }

  return newReply;
};

export const toggleLike = (replyId: string, userEmail: string): boolean => {
  const likeKey = `like_${replyId}_${userEmail}`;
  const hasLiked = localStorage.getItem(likeKey);
  
  if (hasLiked) {
    return false; // Уже лайкнул
  }
  
  const replies = getForumReplies();
  const updatedReplies = replies.map(reply => 
    reply.id === replyId 
      ? { ...reply, likes: (reply.likes || 0) + 1 }
      : reply
  );
  
  saveForumReplies(updatedReplies);
  localStorage.setItem(likeKey, 'true');
  return true;
};

export const clearForumData = (): void => {
  localStorage.removeItem('forumTopics');
  localStorage.removeItem('forumReplies');
};

export const getRepliesForTopic = (topicId: string): ForumReply[] => {
  const allReplies = getForumReplies();
  return allReplies.filter(reply => reply.topicId === topicId);
};