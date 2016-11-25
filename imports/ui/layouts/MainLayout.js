import { TemplateController } from 'meteor/space:template-controller';
import '../../style.css';
import './MainLayout.html';
import { rwindow } from 'meteor/gadicohen:reactive-window';
//partials
import '../partials/Header.js';
import '../partials/SideNav.js';
import '../partials/PageTitle.js';
import '../partials/Overlay.js';
import '../partials/SearchBar/SearchBar.js';

TemplateController('MainLayout',{
	onCreated(){
		Session.set('shouldHeaderBeShownAtFullWindow',true);
	},

	helpers:{
		shouldSearchBarShow(){
			if(rwindow.$width() >= 992){
				Session.set('isShrinkedSideNavShown',false);
				Session.set('isSearchNavShown',false);
			}
			if(rwindow.$width() <= 992 || Meteor.userId()){
				Session.set('isSearching',false);
				return false;
			}else{
				return true;
			}
		},
	}
});