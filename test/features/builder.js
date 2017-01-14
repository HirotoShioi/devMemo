export const createLabel = function(labelObj) {
  let label = server.execute((obj)=>{
    if (!obj.owner) obj.owner = Meteor.userId();
    const { Label } = require('/imports/api/label.js');
    Label.insert(obj);
    return Label.findOne(obj);
  }, labelObj);
  return label;
};

export const getLabel = function(labelObj) {
  let label = server.execute( (obj) => {
    if (!obj.owner) obj.owner = Meteor.userId();
    const { Label } = require('/imports/api/label.js');
    return Label.findOne(obj);
  }, labelObj );
  return label;
};

export const getMemo = function(query) {
  let memo = server.execute( (obj) => {
    if (!obj.owner) obj.owner = Meteor.userId();
    const { Memos } = require('/imports/api/memos.js');
    return Memos.findOne(obj);
  }, query);
  return memo;
};

export const createMemo = function(memoObj) {
  let memo = server.execute( (obj) => {
    if (!obj.owner) obj.owner = Meteor.userId();
    const { Memos } = require('/imports/api/memos.js');
    Memos.insert(obj);
    return Memos.findOne(obj);
  }, memoObj );
  return memo;
};

export const updateMemo = function(memoId, modifier) {
  let memo = server.execute( (id, mod) => {
    const { Memos } = require('/imports/api/memos.js');
    Memos.update({_id: id}, {$set: mod});
    return Memos.findOne({_id: id});
  }, memoId, modifier);
  return memo;
};

export const createLabelShare = function(shareRequestObj) {
  let share = server.execute( (obj) => {
    if (!obj.sharedFrom) obj.sharedFrom = Meteor.userId();
    const { labelShare } = require('/imports/api/labelShare.js');
    labelShare.insert(obj);
    return labelShare.findOne(obj);
  }, shareRequestObj );
  return share;
};

export const getLabelShare = function(shareObj) {
  let label = server.execute( (obj) => {
    if (!obj.sharedTo) obj.sharedTo = Meteor.userId();
    const { labelShare } = require('/imports/api/labelShare.js');
    return labelShare.findOne(obj);
  }, shareObj );
  return label;
};

export const createUserFavorites = function(favoriteObj) {
  let userFavorite = server.execute( (obj) => {
    const { userFavorites } = require('/imports/api/userFavorites.js');
    userFavorites.insert(obj);
    return userFavorites.findOne(obj);
  }, favoriteObj );
  return userFavorite;
};

export const getUserFavorites = function(shareObj) {
  let userFavorite = server.execute( (obj) => {
    if (!obj.userId) obj.userId = Meteor.userId();
    const { userFavorites } = require('/imports/api/userFavorites.js');
    return userFavorites.findOne(obj);
  }, shareObj );
  return userFavorite;
};
