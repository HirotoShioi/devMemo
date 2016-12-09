import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../api/memos.js';
import { moment } from 'meteor/momentjs:moment';
import '../partials/Loading.js';
import './Memos.html';
//partials
import '../partials/Memo.js';
import '../partials/List/List.js';
import '../partials/ViewBtn.js';

TemplateController('Memos',{

	state:{
		loading:true,
	},

	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('memos', ()=>{
				setTimeout(()=>{
					this.state.loading = false;
				},300);
			});
		});
		Session.set("Title",{name:"Home"});
	},

	helpers:{
		loading(){
			return this.state.loading;
		},
		memos(){
			let search = Session.get('searchQuery');
			let query = {};
			if(Session.get('hideExpired')){
				query.status = "active";
			}
			return Memos.find(query,{sort:{status:1,clickedAt:-1}});
		},
	},
});