import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../partials/Loading.js';
import './Memos.html';
import '../partials/InfiniteScroll/loadingIndicator.js';
//partials
import '../partials/Memo.js';
import '../partials/List/SingleList.js';
import '../partials/ViewOptions.js';
import '../layouts/component/PageTitle.js';
const session = new ReactiveDict('Memos');

TemplateController('Memos',{
	state:{
		scrollTarget:'.main-container',
		memoCount:0,
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
			self.subscribe('memos');
			let query = {};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			let counts  =  Memos.find(query).count();
			this.session.set('resultsCount',counts);
		});
		Session.set("Title",{name:"Home"});
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
			let query = {};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			return Memos.find(query,{limit:this.session.get('resultsLimit'), sort:{status:1,clickedAt:-1}});
		},
		hasMoreContent(){
			return this.session.get('resultsLimit') < this.session.get('resultsCount');
		},
	},

	events:{
		'loadingIndicatorBecameVisible'(event) {
			var self = this;
			setTimeout(()=>{
				self.session.set('resultsLimit', session.get('resultsLimit')+ 20);
			},500);
    	},
	}
});