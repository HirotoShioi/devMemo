import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { Label } from '../../api/label.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './LabelDetail.html';
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewOptions.js';
import '../partials/Loading.js';
import '../partials/InfiniteScroll/loadingIndicator.js';
import '../layouts/component/PageTitle.js';

const session = new ReactiveDict('LabelDetail');
TemplateController('LabelDetail', {
	state:{
		scrollTarget:'.main-container',
	},

	private:{
		INITIAL_RESULTS_LIMIT:20,
	},

	onCreated(){
		this.session = session;
	    this.session.setDefault('resultsLimit', this.INITIAL_RESULTS_LIMIT);
	    this.session.setDefault('resultsCount', 0);
	    this.session.setDefault('scrollPosition', 0);
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
			self.subscribe('memos');
			let query = {
				labelId:self.data._id
			};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			let counts  =  Memos.find(query).count();
			this.session.set('resultsCount',counts);
		});
	},

	onRendered(){
	    this.session.set('resultsLimit', this.INITIAL_RESULTS_LIMIT);
	    const scrollTarget = $(this.state.scrollTarget);
	    scrollTarget.scrollTop(this.session.get('scrollPosition'));
	    scrollTarget.on('scroll', () => {
	      this.session.set('scrollPosition', scrollTarget.scrollTop());
	    });
	},

	helpers:{
		memos(){
			Session.set('Title',Label.findOne({_id:this.data._id},{fields:{'name':1}}));

			let query = {
				labelId:this.data._id
			};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			let memos = Memos.find(query,{limit:this.session.get('resultsLimit'), sort:{status:1, clickedAt:-1}});
			return memos;
		},

		hasMoreContent(){
			return this.session.get('resultsLimit') < this.session.get('resultsCount');
		}
	},

	events:{
		'loadingIndicatorBecameVisible'(event) {
			var self = this;
			setTimeout(()=>{
				self.session.set('resultsLimit', session.get('resultsLimit') + 20);
			},500);
		},
	}
});