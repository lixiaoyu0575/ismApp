"use strict";
angular.module('app')
    .run(
        [
            '$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                // console.log($rootScope);

            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                console.log(window.location);
                console.log("what");
                console.log(1);
                $urlRouterProvider
                    /*.when(window.location.href,["$rootScope","$stateParams",function($rootScope){
                        console.log("entered");
                        if(!$rootScope.userToken){
                            $rootScope.$state.go("login");
                        }
                    }])*/
                    .otherwise("searchStart")
                    ;
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app.knowledgeGraph', {
                        url: '/knowledgeGraph',
                        template:"<network-graph></network-graph>",
                        ncyBreadcrumb: {
                            label: '知识图谱',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.patientClinicalPathway', {
                        url: '/patientClinicalPathway',
                        templateUrl:'views/tpl/patientClinicalPathway.html',
                        ncyBreadcrumb: {
                            label: '患者信息展示',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.similarPatientsDia', {
                        url: '/similarPatientsDia',
                        templateUrl:'views/tpl/similarPatientsDia.html',
                        ncyBreadcrumb: {
                            label: '相似患者诊断分析',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.similarPatientsMed', {
                        url: '/similarPatientsMed',
                        templateUrl:'views/tpl/similarPatientsMed.html',
                        ncyBreadcrumb: {
                            label: '相似患者用药分析',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.diseaseCause', {
                        url: '/diseaseCause',
                        templateUrl:'views/tpl/diseaseCause.html',
                        ncyBreadcrumb: {
                            label: '疾病风险预测',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkdisease', {
                        url: '/mkdisease',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '疾病',
                            description: ''
                        },
                     controllerProvider:function($rootScope){
                         if(!$rootScope.nodeToken){
                             console.log("noToken");
                         $rootScope.$state.go("login");
                         }
                         }
                    })
                    .state('app.mksymptom', {
                        url: '/mksymptom',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '症状',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkmedication', {
                        url: '/mkmedication',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '药品',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mklab', {
                        url: '/mklab',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '辅助检查',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkmedicare', {
                        url: '/mkmedicare',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '医保药品',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkclinicalpathway', {
                        url: '/mkclinicalpathway',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '临床路径',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkevidence', {
                        url: '/mkevidence',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '循证医学',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkresearch', {
                        url: '/mkresearch',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '疾病研究',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkclinicalg', {
                        url: '/mkclinicalg',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '临床指南',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkvideo', {
                        url: '/mkvideo',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '视频库',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.mkotherres', {
                        url: '/mkotherres',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '其他资源',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.traditionalSyndrome',{
                        url: '/mktraditionalSyndrome',
                        templateUrl:'views/tpl/bianzhenglunzhi.html',
                        controller: "traditionalSyndromeController",
                        ncyBreadcrumb: {
                            label:'辨证论治',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.traditionalTuinan',{
                        url: '/mktraditionalTuinan',
                        templateUrl:'views/tpl/traditionalTuinan.html',
                        controller:'traditionalTuinanController',
                        ncyBreadcrumb: {
                            label:'针灸推拿',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.traditionalShiliao',{
                        url: '/mktraditionalShiliao',
                        templateUrl:'views/tpl/traditionalShiliao.html',
                        controller:"traditionalShiliaoController",
                        ncyBreadcrumb: {
                            label:'药膳食疗',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.traditionalSearch',{
                        url: '/mktraditionalSearch',
                        templateUrl:'views/tpl/traditionalSearch.html',
                        controller: "traditionalSearchController",
                        ncyBreadcrumb: {
                            label:'中药检索',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.cohortComparsion',{
                        url: '/cohortComparsion/',
                        templateUrl:'views/tpl/cohortComparsion.html',
                        controller: "cohortComparsionController",
                        ncyBreadcrumb: {
                            label:'cohort comparsion',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.details',{
                        url: '/details/:zid',
                        templateUrl:'views/tpl/myModalContent.html',
                        controller: "ModalInstanceCtrl",
                        ncyBreadcrumb: {
                            label:'details',
                            description:''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.clinicPath', {
                        url: '/clinicPath',
                        templateUrl: 'views/tpl/clinicPath.html',
                        ncyBreadcrumb: {
                            label: '临床路径比较',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.medcareFee', {
                        url: '/medcareFee',
                        templateUrl: 'views/tpl/medcareFee.html',
                        ncyBreadcrumb: {
                            label: '医保控费',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.AdvReaction1', {
                        url: '/AdvReaction_1',
                        templateUrl: 'views/tpl/AdvReaction_1.html',
                        ncyBreadcrumb: {
                            label: '不良反应信息查询',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.AdvReaction2', {
                        url: '/AdvReaction_2',
                        templateUrl: 'views/tpl/AdvReaction_2.html',
                        ncyBreadcrumb: {
                            label: '患者不良反应信息',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('app.UserCtrl', {
                        url: '/users',
                        templateUrl: 'views/tpl/user.html',
                        ncyBreadcrumb: {
                            label: '用户信息管理',
                            description: ''
                        },
                        controllerProvider:function($rootScope){
                            if(!$rootScope.nodeToken){
                                $rootScope.$state.go("login");
                            }
                        }
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'views/tpl/login.html',
                        ncyBreadcrumb: {
                            label: 'Login'
                        }
                    })
                    .state("app.LowAuthority",{
                        url:"/LowAuth",
                        templateUrl:"views/tpl/LowAuthority.html",
                        ncyBreadcrumb: {
                            label: 'LowAuth'
                        }
                    })
                    .state("searchStart", {
                        url: "/searchStart",
                        templateUrl: "views/tpl/searchStart.html"
                    });
                    // .state('register', {
                    //     url: '/register',
                    //     templateUrl: 'views/tpl/register.html',
                    //     ncyBreadcrumb: {
                    //         label: 'Register'
                    //     }
                    // })
            }
        ]
    );