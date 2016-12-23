import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import { Label } from './label.js';
import { moment } from 'meteor/momentjs:moment';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { memoClicked } from './memoClicked.js';
import { i18n } from 'meteor/anti:i18n';
export const Memos = new Mongo.Collection('memos');

let Schemas = {};

Memos.allow({
  update: function(userId) {
    return !!userId;
  },
  insert: function(userId) {
    return !!userId;
  }
});
// schemas
Schemas.memos = new SimpleSchema({
  name: {
    type: String,
    label: function() { return i18n('collection.memos.name');},
    optional: true,
  },
  url: {
    type: String,
    label: "URL",
    regEx: SimpleSchema.RegEx.Url
  },
  thumbnailUrl: {
    type: String,
    optional: true,
  },
  desc: {
    type: String,
    label: function() { return i18n('collection.memos.description');},
    optional: true,
  },
  provider_url: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
  },
  provider_name: {
    type: String,
    optional: true,
  },
  isFavorited: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  tags: {
    type: String,
    label: "Tag",
    optional: true
  },
  clicked: {
    type: Number,
    defaultValue: 0,
  },
  labelId: {
    type: String,
    label: function() { return i18n('collection.memos.label');},
    optional: true,
    autoform: {
      type: "select-radio",
      options: function() {
        return Label.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).map(function(c) {
          return {label: c.name, value: c._id};
        });
      }
    }
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  expiredAt: {
    type: Date,
    optional: true,
  },
  clickedAt: {
    type: Date,
    optional: true,
  },
  expireIn: {
    type: Number,
    optional: true,
  },
  owner: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    optional: true,
  },
  status: {
    type: String,
    defaultValue: "active",
    optional: true,
  },
});
Memos.attachSchema(Schemas.memos);

const updateMemoExpiration = function(id) {
  const expireIn = Meteor.user().profile.memoExpireIn;
  Memos.update({_id: id}, {
    $set: {
      expiredAt: moment().add(expireIn, 'days').format(),
      expireIn: expireIn,
      status: "active",
      clickedAt: Date.now(),
    }
  });

};

const logMemoClicked = (userId, memoId, labelId) =>{
  let label = {};
  if (labelId) {
    label = Label.findOne({_id: labelId});
  } else {
    label.name = "none";
  }

  memoClicked.insert({
    userId: userId,
    clickedAt: moment().toDate(),
    labelId: labelId,
    labelName: label.name,
    memoId: memoId,
  });
};

// Methods
Meteor.methods({
  deleteMemo(id) {
    check(id, String);

    const memo = Memos.findOne(id);

    if (this.userId !== memo.owner) {
      throw new Meteor.Error('not authorized');
    }

    Memos.remove(id);
  },
  updateFavorite(doc) {
    check(doc, Object);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }
    let isFavorited = doc.isFavorited;
    if (isFavorited === undefined) {
      isFavorited = false;
    }

    Memos.update({_id: doc._id}, {$set: {isFavorited: !doc.isFavorited}});
  },
  memoUrlClicked(doc) {
    check(doc, Object);

    if (this.userId !== doc.owner) {
      throw new Meteor.Error("not authorized");
    }

    if (!doc.clicked) {
      Memos.update({_id: doc._id}, {$set: {clicked: 1}});
    } else {
      Memos.update({_id: doc._id}, {$inc: {clicked: 1}});
    }

    logMemoClicked(this.userId, doc._id, doc.labelId);
    updateMemoExpiration(doc._id);
  },
  addMemo(doc) {
    check(doc, Object);
    if (!Meteor.userId()) {
      throw new Meteor.Error('not authorized');
    }
    const self = this;
    self.result = {};
    if (Meteor.isServer) {
      const expireIn = Meteor.user().profile.memoExpireIn;
      const result = HTTP.call('GET', "https://api.embedly.com/1/oembed", {
        params: {
          key: Meteor.settings.embedApiKey,
          url: doc.url
        }
      });
      const data = result.data;
      self.result = {
        statusCode: data.statusCode,
        provider_url: data.provider_url
      };
      Memos.insert({
        name: data.title,
        url: doc.url,
        thumbnailUrl: data.thumbnail_url,
        provider_url: data.provider_url,
        provider_name: data.provider_name,
        desc: data.description,
        labelId: doc.labelId,
        createdAt: moment().format(),
        clickedAt: moment().format(),
        expiredAt: moment().add(expireIn, 'days').format(),
        expireIn: expireIn,
        owner: Meteor.userId(),
        username: Meteor.user().username,
      }, (err, memoId)=>{
        logMemoClicked(this.userId, memoId, doc.labelId);
      });

      return self.result;

    }

    // update user's recently used label
    Meteor.users.update({_id: this.userId}, {$set: {'profile.recentChosenLabel': doc.labelId}});
  },
  getRecommend() {
    const self = this;
    self.result = {};
    if (Meteor.isServer) {
      const result = memoClicked.aggregate([
        {
          $match: {
            userId: this.userId,
          }
        },
        {
          $sort: {createdAt: -1},
        },
        {
          $limit: 30,
        },
        {
          $group: {
            _id: '$labelId',
            result: {$sum: 1}
          }
        },
        {
          $sort: {
            result: -1,
          }
        },
        {
          $limit: 5
        }
      ]);
      self.result = result[Math.floor(Math.random() * result.length)];
    }
    return self.result;
  },
  checkExpiration() {
    const today = moment().toDate();
    const findExpiredMemoQuery = {expiredAt: {"$lt": today}, status: "active" };
    const expireCount = Memos.find(findExpiredMemoQuery).count();
    console.log(`${expireCount} were expired`);
    Memos.update(findExpiredMemoQuery, {$set: {status: "expired"}}, {multi: true});
  },
  archiveMemo(doc) {
    check(doc, Object);

    if (this.userId !== doc.owner) {
      throw new Meteor.Error("not authorized");
    }
    const today = moment().toDate();
    Memos.update({_id: doc._id}, {$set: {expiredAt: today, status: "expired", isFavorited: false}});
  }
});

Memos.helpers({
  label() {
    return Label.findOne(this.labelId);
  }
});

