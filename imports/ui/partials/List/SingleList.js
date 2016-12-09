import './SingleList.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js'
import { moment } from 'meteor/momentjs:moment';

TemplateController('SingleList',{
	state:{
		shouldExpireProgressbarShow:false,
		shouldOptionButtonShow:false,
		progressBarColor:'over-75',
		progressRate:0,
	},

	onCreated(){
		const self = this;
		self.autorun(()=>{
			self.subscribe('label');
		});
	},

	helpers:{
		shouldShowExpiration(){
			if(this.data.shouldShowExpiration && this.data.memo.status == "expired"){
				return true;
			};
		},
		shouldExpireProgressbarShow(){
			if(this.data.memo.isFavorited == true){
				this.state.shouldExpireProgressbarShow = false;
			}
			return this.state.shouldExpireProgressbarShow;
		},
		shouldOptionButtonShow(){
			return this.state.shouldOptionButtonShow;
		},
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
		expireStatus(){
			return this.state.progressRate;
		},
		progressBarColor(){
				const expireDate = moment(this.data.memo.expiredAt);
				const today = moment().format();
				const progress = expireDate.diff(today, 'hours');
				const expireLimit = this.data.memo.expireIn*24;
				let progressRate = 0;
				progressRate = Math.floor((progress / expireLimit) * 100);

				if(progressRate > 100){
					progressRate = 100;
				}
				if(progressRate <= 0){
					progressRate = 0;
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
				this.state.progressRate = progressRate;
			return this.state.progressBarColor;
		},
		isMemoExpired(){
			if(this.data.memo.status == "expired" && this.data.memo.isFavorited === false){
				return true;
			}else{
				return false;
			}
		}
	},

	events:{
		'click .fa-close'(){
			Meteor.call('deleteMemo',this.data.memo._id);
		},
		'click .fa-refresh'(){
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
		'click .chip'(){
			Router.go('label.detail',{labelId:this.data.memo.labelId});
		},
		'mouseover .list-item'(){
			this.state.shouldOptionButtonShow = true;
			const memo = this.data.memo;
			if(memo.status == "expired" || memo.isFavorited == true){
				return;
			}
			this.state.shouldExpireProgressbarShow = true;
		},
		'mouseout .list-item'(){
			this.state.shouldOptionButtonShow = false;
			this.state.shouldExpireProgressbarShow = false;
		},
		'click .fa-archive'(){
			Meteor.call('archiveMemo', this.data.memo);
		},
	}
});