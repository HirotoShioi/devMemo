import './Memo.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../api/label.js';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

TemplateController('Memo', {
  state: {
    isHovered: false,
    shouldHeartHightlight: false,
    shouldExpireProgressbarShow: true,
    progressBarColor: 'over-75',
    progressRate: 0,
    isMemoExpired: false,
    shouldToolTipShow: true,
  },

  helpers: {
    shouldExpireProgressbarShow() {
      if (this.data.favoritedAt || this.data.status === "expired") {
        this.state.shouldExpireProgressbarShow = false;
      } else {
        this.state.shouldExpireProgressbarShow = true;
      }
      return this.state.shouldExpireProgressbarShow;
    },
    isOwner() {
      return (Meteor.userId() === this.data.owner);
    },
    hasLabel() {
      return (this.data.labelId) ? true : false;
    },
    faviconUrl() {
      return `http://www.google.com/s2/favicons?domain=${this.data.url}`;
    },
    shouldFavoriteHightlight() {
      return ( this.state.shouldHeartHightlight || this.data.favoritedAt );
    },
    shouldArchiveShow() {
      if (this.data.status === "active" && !this.data.favoritedAt && this.data.owner === Meteor.userId()) {
        return true;
      } else {
        return false;
      }
    },
    expireStatus() {
      const expireDate = moment(this.data.expiredAt);
      const today = moment().format();
      const progress = expireDate.diff(today, 'hours');
      const expireLimit = this.data.expireIn * 24;
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
      Session.set('editMemoLabelId', this.data._id);
      Session.set('formType', 'EditMemoLabel');
    },
    'click .fa-close'() {
      Meteor.call('deleteMemo', this.data._id);
    },
    'mouseover .card'() {
      this.state.isHovered = true;
    },
    'mouseout .card'() {
      this.state.isHovered = false;
    },
    'mouseover .heart'() {
      this.state.shouldHeartHightlight = true;
    },
    'mouseout .heart'() {
      this.state.shouldHeartHightlight = false;
    },
    'click .heart'() {
      this.state.shouldExpireProgressbarShow = !this.state.shouldExpireProgressbarShow;
      this.state.isMemoExpired = false;
      Meteor.call('toggleFavorite', this.data._id);
    },
    'click .card-image-url'() {
      Session.set('showModal', true);
      Session.set('MemoDetailId', this.data._id);
      Session.set('showMemoDetail', true);
      return false;
    },
    'click .archive-memo'() {
      if (this.data.status === "active") {
        this.state.isMemoExpired = true;
        Meteor.call('archiveMemo', this.data);
      } else {
        this.state.isMemoExpired = false;
        Meteor.call('memoUrlClicked', this.data);
      }
    },
    'click .card-link'() {
      Meteor.call('memoUrlClicked', this.data);
      window.open(this.data.url, '_blank');
      return false;
    },
  },
});
