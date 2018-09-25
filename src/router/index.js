import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import homeContent from '@/view/homeContent'
import dealCenter from '@/components/dealCenter'
import login from '@/components/login'
import register from '@/components/register'
import account from '@/components/account'
import accountCenter from '@/view/accountCenter'
import accountEntrust from '@/view/accountEntrust'
import accountSet from '@/view/accountSet'
import accountMessage from '@/view/accountMessage'
import setCash from '@/components/setCash'
import recharge from '@/view/recharge'
import rechargeMoney from '@/view/rechargeMoney'
import coinRecord from '@/view/coinRecord'
import noticeList from '@/components/noticeList'
import noticeDetail from '@/components/noticeDetail'
import aceite from '@/view/aceite'
import chargeRecord from '@/view/chargeRecord'
import new_account from '@/components/new_account'
import finance from '@/view/accounts/finance'
import lever from '@/view/accounts/lever'
Vue.use(Router)
export default new Router({
	routes: [

		{
			path: '/',
			name: 'home',
			component: home,
			children:[
				{
					path:'',
					name:'homeContent',
					component:homeContent
				},
				{
					path:'/dealCenter',
					name:'dealCenter',
					component:dealCenter
				},
			]
		},
		// {
		// 	path:'/dealCenter',
		// 	name:'dealCenter',
		// 	component:dealCenter
		// },
		{
			path:'/components/login',
			name: 'login',
			component: login
		},
		{
			path:'/components/register',
			name: 'register',
			component: register
		},
		{
			path:'/components/noticeList',
			name:'noticeList',
			component:noticeList
		},
		{
			path:'/components/noticeDetail',
			name:'noticeDetail',
			component:noticeDetail
		},
		{
			path:'/account',
			name:'account',
			component:account,
			children: [
				{
				  path: '/accountCenter',
				  name: 'accountCenter',
				  component: accountCenter
				},
				{
					path: '/accountEntrust',
				  	name: 'accountEntrust',
				  	component: accountEntrust
				},
				{
					path: '/accountMessage',
				  	name: 'accountMessage',
				  	component: accountMessage
				},
				{
					path: '/accountSet',
				  	name: 'accountSet',
				  	component: accountSet
				},
				{
					path:'/recharge',
					name:'recharge',
					component:recharge
				},
				{
					path:'/coinRecord',
					name:'coinRecord',
					component:coinRecord
				},
				{
					path:'/rechargeMoney',
					name:'rechargeMoney',
					component:rechargeMoney
				},
				{
					path:'/aceite',
					name:'aceite',
					component:aceite
				},
				{
					path:'/chargeRecord',
					name:'chargeRecord',
					component:chargeRecord
				}

			]

		},
		{
			path:'/new_account',
			name:'new_account',
			component:new_account,
			children: [
			
				{
					path:'/finance',
					name:'finance',
					component:finance
				},
				{
					path:'/lever',
					name:'lever',
					component:lever
				},
				

			]

		},
		{
			path:'/setCash',
			name: 'setCash',
			component: setCash
		},


	]
})
