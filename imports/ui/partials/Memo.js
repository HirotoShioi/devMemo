import './Memo.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { rwindow } from 'meteor/gadicohen:reactive-window';
TemplateController('Memo', {
  state: {
    isHovered: false,
    shouldHeartHightlight: false,
    shouldExpireProgressbarShow: true,
    shouldDeleteMemoShow: false,
    progressBarColor: 'over-75',
    progressRate: 0,
    isMemoExpired: false,
    shouldToolTipShow: true,
    shoulBeHoverable: false,
  },

  onRendered() {
    this.state.shoulBeHoverable = (rwindow.$width() < 992) ? false : true;
  },

  helpers: {
    altImage() {
      if (this.data.memo) {
        return this.data.memo.name.substring(0, 1);
      } else {
        return false;
      }
    },
    memo() {
      return this.data.memo;
    },
    shouldExpireProgressbarShow() {
      if (this.data.favoritedAt || this.data.memo.status === "expired") {
        this.state.shouldExpireProgressbarShow = false;
      } else {
        this.state.shouldExpireProgressbarShow = true;
      }
      return this.state.shouldExpireProgressbarShow;
    },
    isOwner() {
      return (Meteor.userId() === this.data.memo.owner);
    },
    hasLabel() {
      return (this.data.memo.labelId) ? true : false;
    },
    faviconUrl() {
      return `https://www.google.com/s2/favicons?domain=${this.data.memo.url}`;
    },
    shouldArchiveShow() {
      if (this.data.memo.status === "active" && !this.data.favoritedAt && this.data.memo.owner === Meteor.userId()) {
        return true;
      } else {
        return false;
      }
    },
    expireStatus() {
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
      return this.state.progressRate;
    }
  },

  events: {
    'click .fa-cog'() {
      Session.set('showModal', true);
      Session.set('editMemoLabelId', this.data.memo._id);
      Session.set('formType', 'EditMemoLabel');
    },
    'click .fa-close'() {
      Meteor.call('deleteMemo', this.data.memo._id);
    },
    'mouseover .card'() {
      this.state.isHovered = true;
      if (this.data.memo.owner === Meteor.userId()) {
        this.state.shouldDeleteMemoShow = true;
      }
    },
    'mouseout .card'() {
      this.state.isHovered = false;
      this.state.shouldDeleteMemoShow = false;
    },
    'click .heart'() {
      this.state.shouldExpireProgressbarShow = !this.state.shouldExpireProgressbarShow;
      this.state.isMemoExpired = false;
      Meteor.call('toggleFavorite', this.data.memo._id);
    },
    'click .card-image-url'() {
      if (rwindow.$width() < 992) {
        Router.go('memo.detail', {_id: this.data.memo._id});
      } else {
        Session.set('showModal', true);
        Session.set('MemoDetailId', this.data.memo._id);
        Session.set('showMemoDetail', true);
      }
      return false;
    },
    'click .archive-memo'() {
      if (this.data.memo.status === "active") {
        this.state.isMemoExpired = true;
        Meteor.call('archiveMemo', this.data.memo);
      } else {
        this.state.isMemoExpired = false;
        if (Meteor.userId() === this.data.memo.owner) {
          Meteor.call('memoUrlClicked', this.data.memo);
        }
      }
    },
    'click .card-link'() {
      if (Meteor.userId() === this.data.memo.owner) {
        Meteor.call('memoUrlClicked', this.data.memo);
      }
      window.open(this.data.memo.url, '_blank');
      return false;
    },
  },
});
