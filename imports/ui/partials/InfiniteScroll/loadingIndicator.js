import { TemplateController } from 'meteor/space:template-controller';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

import '../Loading.js';

import './loadingIndicator.html';

TemplateController('loadingIndicator', {

  props: new SimpleSchema({
    scrollTargetSelector: {
      type: String,
      defaultValue: 'body'
    },
    showIndicator: {
      type: Boolean
    }
  }),

  private: {
    isShowingIndicator: false,
    scrollDebounce: 200,
    indicatorSelector: '.loading-indicator',
    checkVisibility() {
      let target = this.$(this.indicatorSelector);
      if (!target.length) return;
      let scrollPosition = $(this.props.scrollTargetSelector).scrollTop();
      let isIndicatorVisibleOnPage = (target.offset().top) < $(window).height();
      if (isIndicatorVisibleOnPage) {
        this.triggerEvent('loadingIndicatorBecameVisible', scrollPosition);
      }
    }
  },

  onCreated() {
    this.checkVisibilityDebounced = _.debounce(
      _.bind(this.checkVisibility, this), this.scrollDebounce
    );
  },

  onRendered() {
    $(this.props.scrollTargetSelector).on('scroll', this.checkVisibilityDebounced);//this should run more often
    this.autorun(() => {
      if (this.props.showIndicator && !this.isShowingIndicator) {
        this.checkVisibilityDebounced();
        this.isShowingIndicator = this.props.showIndicator;
      }
    });
  },

  onDestroyed() {
    $(this.props.scrollTargetSelector).off('scroll', this.checkIndicatorVisibility);
  }
});

