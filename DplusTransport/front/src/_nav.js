export default {
  items: [
    {
      name: 'คอนเฟริม',
      url: '/buttons',
      icon: 'icon-layers',
      children: [
        {
          name: 'คอนเฟริมบิล',
          url: '/Confirm/ConfirmBill',
          icon: 'icon-layers',
        },
        {
          name: 'คอนเฟริมเคลม',
          url: '/Confirm/ConfirmClaim',
          icon: 'icon-layers',
        },
      ],
    },
    {
      name: 'งานจัดส่ง',
      url: '/buttons',
      icon: 'icon-basket-loaded',
      children: [
        {
          name: 'รับงาน',
          url: '/Transport/GetTask',
          icon: 'icon-envelope-letter',
        },
        {
          name: 'จ่ายงาน',
          url: '/Transport/Assignment',
          icon: 'icon-cursor',
        },
        {
          name: 'เคลียร์งาน',
          url: '/Transport/ClearTask',
          icon: 'icon-check',
        },
      ],
    },
    {
      name: 'ติดตาม',
      url: '/buttons',
      icon: 'icon-location-pin',
      children: [
        {
          name: 'ติดตามสินค้า',
          url: '/Tracking/TrackingOrder',
          icon: 'icon-location-pin',
        },
        {
          name: 'ติดตามแมสเซนเจอร์',
          url: '/Tracking/TrackingMas',
          icon: 'icon-location-pin',
        },
      ],
    },
    {
      name: 'คิดค่ารอบแมสเซนเจอร์',
      url: '/buttons',
      icon: 'icon-calculator',
      children: [
        {
          name: 'รายเดือน',
          url: '/PayMas/Monthly',
          icon: 'icon-calculator',
        },
        {
          name: 'รายวัน',
          url: '/PayMas/Daily',
          icon: 'icon-calculator',
        },
      ],
    },
    {
      name: 'รายงาน',
      url: '/buttons',
      icon: 'icon-note',
      children: [
        {
          name: 'รายงานบัญชี',
          url: '/Report/AccountReport',
          icon: 'icon-note',
        },
        {
          name: 'รายงานคืนสินค้า',
          url: '/Report/CNReport',
          icon: 'icon-note',
        },
        {
          name: 'รายงานการส่ง',
          url: '/Report/TransportReport',
          icon: 'icon-note',
        },
      ],
    },
    {
      name: 'จัดการ',
      url: '/buttons',
      icon: 'icon-settings',
      children: [
        {
          name: 'จัดการสิทธิ์',
          url: '/Manage/ManagePrivilege',
          icon: 'icon-people',
        },
        {
          name: 'จัดการแมสเซนเจอร์',
          url: '/Manage/AddMas',
          icon: 'icon-user-follow',
        },
        {
          name: 'จ่ายงานเอกสาร',
          url: '/Manage/AssignmentDoc',
          icon: 'icon-cursor',
        },
        {
          name: 'จัดการสถานะ',
          url: '/Manage/EditStatus',
          icon: 'icon-settings',
        },
      ],
    },
  ],
};
