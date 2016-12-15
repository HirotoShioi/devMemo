import './Featured.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../partials/Loading.js';
import '../layouts/component/PageTitle.js';
import '../partials/Memo.js';
const session = new ReactiveDict('Featured');

TemplateController('Featured',{
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
		recommendMemos(){
			let query ={
				isFavorited:false,
				status:"expired"
			};
			let memos = Memos.find(query,{sort:{clicked:-1}}).fetch();
			console.log(memos);
			return memos.slice(0, 8);
		},
	}
});