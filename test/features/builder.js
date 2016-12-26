export const createLabel = function(labelObj) {
  let label = server.execute((obj)=>{
    obj.owner = Meteor.userId();
    const { Label } = require('/imports/api/label.js');
    Label.insert(obj);
    return Label.findOne(obj);
  }, labelObj);
  return label;
};

export const getLabel = function(labelObj) {
  let label = server.execute( (obj) => {
    obj.owner = Meteor.userId();
    const { Label } = require('/imports/api/label.js');
    return Label.findOne(obj);
  }, labelObj );
  return label;
};

export const getMemo = function(query) {
  let memo = server.execute( (obj) => {
    obj.owner = Meteor.userId();
    const { Memos } = require('/imports/api/memos.js');
    return Memos.findOne(obj);
  }, query);
  return memo;
};

export const createMemo = function(memoObj) {
  let memo = server.execute( (obj) => {
    obj.owner = Meteor.userId();
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
