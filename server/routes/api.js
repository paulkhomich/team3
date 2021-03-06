'use strict';

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const dbController = require('../controllers/dbController');

module.exports = server => {
    server.route('/api/chats')
        .get(dbController.getChats)
        .post(dbController.createChat);

    server.patch(
        '/api/chats/:id/avatar',
        upload.single('chatAvatar'),
        dbController.updateChatAvatar
    );

    server.patch('/api/chats/:id/title', dbController.updateChatTitle);

    server.route('/api/chats/:id/messages')
        .get(dbController.getMessages)
        .post(dbController.createMessage);
    server.patch('/api/chats/:chatId/messages/:messageId/reactions', dbController.addReaction);
    server.put('/api/attachments', upload.single('image'), dbController.uploadAttachment);
    server.route('/api/chats/:id/members/:nickname')
        .delete(dbController.deleteUserFromChat)
        .post(dbController.addUserToChat);

    server.route('/api/users/:nickname')
        .get(dbController.getUser)
        .post(dbController.createUser);

    server.get('/api/search/users/:nickname', dbController.getUsers);

    server.patch(
        '/api/users/:nickname/avatar',
        upload.single('userAvatar'),
        dbController.updateUserAvatar
    );
};
