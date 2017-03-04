"use strict";
angular.module("app")
    .controller("topicCloudController", topicCloudController);
function topicCloudController($scope, $rootScope) {
    var topicCloudChart = echarts.init(document.getElementById("topicCloud")),
        option = {
        title:{
            text:"今日话题词云图",
            link:'https://github.com/ecomfe/echarts-wordcloud'
            // subtext: 'data-visual.cn',
            // sublink:'http://data-visual.cn',
        },
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 30,
            sizeRange: [20, 50],
            rotationRange: [0, 0],
            shape: 'circle',
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255)
                            ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [ {
                "name": "十余年",
                "value": 0.33206303691010686
            },
                {
                    "name": "无人管",
                    "value": 0.4069772652297948
                },
                {
                    "name": "相关",
                    "value": 0.5407886400730808
                },
                {
                    "name": "END",
                    "value": 0.11649521621028036
                },
                {
                    "name": "作出",
                    "value": 0.01292065555808597
                },
                {
                    "name": "整改",
                    "value": 0.8819593283573981
                },
                {
                    "name": "news",
                    "value": 0.370139797886326
                },
                {
                    "name": "shtmlnews",
                    "value": 0.09904386638475582
                },
                {
                    "name": "严查",
                    "value": 0.4546462235816837
                },
                {
                    "name": "sohu",
                    "value": 0.48868924987983065
                },
                {
                    "name": "朝鲜",
                    "value": 0.2962950083207644
                },
                {
                    "name": "嫌疑人",
                    "value": 0.33111017638776796
                },
                {
                    "name": "首次",
                    "value": 0.7125117616957607
                },
                {
                    "name": "通报",
                    "value": 0.8884184430166917
                },
                {
                    "name": "大使馆",
                    "value": 0.6319923267788854
                },
                {
                    "name": "汽车",
                    "value": 0.7158550184417785
                },
                {
                    "name": "当天",
                    "value": 0.1947857007033188
                },
                {
                    "name": "调查",
                    "value": 0.6752372982725583
                },
                {
                    "name": "拥有",
                    "value": 0.7528290123356781
                },
                {
                    "name": "专家",
                    "value": 0.10006320438807437
                },
                {
                    "name": "人员",
                    "value": 0.496040800838893
                },
                {
                    "name": "医院",
                    "value": 0.6089104431916588
                },
                {
                    "name": "受伤",
                    "value": 0.8371038699137769
                },
                {
                    "name": "报道",
                    "value": 0.18361387135470975
                },
                {
                    "name": "责任",
                    "value": 0.8805510462444776
                },
                {
                    "name": "过程",
                    "value": 0.45682059840600253
                },
                {
                    "name": "人士",
                    "value": 0.5195284366062441
                },
                {
                    "name": "发生",
                    "value": 0.8780400831177019
                },
                {
                    "name": "推进",
                    "value": 0.8624713980373159
                },
                {
                    "name": "律师",
                    "value": 0.3478119324489818
                },
                {
                    "name": "城市",
                    "value": 0.2516186940387156
                },
                {
                    "name": "时间",
                    "value": 0.13033933129055664
                },
                {
                    "name": "期间",
                    "value": 0.8114545880115495
                },
                {
                    "name": "消息",
                    "value": 0.4851679359181458
                },
                {
                    "name": "报道",
                    "value": 0.561737220200652
                },
                {
                    "name": "历史",
                    "value": 0.01996904026558266
                },
                {
                    "name": "CDATA",
                    "value": 0.6803318014219608
                },
                {
                    "name": "相关",
                    "value": 0.1766464810754541
                },
                {
                    "name": "自杀式",
                    "value": 0.2486806260701503
                },
                {
                    "name": "media",
                    "value": 0.05723865626980795
                },
                {
                    "name": "死亡",
                    "value": 0.21371096816399116
                },
                {
                    "name": "发生",
                    "value": 0.9835162133816194
                },
                {
                    "name": "受伤",
                    "value": 0.3156271756352145
                },
                {
                    "name": "组织",
                    "value": 0.3812823973880075
                },
                {
                    "name": "南昌",
                    "value": 0.8005877151596752
                },
                {
                    "name": "当天",
                    "value": 0.7039054963768795
                },
                {
                    "name": "二楼",
                    "value": 0.8353233138513354
                },
                {
                    "name": "医院",
                    "value": 0.9390105962054303
                },
                {
                    "name": "另有",
                    "value": 0.18161707359541768
                },
                {
                    "name": "至少",
                    "value": 0.8989214318902857
                },
                {
                    "name": "初步",
                    "value": 0.7545822527135628
                },
                {
                    "name": "发布",
                    "value": 0.0008126952202218707
                },
                {
                    "name": "中国",
                    "value": 0.946863062536976
                },
                {
                    "name": "控制",
                    "value": 0.3073729311474346
                },
                {
                    "name": "权利",
                    "value": 0.933008793128592
                },
                {
                    "name": "外国",
                    "value": 0.1649532440177005
                },
                {
                    "name": "报告",
                    "value": 0.8171915461677478
                },
                {
                    "name": "现场",
                    "value": 0.6056127013960984
                },
                {
                    "name": "承认",
                    "value": 0.14943725638298277
                },
                {
                    "name": "发展",
                    "value": 0.43198589999836134
                },
                {
                    "name": "本月",
                    "value": 0.37026449411715945
                },
                {
                    "name": "报道",
                    "value": 0.6169380356635619
                },
                {
                    "name": "外媒",
                    "value": 0.7397260591670065
                },
                {
                    "name": "安全部队",
                    "value": 0.11705500353264875
                },
                {
                    "name": "事发",
                    "value": 0.05582171329571051
                },
                {
                    "name": "显示",
                    "value": 0.7796636000358353
                },
                {
                    "name": "此事",
                    "value": 0.8993111087223218
                },
                {
                    "name": "该国",
                    "value": 0.7618461705379771
                },
                {
                    "name": "军事情报",
                    "value": 0.16920032743811975
                },
                {
                    "name": "迹象",
                    "value": 0.19134883570880323
                },
                {
                    "name": "云南",
                    "value": 0.6598708719757753
                },
                {
                    "name": "消息",
                    "value": 0.8654477615240712
                },
                {
                    "name": "今日",
                    "value": 0.23225759160138837
                },
                {
                    "name": "疏散",
                    "value": 0.754445861321457
                },
                {
                    "name": "今天上午",
                    "value": 0.012198666625643617
                },
                {
                    "name": "对此",
                    "value": 0.7289803800682473
                },
                {
                    "name": "影响",
                    "value": 0.9446436081428853
                },
                {
                    "name": "政府",
                    "value": 0.9682564143843417
                },
                {
                    "name": "发生",
                    "value": 0.05512110238580681
                },
                {
                    "name": "组织",
                    "value": 0.9080993969642429
                },
                {
                    "name": "公安机关",
                    "value": 0.3521857107950417
                },
                {
                    "name": "中心",
                    "value": 0.02488766051993707
                },
                {
                    "name": "进一步",
                    "value": 0.08520586165313904
                },
                {
                    "name": "调查",
                    "value": 0.7297837735601587
                },
                {
                    "name": "现场",
                    "value": 0.2943247204256313
                },
                {
                    "name": "搜排",
                    "value": 0.7793912483607937
                },
                {
                    "name": "公安干警",
                    "value": 0.48023142920897466
                },
                {
                    "name": "人经",
                    "value": 0.5488255034455517
                },
                {
                    "name": "刑事拘留",
                    "value": 0.34311987716644055
                },
                {
                    "name": "相互",
                    "value": 0.6668277043249657
                },
                {
                    "name": "党组",
                    "value": 0.3321913443751291
                },
                {
                    "name": "党组书记",
                    "value": 0.8223024016300805
                },
                {
                    "name": "正式",
                    "value": 0.48513989189068973
                },
                {
                    "name": "官员",
                    "value": 0.9849448325475922
                },
                {
                    "name": "预计",
                    "value": 0.039309864860040844
                },
                {
                    "name": "成都",
                    "value": 0.13316609630036036
                },
                {
                    "name": "感觉",
                    "value": 0.01930820044575232
                },
                {
                    "name": "消息",
                    "value": 0.17371491120361504
                },
                {
                    "name": "总局",
                    "value": 0.9808992642949154
                },
                {
                    "name": "时间",
                    "value": 0.03138172037481268
                }]
        }]
    };
    topicCloudChart.setOption(option);
    $rootScope.pageLoading = false;
}