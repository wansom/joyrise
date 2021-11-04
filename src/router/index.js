import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../firebase";

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/sign-in',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
		 meta: {
          requiresAuth: true,
        },
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/students',
		name: 'Students',
		layout: "dashboard",
		component: () => import('../views/Students.vue'),
		 meta: {
          requiresAuth: true,
        },
	},
	{
		path: '/feesreports',
		name: 'Reports',
		layout: "dashboard",
		component: () => import('../views/FeeRecords.vue'),
		 meta: {
          requiresAuth: true,
        },
	},
	{
		path: '/levels',
		name: 'Levels',
		layout: "dashboard",
		component: () => import('../views/Levels.vue'),
	},
	{
		path: '/fees',
		name: 'Fees',
		layout: "dashboard",
		component: () => import('../views/Fees.vue'),
	},
	{
		path: '/rtl',
		name: 'RTL',
		layout: "dashboard-rtl",
		meta: {
			layoutClass: 'dashboard-rtl',
		},
		component: () => import('../views/RTL.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
		{
		path: '/addstudent',
		name: 'AddRecord',
		layout:"dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Addstudent.vue'),
	},
	{
		path: '/editstudent',
		name: 'Editstudent',
		layout:"dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Editstudent.vue'),
	},
	{
		path: '/feerecords',
		name: 'Feerecords',
		layout:"dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/FeeRecords.vue'),
	},
	{
		path: '/addfees',
		name: 'Vote',
		layout:"dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/EditFees.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
	{
		path: '/home',
		name: 'Landing',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Home.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/Sign-In");
  } else {
    next();
  }
});

export default router
