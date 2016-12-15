import './Featured.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../partials/Loading.js';
import '../layouts/component/PageTitle.js';
import '../partials/Memo.js';
const session = new ReactiveDict('Featured');

TemplateController('Featured',{
	state:{
		recommendLabels:''
	},
	onCreated(){
		this.session = session;
		this.session.setDefault('resultsLimit', 8);
		Session.set('Title',{name:"Featured"});
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos');
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
			let label = Label.findOne({_id:this.state.recommendLabels._id});
			return label;
		},
		recommendMemos(){
			const self = this;
			Meteor.call('getRecommend',(err,result)=>{
				if(err){
					console.log(err.reason);
				}
				if(!err){
					self.state.recommendLabels = result;
				}
			});
			let query = {
				labelId:self.state.recommendLabels._id
			};
			return Memos.find(query,{limit:4, sort:{clicked:-1}});
		},
	}
});