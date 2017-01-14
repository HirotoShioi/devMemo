import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';

import './SingleList.html';

TemplateController('SingleList', {
  state: {
    shouldExpireProgressbarShow: false,
    progressBarColor: 'over-75',
    progressRate: 0,
  },

  helpers: {
    shouldExpireProgressbarShow() {
      if (this.data.memo.favoritedAt === true) {
        this.state.shouldExpireProgressbarShow = false;
      }
      return this.state.shouldExpireProgressbarShow;
    },
    isOwner() {
      return (Meteor.userId() === this.data.memo.owner);
    },
    faviconUrl() {
      return `http://www.google.com/s2/favicons?domain=${this.data.memo.url}`;
    },
    progressBarColor() {
      const expireDate = moment(this.data.memo.expiredAt);
      const today = moment().format();
      const progress = expireDate.diff(today, 'hours');
      const expireLimit = this.data.memo.expireIn * 24;
      let progressRate = 0;
      progressRate = Math.floor((progress / expireLimit) * 100);

      if (progressRate > 100) {
        progressRate = 100;
      }
      if (progressRate <= 0) {
        progressRate = 0;
      }

      if (progressRate >= 75) {
        this.state.progressBarColor = 'over-75';
      } else if (progressRate >= 50) {
        this.state.progressBarColor = 'over-50';
      } else if (progressRate >= 25) {
        this.state.progressBarColor = 'over-25';
      } else {
        this.state.progressBarColor = 'over-0';
      }
      this.state.progressRate = progressRate;
      return this.state.progressBarColor;
    },
  },

  events: {
    'click .title'() {
      Meteor.call('memoUrlClicked', this.data.memo);
      window.open(this.data.memo.url);
      return false;
    },
    'click .collection-url'() {
      Meteor.call('memoUrlClicked', this.data.memo);
      window.open(this.data.memo.url);
      return false;
    },
    'mouseover .list-item'() {
      this.state.shouldOptionButtonShow = true;
      const memo = this.data.memo;
      if (memo.status === "expired" || memo.favoritedAt === true) {
        return;
      }
      this.state.shouldExpireProgressbarShow = true;
    },
    'mouseout .list-item'() {
      this.state.shouldOptionButtonShow = false;
      this.state.shouldExpireProgressbarShow = false;
    },
  }
});
