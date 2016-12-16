import './Featured.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import '../partials/Loading.js';
import '../layouts/component/PageTitle.js';
import '../partials/Memo.js';
const session = new ReactiveDict('Featured');

TemplateController('Featured',{
	state:{
		recommendCount:0,
	},
	onCreated(){
		this.session = session;
		this.session.setDefault('resultsLimit', 8);
		Session.set('Title',{name:"Featured"});
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
		});
		Meteor.call('getRecommend',(err,result)=>{
			if(err){
				console.log(err.reason);
			}
			if(!err){
				self.state.recommendLabels = result;
				self.state.recommendCount = Memos.find({labelId:result._id}).count();
			}
		});
	},

	helpers:{
		favoriteMemos(){
			let query = {
				isFavorited:true,
			};
			return Memos.find(query,{limit:this.session.get('resultsLimit'), sort:{createdAt:-1}});
		},
		recentMemos(){
			let query = {
				status:"active",
				isFavorited:false,
			};
			return Memos.find(query,{limit:this.session.get('resultsLimit'), sort:{clickedAt:-1}});
		},
		recommendLabel(){
			if(this.state.recommendCount <= 0){
				return;
			}
			let label = Label.findOne({_id:this.state.recommendLabels._id});
			return label;
		},
		recommendMemos(){
			if(this.state.recommendCount <= 0){
				return;
			}
			let query = {
				status:"expired",
				labelId:this.state.recommendLabels._id
			};
			return Memos.find(query,{limit:4, sort:{clicked:-1}});
		},
	}
});