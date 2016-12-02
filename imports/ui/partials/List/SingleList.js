import './SingleList.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js'
import { moment } from 'meteor/momentjs:moment';

TemplateController('SingleList',{
	state:{
		progressBarColor:'over-75',
		progressRate:0,
	},

	onCreated(){
		this.autorun(()=>{
			this.subscribe('label');
		});
	},

	helpers:{
		isOwner(){
			return (Meteor.userId() === this.data.memo.owner);
		},
		faviconUrl(){
			return `http://www.google.com/s2/favicons?domain=${this.data.memo.url}`;
		},
		shouldNotify(){
			if(this.data.shouldNotify){
				return !this.data.memo.notifiedToUser;
			}
		},
		progressBarColor(){
			const expireDate = moment(this.data.memo.expiredAt);
			const today = moment().format();
			const progress = expireDate.diff(today, 'hours');
			const expireLimit = this.data.memo.expireIn*24;
			let progressRate = this.state.progressRate;
			progressRate = Math.floor((progress / expireLimit) * 100);

			if(progressRate > 100){
				progressRate = 100;
			}
			if(progressRate <= 0){
				progressRate = 0;
				this.state.isMemoExpired = true;
			}

			if(progressRate >= 75){
				this.state.progressBarColor = 'over-75';
			}else if(progressRate >= 50){
				this.state.progressBarColor = 'over-50';
			}else if(progressRate >= 25){
				this.state.progressBarColor = 'over-25';
			}else{
				this.state.progressBarColor = 'over-0';
			}
			return this.state.progressBarColor;
		},
	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data.memo._id);
		},
		'click .fa-clock-o'(){
			Meteor.call('memoUrlClicked', this.data.memo);
		},
		'click .title'(){
			Meteor.call('memoUrlClicked', this.data.memo);
			window.open(this.data.memo.url);
		},
		'click .circle'(){
			Meteor.call('memoUrlClicked', this.data.memo);
			window.open(this.data.memo.url);
		},
	}
});