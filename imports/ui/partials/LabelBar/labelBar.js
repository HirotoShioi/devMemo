import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';

import './labelBar.html';
import './labelBarItem.js';

TemplateController('labelBar',{
	state:{
		labelResultCount:0,
		labelSearchLimit:20,
		labelTitle:"Recently Used",
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},
	helpers:{
		labelTitle(){
			return this.state.labelTitle;
		},
		searchedLabels(){
			const label = Label.find();
			return Label.find({},{limit:this.state.labelSearchLimit, sort:{createdAt:-1}});
		},
		shouldSearchBarShow(){
			return Session.get('labelBarShow');
		},
		labelResultCount(){
			this.state.labelResultCount = Label.find().count();
			return this.state.labelResultCount;
		},
		noResult(){
			if(this.state.labelResultCount == 0){
				return true;
			}
		},
	},
	events:{
		'keyup [name="labelSearch"]'(event){
			let value = event.target.value.trim();
			Session.set('searchQuery', value);
		},
		'click .toggle-label-show'(){
			if(this.state.labelSearchLimit < 20){
				this.state.labelSearchLimit += 3;
			}
			return false;
		},
	}
});