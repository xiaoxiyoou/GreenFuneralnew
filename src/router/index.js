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
    component: () => import('pages/login/login'),
    meta: {
      title: '绿色殡葬',
      depth: 1
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('pages/index/index'),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('pages/person/person'),
    meta: {
      title: '人员公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('pages/create/create'),
    meta: {
      title: '创建追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('pages/search/search'),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/personDetail',
    name: 'personDetail',
    component: () => import('pages/personDetail/personDetail'),
    meta: {
      title: '人员详情',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechan',
    name: 'mechan',
    component: () => import('pages/mechan/mechan'),
    meta: {
      title: '机构公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/mechanDeatil',
    name: 'mechanDeatil',
    component: () => import('pages/mechanDeatil/mechanDeatil'),
    meta: {
      title: '机构详情',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/jion',
    name: 'jion',
    component: () => import('pages/jion/jion'),
    meta: {
      title: '申请加入',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('pages/comment/comment'),
    meta: {
      title: '评价公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/commentDetail',
    name: 'commentDetail',
    component: () => import('pages/commentDetail/commentDetail'),
    meta: {
      title: '市民评价',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/toComment',
    name: 'toComment',
    component: () => import('pages/toComment/toComment'),
    meta: {
      title: '评价',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('pages/info/info'),
    meta: {
      title: '政策公示',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('pages/service/service'),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/recall',
    name: 'recall',
    component: () => import('pages/recall/recall'),
    meta: {
      title: '线上追思',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/completion',
    name: 'completion',
    component: () => import('pages/completion/completion'),
    meta: {
      title: '创建成功',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('pages/modify/modify'),
    meta: {
      title: '编辑纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/myRecall',
    name: 'myRecall',
    component: () => import('pages/myRecall/myRecall'),
    meta: {
      title: '我的追思纪念堂',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/show',
    name: 'show',
    component: () => import('pages/show/show'),
    meta: {
      title: '',
      requireAuth: true,
      depth: 1
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('pages/news/news'),
    meta: {
      title: '共享纪念堂申请',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('pages/diary/diary'),
    meta: {
      title: '追思日记',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('pages/setting/setting'),
    meta: {
      title: '功能设置',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('pages/template/template'),
    meta: {
      title: '选择追思纪念堂模板',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('pages/music/music'),
    meta: {
      title: '选择追思纪念堂音乐',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/remindDetail',
    name: 'remindDetail',
    component: () => import('pages/remindDetail/remindDetail'),
    meta: {
      title: '祭祀提醒',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('pages/share/share'),
    meta: {
      title: '分享',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('pages/product/product'),
    meta: {
      title: '绿色殡葬',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/box',
    name: 'box',
    component: () => import('pages/box/box'),
    meta: {
      title: '知名品牌',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/burial',
    name: 'burial',
    component: () => import('pages/burial/burial'),
    meta: {
      title: '安葬用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/funeral',
    name: 'funeral',
    component: () => import('pages/funeral/funeral'),
    meta: {
      title: '殡仪用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/piety',
    name: 'piety',
    component: () => import('pages/piety/piety'),
    meta: {
      title: '孝道用品',
      requireAuth: true,
      depth: 1
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('pages/detail/detail'),
    meta: {
      title: '产品详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/burialPlanning',
    name: 'burialPlanning',
    component: () => import('pages/burialPlanning/burialPlanning'),
    meta: {
      title: '安葬策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/funeralPlanning',
    name: 'funeralPlanning',
    component: () => import('pages/funeralPlanning/funeralPlanning'),
    meta: {
      title: '殡仪策划',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/life',
    name: 'life',
    component: () => import('pages/life/life'),
    meta: {
      title: '生平模板',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/InfoDetail',
    name: 'InfoDetail',
    component: () => import('pages/InfoDetail/InfoDetail'),
    meta: {
      title: '公示详情',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('pages/personalCenter/personalCenter'),
    meta: {
      title: '个人中心',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/guestLogin',
    name: 'guestLogin',
    component: () => import('pages/guestLogin/guestLogin'),
    meta: {
      title: '执宾入口',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/deathManage',
    name: 'deathManage',
    component: () => import('pages/personalCenter/deathManage/deathManage'),
    meta: {
      title: '忌日管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personModify',
    name: 'personModify',
    component: () => import('pages/personalCenter/personModify/personModify'),
    meta: {
      title: '修改执殡信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/mechanModify',
    name: 'mechanModify',
    component: () => import('pages/personalCenter/mechanModify/mechanModify'),
    meta: {
      title: '修改机构信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myMessage',
    name: 'myMessage',
    component: () => import('pages/personalCenter/myMessage/myMessage'),
    meta: {
      title: '留言管理',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myEvaluate',
    name: 'myEvaluate',
    component: () => import('pages/personalCenter/myEvaluate/myEvaluate'),
    meta: {
      title: '评价记录',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myEdit',
    name: 'myEdit',
    component: () => import('pages/personalCenter/myEdit/myEdit'),
    meta: {
      title: '编辑个人信息',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component: () => import('pages/personalCenter/myCollection/myCollection'),
    meta: {
      title: '我的收藏',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/myBrowsing',
    name: 'myBrowsing',
    component: () => import('pages/personalCenter/myBrowsing/myBrowsing'),
    meta: {
      title: '最近浏览',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/puplic',
    name: 'puplic',
    component: () => import('pages/puplic/puplic'),
    meta: {
      title: '测试',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import('pages/delete/delete'),
    meta: {
      title: '追思纪念堂已被删除',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/mechanSearch',
    name: 'mechanSearch',
    component: () => import('pages/mechanSearch/mechanSearch'),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/personSearch',
    name: 'personSearch',
    component: () => import('pages/personSearch/personSearch'),
    meta: {
      title: '搜索',
      requireAuth: true,
      depth: 1
    },

  },
  {
    path: '/commentSearch',
    name: 'commentSearch',
    component: () => import('pages/commentSearch/commentSearch'),
    meta: {
      title: '搜索',
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