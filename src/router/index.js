import Vue from 'vue'
import VueRouter from 'vue-router'

// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve=>(require(['pages/login/login'],resolve)),
    meta: {
      title: '绿色殡葬',
      depth: 1
    }
  },
  {
    path: '/index',
    name: 'index',
    component: resolve=>(require(['pages/index/index'],resolve)),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/person',
    name: 'person',
    component: resolve=>(require(['pages/person/person'],resolve)),
    meta: {
      title: '人员公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/create',
    name: 'create',
    component: resolve=>(require(['pages/create/create'],resolve)),
    meta: {
      title: '创建追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/search',
    name: 'search',
    component: resolve=>(require(['pages/search/search'],resolve)),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/personDetail',
    name: 'personDetail',
    component: resolve=>(require(['pages/personDetail/personDetail'],resolve)),
    meta: {
      title: '人员详情',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechan',
    name: 'mechan',
    component: resolve=>(require(['pages/mechan/mechan'],resolve)),
    meta: {
      title: '机构公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechanDeatil',
    name: 'mechanDeatil',
    component: resolve=>(require(['pages/mechanDeatil/mechanDeatil'],resolve)),
    meta: {
      title: '机构详情',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/jion',
    name: 'jion',
    component: resolve=>(require(['pages/jion/jion'],resolve)),
    meta: {
      title: '申请加入',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: resolve=>(require(['pages/comment/comment'],resolve)),
    meta: {
      title: '评价公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/commentDetail',
    name: 'commentDetail',
    component: resolve=>(require(['pages/commentDetail/commentDetail'],resolve)),
    meta: {
      title: '市民评价',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/toComment',
    name: 'toComment',
    component: resolve=>(require(['pages/toComment/toComment'],resolve)),
    meta: {
      title: '评价',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/info',
    name: 'info',
    component: resolve=>(require(['pages/info/info'],resolve)),
    meta: {
      title: '政策公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/service',
    name: 'service',
    component: resolve=>(require(['pages/service/service'],resolve)),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/recall',
    name: 'recall',
    component: resolve=>(require(['pages/recall/recall'],resolve)),
    meta: {
      title: '线上追思',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/completion',
    name: 'completion',
    component: resolve=>(require(['pages/completion/completion'],resolve)),
    meta: {
      title: '创建成功',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component: resolve=>(require(['pages/modify/modify'],resolve)),
    meta: {
      title: '编辑纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/myRecall',
    name: 'myRecall',
    component: resolve=>(require(['pages/myRecall/myRecall'],resolve)),
    meta: {
      title: '我的追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/show',
    name: 'show',
    component: resolve=>(require(['pages/show/show'],resolve)),
    meta: {
      title: '',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/news',
    name: 'news',
    component: resolve=>(require(['pages/news/news'],resolve)),
    meta: {
      title: '共享纪念堂申请',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/diary',
    name: 'diary',
    component: resolve=>(require(['pages/diary/diary'],resolve)),
    meta: {
      title: '追思日记',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: resolve=>(require(['pages/setting/setting'],resolve)),
    meta: {
      title: '功能设置',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/template',
    name: 'template',
    component: resolve=>(require(['pages/template/template'],resolve)),
    meta: {
      title: '选择追思纪念堂模板',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/music',
    name: 'music',
    component: resolve=>(require(['pages/music/music'],resolve)),
    meta: {
      title: '选择追思纪念堂音乐',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/remindDetail',
    name: 'remindDetail',
    component: resolve=>(require(['pages/remindDetail/remindDetail'],resolve)),
    meta: {
      title: '祭祀提醒',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/share',
    name: 'share',
    component: resolve=>(require(['pages/share/share'],resolve)),
    meta: {
      title: '分享',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/product',
    name: 'product',
    component: resolve=>(require(['pages/product/product'],resolve)),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/box',
    name: 'box',
    component: resolve=>(require(['pages/box/box'],resolve)),
    meta: {
      title: '知名品牌',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/burial',
    name: 'burial',
    component: resolve=>(require(['pages/burial/burial'],resolve)),
    meta: {
      title: '安葬用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/funeral',
    name: 'funeral',
    component: resolve=>(require(['pages/funeral/funeral'],resolve)),
    meta: {
      title: '殡仪用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/piety',
    name: 'piety',
    component: resolve=>(require(['pages/piety/piety'],resolve)),
    meta: {
      title: '孝道用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: resolve=>(require(['pages/detail/detail'],resolve)),
    meta: {
      title: '产品详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/burialPlanning',
    name: 'burialPlanning',
    component: resolve=>(require(['pages/burialPlanning/burialPlanning'],resolve)),
    meta: {
      title: '安葬策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/funeralPlanning',
    name: 'funeralPlanning',
    component: resolve=>(require(['pages/funeralPlanning/funeralPlanning'],resolve)),
    meta: {
      title: '殡仪策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/deathbed',
    name: 'deathbed',
    component: resolve=>(require(['pages/deathbed/deathbed'],resolve)),
    meta: {
      title: '临终关怀策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/life',
    name: 'life',
    component: resolve=>(require(['pages/life/life'],resolve)),
    meta: {
      title: '生平模板',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/InfoDetail',
    name: 'InfoDetail',
    component: resolve=>(require(['pages/InfoDetail/InfoDetail'],resolve)),
    meta: {
      title: '公示详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: resolve=>(require(['pages/personalCenter/personalCenter'],resolve)),
    meta: {
      title: '个人中心',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/guestLogin',
    name: 'guestLogin',
    component: resolve=>(require(['pages/guestLogin/guestLogin'],resolve)),
    meta: {
      title: '执宾入口',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/deathManage',
    name: 'deathManage',
    component: resolve=>(require(['pages/personalCenter/deathManage/deathManage'],resolve)),
    meta: {
      title: '忌日管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personModify',
    name: 'personModify',
    component: resolve=>(require(['pages/personalCenter/personModify/personModify'],resolve)),
    meta: {
      title: '修改执殡信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/mechanModify',
    name: 'mechanModify',
    component: resolve=>(require(['pages/personalCenter/mechanModify/mechanModify'],resolve)),
    meta: {
      title: '修改机构信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myMessage',
    name: 'myMessage',
    component: resolve=>(require(['pages/personalCenter/myMessage/myMessage'],resolve)),
    meta: {
      title: '留言管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myEvaluate',
    name: 'myEvaluate',
    component: resolve=>(require(['pages/personalCenter/myEvaluate/myEvaluate'],resolve)),
    meta: {
      title: '评价记录',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myEdit',
    name: 'myEdit',
    component: resolve=>(require(['pages/personalCenter/myEdit/myEdit'],resolve)),
    meta: {
      title: '编辑个人信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component: resolve=>(require(['pages/personalCenter/myCollection/myCollection'],resolve)),
    meta: {
      title: '我的收藏',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myBrowsing',
    name: 'myBrowsing',
    component: resolve=>(require(['pages/personalCenter/myBrowsing/myBrowsing'],resolve)),
    meta: {
      title: '最近浏览',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/puplic',
    name: 'puplic',
    component: resolve=>(require(['pages/puplic/puplic'],resolve)),
    meta: {
      title: '测试',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/delete',
    name: 'delete',
    component: resolve=>(require(['pages/delete/delete'],resolve)),
    meta: {
      title: '追思纪念堂已被删除',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/mechanSearch',
    name: 'mechanSearch',
    component: resolve=>(require(['pages/mechanSearch/mechanSearch'],resolve)),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personSearch',
    name: 'personSearch',
    component: resolve=>(require(['pages/personSearch/personSearch'],resolve)),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/commentSearch',
    name: 'commentSearch',
    component: resolve=>(require(['pages/commentSearch/commentSearch'],resolve)),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/searchHall',
    name: 'searchHall',
    // component: resolve=>(require(['pages/searchHall/searchHall'],resolve)),
    component: resolve=>(require(['pages/searchHall/searchHall'],resolve)),
    meta: {
      title: '搜索纪念堂',
      requireAuth: true,
      depth: 1
    },

  },
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
export default router