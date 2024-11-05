const users = [];
// const User = require("./../models/userModel");
// const Message = require("../models/messagesModel");
// const Contact = require("./../models/contactModel");
// const Groups = require("./../models/groupModel");
// const groupMsg = require("./../models/groupMessageModel");
// const GroupUsers = require("./../models/groupUserModel");
// const mongoose = require("mongoose");
const dbConnect = require("../connection");

// common query for get single data
function getQueryResult(query) {
  return new Promise((resolve) => {
      dbConnect.query(query, function (err, result) {
        if (err) throw err;
        if (result.length != 0){
          // console.log(JSON.parse(JSON.stringify(result)))
          resolve(Object.assign({},result[0]))
        }
        else{
          resolve(null)
        }
      });
  })
}
// common query for get Multiple single data
function getQueryMultipleResult(query) {
  return new Promise((resolve) => {
      dbConnect.query(query, function (err, result) {
        if (err) throw err;
        if (result.length != 0){
          // console.log(JSON.parse(JSON.stringify(result)))
          resolve(JSON.parse(JSON.stringify(result)))
        }
        else{
          resolve(null)
        }
      });
  })
}
// common query for update data
function updateSqlQuery(updateQuery) {
  return new Promise((resolve) => {
      dbConnect.query(updateQuery, function (err, result) {
        if (err) throw err;
        resolve(result)
      });
  })
}
// common query for delete data
function deleteSqlQuery(deleteQuery) {
  return new Promise((resolve) => {
      dbConnect.query(deleteQuery, function (err, result) {
        if (err) throw err;
        resolve(result)
      });
  })
}


// Email Match
async function UserEmailMatch(email, created_by) {
  // const contact = await User.findOne({ email: email });
  var selectQuery = "Select * from users where email ='"+email+"' "
  const contact = await getQueryResult(selectQuery)
  return contact;
}

/**
 * Contact List
 */
// Contact Match
async function contactEmail(email, created_by) {
  // const contact = await Contact.findOne({ email: email, created_by: created_by });
  var selectQuery = "Select * from contacts where email ='"+email+"' and created_by ="+created_by+" "
  const contact = await getQueryResult(selectQuery)
  return contact;
}

// Get All Contact User wise
async function contactList(userId) {
  // const users = await Contact.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "messages",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$sender_id", "$$userId"] },
  //           },
  //         },
  //         { $sort: { _id: -1 } },
  //         { $limit: 1 },
  //       ],
  //       as: "message",
  //     },
  //   },
  //   { $sort: { name: 1 } },
  //   { $match: { created_by: userId } },
  //   {
  //     $project: {
  //       name: "$name",
  //       email: "$email",
  //       user_id: "$user_id",
  //       created_by: "$created_by",
  //       userImg: "$user.image",
  //       createdAt: "$user.createdAt",
  //       location: "$user.location",
  //       message: "$message.message",
  //       file_upload: "$message.file_upload",
  //       created_at: "$message.createdAt",
  //     },
  //   },
  // ]);
  // var selectQuery = "Select contacts.name,contacts.email,contacts.user_id,contacts.created_by,users.image,users.createdAt,users.location,(SELECT message,file_upload,createdAt from messages WHERE messages.sender_id = contacts.user_id ORDER BY messages.id desc LIMIT 1) from contacts JOIN users ON users.id = contacts.user_id where contacts.created_by ="+userId+" order by contacts.name ASC"

  var selectQuery = "Select DISTINCT contacts.name,contacts.email,contacts.user_id,contacts.created_by,users.image as userImg,users.createdAt,users.location,(SELECT message from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as message,(SELECT file_upload from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as file_upload,(SELECT createdAt from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as created_at from contacts LEFT JOIN users ON users.id = contacts.user_id where contacts.created_by = "+userId+" order by contacts.name ASC"
  const users = await getQueryMultipleResult(selectQuery)
  return users;
}

// Contact List search
async function searchContactData(name, userId) {
  // const users = await Contact.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "messages",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$sender_id", "$$userId"] },
  //           },
  //         },
  //         { $sort: { _id: -1 } },
  //         { $limit: 1 },
  //       ],
  //       as: "message",
  //     },
  //   },
  //   { $sort: { name: 1 } },
  //   { $match: { name: { $regex: name, $options: 'i' }} },
  //   { $match: { created_by: userId } },
  //   {
  //     $project: {
  //       name: "$name",
  //       email: "$email",
  //       user_id: "$user_id",
  //       created_by: "$created_by",
  //       userImg: "$user.image",
  //       createdAt: "$user.createdAt",
  //       location: "$user.location",
  //       message: "$message.message",
  //       file_upload: "$message.file_upload",
  //       created_at: "$message.createdAt",
  //     },
  //   },
  // ]);
  var selectQuery = "Select DISTINCT contacts.name,contacts.email,contacts.user_id,contacts.created_by,users.image as userImg,users.createdAt,users.location,(SELECT message from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as message,(SELECT file_upload from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as file_upload,(SELECT createdAt from messages WHERE sender_id = "+userId+" ORDER BY id DESC LIMIT 1) as created_at from contacts LEFT JOIN users ON users.id = contacts.user_id where contacts.name LIKE '%"+name+"%' and contacts.created_by = "+userId+" order by contacts.name ASC"
  const users = await getQueryMultipleResult(selectQuery)
  return users;
}

// Last Message 
async function lastMsg(userId, receiverId) {
  // const contactList = await Message.findOne({ $or: [{ "sender_id": userId, "receiver_id": receiverId }, { "sender_id": receiverId, "receiver_id": userId }] }).sort({ _id: -1 }).limit(1);
  var selectQuery = "Select * from messages where (sender_id ="+userId+" and receiver_id ="+receiverId+") or (sender_id ="+receiverId+" and receiver_id ="+userId+") order by id desc limit 1"
  const contactList = await getQueryResult(selectQuery)
  return contactList;
}

// Edit Last Message
async function EditlastMsg(userId, receiverId) {
  // const contactList = await Message.findOne({ $or: [{ "sender_id": userId, "receiver_id": receiverId }, { "sender_id": receiverId, "receiver_id": userId }] }).sort({ _id: -1 }).limit(1);
  var selectQuery = "Select * from messages where (sender_id ="+userId+" and receiver_id ="+receiverId+") or (sender_id ="+receiverId+" and receiver_id ="+userId+") order by id desc limit 1"
  const contactList = await getQueryResult(selectQuery)
  return contactList;
}

/**
 * Single Chat
 */
// Single Message Search
async function messageSearchData(searchVal, user_id, receiverId) {
  // const message = await Message.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { senderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$senderId" }] },
  //           },
  //         },
  //       ],
  //       as: "matches",
  //     },
  //   },
  //   {
  //     $match: {
  //       $and: [{ $or: [{ receiver_id: user_id }, { sender_id: user_id }] }],
  //     },
  //   },
  //   {
  //     $match: {
  //       $and: [
  //         { $or: [{ receiver_id: receiverId }, { sender_id: receiverId }] },
  //       ],
  //     },
  //   },
  //   { $match:  {message: { $regex: name, $options: 'i' } } },
  //   { $sort: { _id: -1 } },
  //   { $limit: 10 },
  //   {
  //     $project: {
  //       message: "$message",
  //       sender_id: "$sender_id",
  //       receiver_id: "$receiver_id",
  //       file_upload: "$file_upload",
  //       createdAt: "$createdAt",
  //       user_id: "$matches._id",
  //       name: "$matches.name",
  //       image: "$matches.image",
  //     },
  //   },
  // ]);
  var selectQuery = "Select messages.message, messages.sender_id, messages.receiver_id, messages.file_upload, messages.createdAt, users.id as user_id,users.name, users.image from messages INNER JOIN users ON users.id = messages.sender_id   where (messages.receiver_id ="+user_id+" or messages.sender_id ="+user_id+") and (messages.receiver_id ="+receiverId+" or messages.sender_id ="+receiverId+") and messages.message LIKE '%"+searchVal+"%' order by messages.id desc Limit 10"
  const message = await getQueryMultipleResult(selectQuery)
  return message;
}

// Receiver Data Get
async function receiverData(id) {
  // const receiverData = await User.findById(id);
  var selectQuery = "Select * from users where id ="+id+" "
  const receiverData = await getQueryResult(selectQuery)
  return receiverData;
}

// Unread Message Get
async function sendUnreadMsg(receiver_id) {
  // const message = await Message.find({ receiver_id: receiver_id, unread: "0" });
  var selectQuery = "Select * from messages where receiver_id ="+receiver_id+" and unread ='0' "
  const message = await getQueryResult(selectQuery)
  return message;
}

// Receiver Message Get
async function receiverMessage(id) {
  // return message;
  // const message = await Message.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { senderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$senderId" }] },
  //           },
  //         },
  //       ],
  //       as: "matches",
  //     },
  //   },
  //   {
  //     $match: {
  //       $and: [{ $or: [{ receiver_id: id }, { sender_id: id }] }],
  //     },
  //   },
  //   {
  //     $project: {
  //       message: "$message",
  //       sender_id: "$sender_id",
  //       receiver_id: "$receiver_id",
  //       file_upload: "$file_upload",
  //       createdAt: "$createdAt",
  //       user_id: "$matches._id",
  //       name: "$matches.name",
  //       image: "$matches.image",
  //     },
  //   },
  // ]);
  var selectQuery = "Select messages.message, messages.sender_id, messages.receiver_id, messages.file_upload, messages.createdAt, users.id,users.name, users.image from messages JOIN users ON users.id = messages.sender_id where (messages.receiver_id ="+id+" or messages.sender_id ="+id+")"
  const message = await getQueryResult(selectQuery)
  return message;
}

// Message Update
async function messageUpdate(id, message) {
  // const message_update = await Message.findByIdAndUpdate(id, { message });.
  var updateQuery = "UPDATE messages SET message='" + message + "' where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// User Id Wise contact Get
async function userJoin(userId) {
  // const users = await Contact.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "messages",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$unread", "0"] },
  //           },
  //           $match: {
  //             $expr: { $eq: ["$sender_id", "$$userId"] },
  //           },
  //         },
  //       ],
  //       as: "msg",
  //     },
  //   },
  //   { $sort: { msg: -1 } },
  //   { $match: { created_by: userId } },
  //   {
  //     $project: {
  //       name: "$name",
  //       email: "$email",
  //       user_id: "$user_id",
  //       created_by: "$created_by",
  //       last_msg_date: "$last_msg_date"
  //       unreadMsg: "$msg.unread",
  //       userImg: "$user.image",
  //       createdAt: "$user.createdAt",
  //       location: "$user.location",
  //     }
  //   },
  // ]);
  var selectQuery = "Select DISTINCT contacts.name, contacts.email, contacts.user_id, contacts.created_by, contacts.last_msg_date, messages.unread as unreadMsg, users.createdAt, users.location, users.image as userImg from contacts LEFT JOIN users ON users.id = contacts.user_id LEFT JOIN messages ON messages.sender_id = contacts.user_id   where contacts.created_by ="+userId+" order by messages.id desc"
  const users = await getQueryMultipleResult(selectQuery)
  return users;
}

// contact wise sender and receiver message
async function userMessage(id, user_id, receiverId, startm) {
  // const message = await Message.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { senderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$senderId" }] },
  //           },
  //         },
  //       ],
  //       as: "matches",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "contacts",
  //       let: { nsenderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$user_id", "$$nsenderId"] },
  //           },
  //         },
  //         { $limit: 1 },
  //       ],
  //       as: "nmatches",
  //     },
  //   },
  //   {
  //     $match: {
  //       $and: [{ $or: [{ receiver_id: id }, { sender_id: id }] }],
  //     },
  //   },
  //   { $sort: { _id: -1 } },
  //   { $skip: startm },
  //   { $limit: 10 },
  //   {
  //     $project: {
  //       message: "$message",
  //       sender_id: "$sender_id",
  //       receiver_id: "$receiver_id",
  //       file_upload: "$file_upload",
  //       createdAt: "$createdAt",
  //       updatedAt: "$updatedAt",
  //       user_id: "$matches._id",
  //       name: "$nmatches.name",
  //       image: "$matches.image",
  //     },
  //   },
  // ]);
  var selectQuery = "Select DISTINCT messages.message, messages.sender_id, messages.receiver_id, messages.file_upload, messages.createdAt, messages.updatedAt, users.id as user_id,messages.id as id, users.image, contacts.name from messages LEFT JOIN users ON users.id = messages.sender_id LEFT JOIN contacts ON contacts.user_id = messages.sender_id where (messages.receiver_id ="+id+" or messages.sender_id ="+id+") order by messages.id desc Limit 10"
  const message = await getQueryMultipleResult(selectQuery)
  return message;
}

// Update Unread Message
async function updateUnreadMsg(receiver_Id, unread) {
  // const message_update = await Message.updateMany(
  //   { sender_id: receiver_Id },
  //   { unread }
  // );
  var updateQuery = "UPDATE messages SET unread=" + unread + " where sender_id ="+receiver_Id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Message Update
async function groupData(id) {
  // const group_data = await Groups.findById(id);
  var selectQuery = "Select * from groups where id ="+id+" "
  const group_data = await getQueryResult(selectQuery)
  return group_data;
}

// Single Message Typing Set
async function groupById(groupsId) {
  // const contactList = await GroupUsers.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { id: "$contact_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$id" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   { $match: { group_id: groupsId } },
  //   {
  //     $project: {
  //       unread: "$unread",
  //       is_admin: "$is_admin",
  //       contact_id: "$contact_id",
  //       group_id: "$group_id",
  //       name: "$user.name",
  //       user_id: "$user._id",
  //     },
  //   },
  // ]);
  var selectQuery = "Select group_users.unread, group_users.is_admin, group_users.contact_id, group_users.group_id, users.id as user_id, users.name from group_users LEFT JOIN users ON users.id = group_users.contact_id  where group_users.group_id ="+groupsId+" "
  const contactList = await getQueryMultipleResult(selectQuery)
  return contactList;
}

// Single Message Typing Set
async function groupContactsList(groupsId, userId) {
  // const contactList = await GroupUsers.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { id: "$contact_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$id" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "contacts",
  //       let: { id: "$contact_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $and: [{ $eq: ["$user_id", "$$id"] }, { $eq: ["$created_by", userId] }] },
  //           },
  //         },
  //       ],
  //       as: "contacts",
  //     },
  //   },
  //   { $match: { group_id: groupsId } },
  //   {
  //     $project: {
  //       unread: "$unread",
  //       is_admin: "$is_admin",
  //       contact_id: "$contact_id",
  //       group_id: "$group_id",
  //       name: "$user.name",
  //       user_id: "$user._id",
  //       contactName: "$contacts.name"
  //     },
  //   },
  // ]);
  var selectQuery = "Select DISTINCT group_users.unread, group_users.is_admin, group_users.contact_id, group_users.group_id, users.id as user_id, users.name, contacts.name as contactName from group_users LEFT JOIN users ON users.id = group_users.contact_id LEFT JOIN contacts ON contacts.user_id = group_users.contact_id  where (group_users.group_id ="+groupsId+") "
  const contactList = await getQueryMultipleResult(selectQuery)
  return contactList;
}

// Single Message Delete
async function messageDelete(id) {
  // const message_delete = await Message.findByIdAndDelete(id);
  var deleteQuery = "DELETE from messages WHERE id ="+id+" "
  const message_delete = await deleteSqlQuery(deleteQuery)
  return message_delete;
}

/**
 * Group Message
 */
// Group Search
async function searchGroupData(name, userId) {
  // const contactList = await GroupUsers.aggregate([
  //   {
  //     $lookup: {
  //       from: "groups",
  //       let: { id: "$group_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$id" }] },
  //           },
  //         },
  //       ],
  //       as: "group",
  //     },
  //   },
  //   { $match: { "group.name": { $regex: name, $options: 'i' }} },
  //   { $match: { contact_id: userId } },
  //   {
  //     $project: {
  //       userId: "$user_id",
  //       name: "$group.name",
  //       description: "$group.description",
  //       userId: "$group.userId",
  //       group_id: "$group._id",
  //       unread: "$unread",
  //       contact_id: "$contact_id",
  //     },
  //   },
  // ]);
  var selectQuery = "Select group_users.unread, group_users.contact_id, group_users.group_id, groups.name, groups.description, groups.userId, groups.id from group_users LEFT JOIN groups ON groups.id = group_users.group_id where (groups.name LIKE '%"+name+"%') and (group_users.contact_id ="+userId+") "
  const contactList = await getQueryMultipleResult(selectQuery)
  return contactList;
}

// Single Group Message Search
async function groupSearchData(name, id) {
  // const groupMessage = await groupMsg.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { senderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$senderId" }] },
  //           },
  //         },
  //       ],
  //       as: "matches",
  //     },
  //   },
  //   { $match: { group_id: id } },
  //   { $match: { message: { $regex: name, $options: 'i' }} },
  //   { $sort: { _id: -1 } },
  //   { $limit: 10 },
  //   {
  //     $project: {
  //       message: "$message",
  //       sender_id: "$sender_id",
  //       group_id: "$group_id",
  //       name: "$matches.name",
  //       image: "$matches.image",
  //       file_upload: "$file_upload",
  //       createdAt: "$createdAt",
  //     },
  //   },
  // ]);
  var selectQuery = "Select group_messages.message, group_messages.sender_id, group_messages.group_id, group_messages.file_upload, group_messages.createdAt, users.name, users.image  from group_messages LEFT JOIN users ON users.id = group_messages.sender_id where  (group_messages.group_id ="+id+") and (group_messages.message LIKE '%"+name+"%') order by group_messages.id desc LIMIT 10 "
  const groupMessage = await getQueryMultipleResult(selectQuery)
  return groupMessage;
}

// Unread Group User Get
async function unreadGroupUser(groupsId) {
  // const unread_user = await GroupUsers.find({ group_id: groupsId });
  var selectQuery = "Select * from group_users where group_id ="+groupsId+" "
  const unread_user = await getQueryResult(selectQuery)
  return unread_user;
}

// Update Unread Message
async function updateUnreadGroupUser(groupsId, contactId, unread) {
  // const message_update = await GroupUsers.updateMany(
  //   { group_id: groupsId, contact_id: contactId },
  //   { unread }
  // );
  var updateQuery = "UPDATE group_users SET unread=" + unread + " where contact_id ="+contactId+" and group_id ="+groupsId+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Group Message Get
async function groupsMessage(id, startm = 0) {
  // const groupMessage = await groupMsg.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { senderId: "$sender_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$senderId" }] },
  //           },
  //         },
  //       ],
  //       as: "matches",
  //     },
  //   },
  //   { $match: { group_id: id } },
  //   { $sort: { _id: -1 } },
  //   { $skip: startm },
  //   { $limit: 10 },
  //   {
  //     $project: {
  //       message: "$message",
  //       sender_id: "$sender_id",
  //       group_id: "$group_id",
  //       createdAt: "$createdAt",
  //       name: "$matches.name",
  //       image: "$matches.image",
  //       file_upload: "$file_upload",
  //     },
  //   },
  // ]);
  var selectQuery = "Select group_messages.message,group_messages.id, group_messages.sender_id, group_messages.group_id, group_messages.file_upload, group_messages.createdAt, users.name, users.image from group_messages LEFT JOIN users ON users.id = group_messages.sender_id where (group_messages.group_id ="+id+") order by group_messages.id desc LIMIT 10 "
  const groupMessage = await getQueryMultipleResult(selectQuery)
  return groupMessage;
}

// group message Update
async function groupMessageUpdate(id, message) {
  // const message_update = await groupMsg.findByIdAndUpdate(id, { message });
  var updateQuery = "UPDATE group_messages SET message='" + message + "' where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Contact Detail get By User Id
async function contactListByUser(userId) {
  // const contactList = await GroupUsers.aggregate([
  //   {
  //     $lookup: {
  //       from: "groups",
  //       let: { id: "$group_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$id" }] },
  //           },
  //         },
  //       ],
  //       as: "group",
  //     },
  //   },
  //   { $match: { contact_id: userId } },
  //   {
  //     $project: {
  //       userId: "$user_id",
  //       name: "$group.name",
  //       description: "$group.description",
  //       userId: "$group.userId",
  //       group_id: "$group._id",
  //       unread: "$unread",
  //       contact_id: "$contact_id",
  //     },
  //   },
  // ]);
  var selectQuery = "Select DISTINCT group_users.unread, group_users.contact_id, groups.name, groups.description, groups.userId, groups.id as group_id from group_users INNER JOIN groups ON groups.id = group_users.group_id where group_users.contact_id ="+userId+" "
  const contactList = await getQueryMultipleResult(selectQuery)
  return contactList;
}

// Update All Unread Message Update
async function updateUnreadGroupMessage(groupsId, userId, unread) {
  // const message_update = await GroupUsers.updateMany(
  //   { group_id: groupsId, contact_id: userId },
  //   { unread }
  // );
  var updateQuery = "UPDATE group_users SET unread=" + unread + " where contact_id ="+userId+" and group_id ="+groupsId+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Update All Unread Message Update
async function updateAllUnreadGroupMessage(groupsId, unread) {
  // const message_update = await GroupUsers.updateMany(
  //   { group_id: groupsId},
  //   { unread }
  // );
  var updateQuery = "UPDATE group_users SET unread=" + unread + " where group_id ="+groupsId+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Remove Group Attached file
async function groupFileDelete(id) {
  // const message_delete = await groupMsg.findByIdAndDelete(id);
  var deleteQuery = "DELETE from group_messages WHERE id ="+id+" "
  const message_delete = await deleteSqlQuery(deleteQuery)
  return message_delete;
}

// Delete Group Member
async function groupDeleteMember(id, group_id) {
  // const group_delete = await GroupUsers.deleteOne({ contact_id: id, group_id: group_id });
  var deleteQuery = "DELETE from group_users WHERE contact_id ="+id+" and group_id ="+group_id+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Delete Group All Member
async function groupMemberDelete(id) {
  // const group_delete = await GroupUsers.deleteMany({ group_id: id });
  var deleteQuery = "DELETE from group_users WHERE group_id ="+id+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Delete Group All Message
async function groupMsgDelete(id) {
  // const group_delete = await groupMsg.deleteMany({ group_id: id });
  var deleteQuery = "DELETE from group_messages WHERE group_id ="+id+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Delete Group
async function groupDelete(id) {
  // const group_delete = await Groups.findByIdAndDelete(id);
  var deleteQuery = "DELETE from groups WHERE id ="+id+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Group User Delete
async function deleteGroupUser(id, group_id) {
  // const group_user_delete = await GroupUsers.deleteOne({
  //   contact_id: id,
  //   group_id: group_id,
  // });
  var deleteQuery = "DELETE from group_users WHERE contact_id ="+id+" and group_id ="+group_id+" "
  const group_user_delete = await deleteSqlQuery(deleteQuery)
  return group_user_delete;
}

// All Group Message Delete
async function allGroupMessageDelete(id) {
  // const group_delete = await groupMsg.deleteMany({ group_id: id });
  var deleteQuery = "DELETE from group_messages WHERE group_id ="+id+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Single All Message Delete
async function singleGroupMessageDelete(contactId, groupId) {
  // const group_delete = await groupMsg.deleteMany({
  //   group_id: contactId,
  //   sender_id: groupId,
  // });
  var deleteQuery = "DELETE from group_messages WHERE group_id ="+contactId+" and sender_id ="+groupId+" "
  const group_delete = await deleteSqlQuery(deleteQuery)
  return group_delete;
}

// Single All Message 
async function groupSenderMessage(groupId,contactId) {
  // const group_msg = await groupMsg.find({ group_id: contactId, sender_id: groupId });
  var selectQuery = "Select * from group_messages where group_id ="+groupId+" and sender_id ="+contactId+" "
  const group_msg = await getQueryMultipleResult(selectQuery)
  return group_msg;
}

/**
 * Setting 
 */
// Current User Info
async function currentUser(id) {
  // const userInfo = await User.findById(id);
  var selectQuery = "Select * from users where id ="+id+" "
  const userInfo = await getQueryResult(selectQuery)
  return userInfo;
}

// current user name edit
async function userNameUpdate(id, name) {
  // const message_update = await User.findByIdAndUpdate(id, { name });
  var updateQuery = "UPDATE users SET name='" + name + "' where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// current user name edit
async function receiverNameUpdate(userId, receiverId, name) {
  // const message_update = await Contact.updateOne({ "created_by": userId, "user_id": receiverId }, { name });
  var updateQuery = "UPDATE contacts SET name='" + name + "' where created_by ="+userId+" and user_id ="+receiverId+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Group name Update
async function groupNameUpdate(id, name) {
  // const message_update = await Groups.findByIdAndUpdate(id, { name });
  var updateQuery = "UPDATE groups SET name='" + name + "' where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// notification security 
async function notificationUpdate(id, notification) {
  // const message_update = await User.findByIdAndUpdate(id, { notification });
  var updateQuery = "UPDATE users SET notification=" + notification + " where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// notification muted security 
async function notificationMutedUpdate(id, is_muted) {
  // const message_update = await User.findByIdAndUpdate(id, { is_muted });
  var updateQuery = "UPDATE users SET is_muted=" + is_muted + " where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

// Profile Upload
async function profileUpdate(id, image) {
  // const message_update = await User.findByIdAndUpdate(id, { image });
  var updateQuery = "UPDATE users SET image='" + image + "' where id ="+id+" "
  const message_update = await updateSqlQuery(updateQuery)
  return message_update;
}

async function contactListByUserId(userId, created_by) {
  // const users = await Contact.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   { $match: { user_id: userId } },
  //   { $match: { created_by: created_by } },
  //   {
  //     $project: {
  //       name: "$name",
  //       email: "$email",
  //       user_id: "$user_id",
  //       created_by: "$created_by",
  //       userImg: "$user.image",
  //       createdAt: "$user.createdAt",
  //       location: "$user.location"
  //     },
  //   },
  // ]);
  var selectQuery = "Select contacts.name, contacts.email, contacts.user_id, contacts.created_by, users.image as userImg, users.createdAt, users.location from contacts JOIN users ON users.id = contacts.user_id where (users.id ="+userId+") and (contacts.user_id ="+userId+") and (contacts.created_by ="+created_by+") "
  const users = await getQueryResult(selectQuery)
  return users;
}

async function lastMessageShow(userId) {
  // const messages = await Message.aggregate([
  //   {
  //     "$match": {
  //       "$and": [
  //         {
  //           "$or": [
  //             { receiver_id: userId },
  //             { sender_id: userId }
  //           ]
  //         }
  //       ]
  //     }

  //   },
  //   {
  //     $sort: {
  //       created: -1,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$receiver_id",
  //       message: {
  //         $last: "$message",
  //       },
  //       created: {
  //         $last: "$createdAt",
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       from: "$_id",
  //       message: 1,
  //       created: 1,
  //     },
  //   },
  // ]);
  var selectQuery = "Select message,createdAt as created from messages where (receiver_id ="+userId+" or sender_id ="+userId+") order by createdAt desc Limit 1"
  const messages = await getQueryResult(selectQuery)
  return messages;
}

async function lastMessageShow(userId) {
  // const messages = await Message.aggregate([
  //   {
  //     $match: {
  //       $and: [{ $or: [{ receiver_id: userId }, { sender_id: userId }] }],
  //     },
  //   },
  //   {
  //     $sort: {
  //       created: -1,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$receiver_id",
  //       message: {
  //         $last: "$message",
  //       },
  //       created: {
  //         $last: "$createdAt",
  //       },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       from: "$_id",
  //       message: 1,
  //       created: 1,
  //     },
  //   },
  // ]);
  var selectQuery = "Select message,createdAt as created from messages where (receiver_id ="+userId+" or sender_id ="+userId+") order by createdAt desc Limit 1"
  const messages = await getQueryResult(selectQuery)
  return messages;
}

async function searchData(name, userId) {
  // const users = await Contact.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", { $toObjectId: "$$userId" }] },
  //           },
  //         },
  //       ],
  //       as: "user",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "messages",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$sender_id", "$$userId"] },
  //           },
  //         },
  //         { $sort: { _id: -1 } },
  //         { $limit: 1 },
  //       ],
  //       as: "message",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "messages",
  //       let: { userId: "$user_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$unread", "0"] },
  //           },
  //           $match: {
  //             $expr: { $eq: ["$sender_id", "$$userId"] },
  //           },
  //         },
  //       ],
  //       as: "msg",
  //     },
  //   },
  //   { $sort: { message: -1 } },
  //   { $match: { name: new RegExp(name) } },
  //   { $match: { created_by: userId } },
  //   {
  //     $project: {
  //       name: "$name",
  //       email: "$email",
  //       user_id: "$user_id",
  //       created_by: "$created_by",
  //       userImg: "$user.image",
  //       createdAt: "$user.createdAt",
  //       location: "$user.location",
  //       message: "$message.message",
  //       file_upload: "$message.file_upload",
  //       unreadMsg: "$msg.unread",
  //       created_at: "$message.createdAt",
  //     },
  //   },
  // ]);
  var selectQuery = "Select contacts.name, contacts.email, contacts.user_id, contacts.created_by, users.image as userImg, users.createdAt, users.location, messages.message, messages.file_upload, messages.unread as unreadMsg, messages.createdAt as created_at from contacts JOIN users ON users.id = contacts.user_id JOIN messages ON messages.sender_id = contacts.user_id where (users.id ="+userId+") and (messages.sender_id ="+userId+") and (contacts.created_by ="+userId+") and contacts.name LIKE '%"+name+"%' order by messages.id desc "
  const users = await getQueryResult(selectQuery)
  return users;
}

// Delete Contact
async function contactDelete(receiverId, userId) {
  // const contact_delete = await Contact.deleteMany({ "user_id": { $in: [receiverId, userId] }, "created_by": { $in: [userId, receiverId] } });
  var deleteQuery = "DELETE from contacts WHERE user_id IN (" + receiverId + "," + userId + ") and created_by IN (" + userId + "," + receiverId + ")"
  const contact_delete = await deleteSqlQuery(deleteQuery)
  return contact_delete;
}

// All Message Delete
async function allMessageDelete(id, uid) {
  // const message_delete = await Message.deleteMany({ $or: [{ $and: [{ receiver_id: id }, { sender_id: uid }] }, { $and: [{ sender_id: id }, { receiver_id: uid }] }] });
  var deleteQuery = "DELETE from messages WHERE (receiver_id ="+id+" and sender_id ="+uid+") or (sender_id ="+id+" and receiver_id ="+uid+") "
  const message_delete = await deleteSqlQuery(deleteQuery)
  return message_delete;
}

// All Sender Message Delete
async function allSenderMessageDelete(id) {
  // const message_delete = await Message.deleteMany({ sender_id: id });
  var deleteQuery = "DELETE from messages WHERE sender_id ="+id+" "
  const message_delete = await deleteSqlQuery(deleteQuery)
  return message_delete;
}

/**
 * Group List
 */
async function groupContactById(contactId) {
  // const groupdetail = await User.find({ _id: contactId });
  var selectQuery = "Select * from users where id ="+contactId+" "
  const groupdetail = await getQueryResult(selectQuery)
  return groupdetail;
}

async function unreadGroupMessage(groupsId) {
  // const group_message = await groupMsg.find({ group_id: groupsId, unread: 0 });
  var selectQuery = "Select * from group_messages where group_id ="+groupsId+" and unread ='0' "
  const group_message = await getQueryResult(selectQuery)
  return group_message;
}

/**
 * Remove Single Message
 */
async function groupMessageDelete(id) {
  // const message_delete = await groupMsg.findByIdAndDelete(id);
  var deleteQuery = "DELETE from group_messages WHERE id ="+id+" "
  const message_delete = await deleteSqlQuery(deleteQuery)
  return message_delete;
}

async function groupByGroupUser(groupsIds, contacts) {
  // const groups1 = await GroupUsers.aggregate([
  //   { $match: { $expr: { $in: ["$group_id", contacts[0].groupId] } } },
  //   { $match: { $expr: { $in: ["$contact_id", contacts[0].contactId] } } },
  //   {
  //     $project: {
  //       userId: contacts[0].userId,
  //       contactId: "$contact_id",
  //       groupId: "$group_id",
  //     },
  //   },
  // ]);
  var selectQuery = "Select * from group_users where group_id ="+contacts[0].groupId+" and contact_id ="+contacts[0].contactId+" "
  const groups1 = await getQueryResult(selectQuery)
  return groups1;
}

async function groupsList(contactId, unread) {
  const group_user = await Groups.aggregate([
    { $match: { $expr: { $eq: ["$_id", { $toObjectId: contactId }] } } },
    {
      $project: {
        name: "$name",
        description: "$description",
      },
    },
  ]);
  return group_user;
}

// Current User Group
async function currentUsergroupList(userId) {
  // const group_user = await Groups.find({ userId: userId });
  var selectQuery = "Select * from groups where userId ="+userId+" "
  const group_user = await getQueryResult(selectQuery)
  return group_user;
}

/**
 * Update Notification
 */
// User leaves chat
async function userLeave({ id=16 }) {
  // const user = await User.updateOne({ _id: id }, { $set: { "active": 'false' } })
  var updateQuery = "UPDATE users SET active='false' where id ="+id+" "
  const user = await updateSqlQuery(updateQuery)
  return user;
}

module.exports = {
  UserEmailMatch,
  contactEmail,
  contactListByUserId,
  contactList,
  searchContactData,
  lastMsg,
  EditlastMsg,
  contactDelete,
  allMessageDelete,
  allSenderMessageDelete,
  messageSearchData,
  receiverData,
  sendUnreadMsg,
  receiverMessage,
  messageUpdate,
  userJoin,
  userMessage,
  updateUnreadMsg,
  groupData,
  groupById,
  groupContactsList,
  messageDelete,
  searchGroupData,
  groupSearchData,
  unreadGroupUser,
  updateUnreadGroupUser,
  groupsMessage,
  groupMessageUpdate,
  contactListByUser,
  updateUnreadGroupMessage,
  updateAllUnreadGroupMessage,
  groupFileDelete,
  groupDeleteMember,
  groupDelete,
  groupMemberDelete,
  groupMsgDelete,
  deleteGroupUser,
  allGroupMessageDelete,
  singleGroupMessageDelete,
  groupSenderMessage,
  currentUser,
  userNameUpdate,
  receiverNameUpdate,
  groupNameUpdate,
  notificationUpdate,
  notificationMutedUpdate,
  profileUpdate,
  userLeave
};
