import React from 'react';
import Loadable from 'react-loadable'
import App from './App'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const ConfirmBill = Loadable({
  loader: () => import('./views/Confirm/ConfirmBill/ConfirmBill'),
  loading: Loading,
});

const ConfirmClaim = Loadable({
  loader: () => import('./views/Confirm/ConfirmClaim/ConfirmClaim'),
  loading: Loading,
});

const Assignment = Loadable({
  loader: () => import('./views/Transport/Assignment/Assignment'),
  loading: Loading,
});

const GetTask = Loadable({
  loader: () => import('./views/Transport/GetTask/GetTask'),
  loading: Loading,
});

const ClearTask = Loadable({
  loader: () => import('./views/Transport/ClearTask/ClearTask'),
  loading: Loading,
});

const TrackingOrder = Loadable({
  loader: () => import('./views/Tracking/TrackingOrder/TrackingOrder'),
  loading: Loading,
});

const TrackingMas = Loadable({
  loader: () => import('./views/Tracking/TrackingMas/TrackingMas'),
  loading: Loading,
});

const Monthly = Loadable({
  loader: () => import('./views/PayMas/Monthly/Monthly'),
  loading: Loading,
});

const Daily = Loadable({
  loader: () => import('./views/PayMas/Daily/Daily'),
  loading: Loading,
});

const AccountReport = Loadable({
  loader: () => import('./views/Report/AccountReport/AccountReport'),
  loading: Loading,
});

const CNReport = Loadable({
  loader: () => import('./views/Report/CNReport/CNReport'),
  loading: Loading,
});

const TransportReport = Loadable({
  loader: () => import('./views/Report/TransportReport/TransportReport'),
  loading: Loading,
});

const ManagePrivilege = Loadable({
  loader: () => import('./views/Manage/ManagePrivilege/ManagePrivilege'),
  loading: Loading,
});

const AddMas = Loadable({
  loader: () => import('./views/Manage/AddMas/AddMas'),
  loading: Loading,
});

const AssignmentDoc = Loadable({
  loader: () => import('./views/Manage/AssignmentDoc/AssignmentDoc'),
  loading: Loading,
});

const EditStatus = Loadable({
  loader: () => import('./views/Manage/EditStatus/EditStatus'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('./views/Home/Home'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [{
  path:'/',
  component: App,
  indexRoute:{component:ConfirmBill},
  childRoutes:[
  { path: '/', exact: true, name: 'ConfirmBill', component: ConfirmBill },  
  { path: '/Confirm/ConfirmBill', name: 'ConfirmBill', component: ConfirmBill },
  { path: '/Confirm/ConfirmClaim', name: 'ConfirmClaim', component: ConfirmClaim },
  { path: '/Transport/Assignment', name: 'Assignment', component: Assignment },
  { path: '/Transport/GetTask', name: 'GetTask', component: GetTask },
  { path: '/Transport/ClearTask', name: 'ClearTask', component: ClearTask },
  { path: '/Tracking/TrackingOrder', name: 'TrackingOrder', component: TrackingOrder },
  { path: '/Tracking/TrackingMas', name: 'TrackingMas', component: TrackingMas },
  { path: '/PayMas/Monthly', name: 'Monthly', component: Monthly },
  { path: '/PayMas/Daily', name: 'Daily', component: Daily },
  { path: '/Report/AccountReport', name: 'AccountReport', component: AccountReport },
  { path: '/Report/CNReport', name: 'CNReport', component: CNReport },
  { path: '/Report/TransportReport', name: 'TransportReport', component: TransportReport },
  { path: '/Manage/ManagePrivilege', name: 'ManagePrivilege', component: ManagePrivilege },
  { path: '/Manage/AddMas', name: 'AddMas', component: AddMas },
  { path: '/Manage/AssignmentDoc', name: 'AssignmentDoc', component: AssignmentDoc },
  { path: '/Manage/EditStatus', name: 'EditStatus', component: EditStatus },
  ]
}];

export default routes;
