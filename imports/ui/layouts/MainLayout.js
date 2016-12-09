import { TemplateController } from 'meteor/space:template-controller';
import '../../stylesheets/style.less';
import './MainLayout.html';
import { rwindow } from 'meteor/gadicohen:reactive-window';
//partials
import '../partials/Header.js';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';
import '../partials/SearchBar/SearchBar.js';
import '../partials/LabelBar/labelBar.js';
import '../partials/Modals/Modals.js';
TemplateController('MainLayout',{
	state:{
		shouldBlur:false,
	},
	onCreated(){
		Session.set('shouldHeaderBeShownAtFullWindow',true);
	},

	helpers:{
		shouldBlur(){
			if(Session.get('overlayShow')){
				this.state.shouldBlur = true;
			}else{
				this.state.shouldBlur = false;
			}
			return this.state.shouldBlur;
		},
		shouldSearchBarShow(){
			if(rwindow.$width() >= 992){
				if(Session.get('isSearchNavShown') || Session.get('isShrinkedSideNavShown')){
					Session.set('isShrinkedSideNavShown',false);
					Session.set('isSearchNavShown',false);
				}
			}
			if(rwindow.$width() <= 992){
				if(Session.get('isSearching') || Session.get('labelBarShow')){
					this.state.shouldBlur = false;
					Session.set('isSearching',false);
					Session.set('labelBarShow',false);
				}
				return false;
			}else{
				return true;
			}
		},
	}
});