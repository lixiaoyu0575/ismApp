/**
 * Created by xiaoyu on 17-3-3.
 */
"use strict";
angular.module("app")
    .controller("statiticController", statiticController);
function statiticController($scope, $rootScope) {
    var typeNumChart = echarts.init(document.getElementById("statisticTypeNum")),
        timeNumChart = echarts.init(document.getElementById("statisticTimeNum")),
        typeNumOption,
        timeNumOption;
    typeNumOption = {
        title : {
            text: '新闻类别统计',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['财经','体育','社会','娱乐','科技','军事','生活','IT','房产','健康','汽车','能源']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:2305, name:'财经'},
                    {value:1187, name:'体育'},
                    {value:942, name:'社会'},
                    {value:697, name:'娱乐'},
                    {value:615, name:'科技'},
                    {value:182, name:'军事'},
                    {value:107, name:'生活'},
                    {value:84, name:'IT'},
                    {value:58, name:'房产'},
                    {value:57, name:'健康'},
                    {value:37, name:'汽车'},
                    {value:30, name:'能源'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    typeNumChart.setOption(typeNumOption);
    timeNumOption = {
        title: {
            text: '新闻发布时间堆叠区域图',
            x:'center'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: [
                "房产",
                "娱乐",
                "社会",
                "生活",
                "能源",
                "文化",
                "体育",
                "财经",
                "IT",
                "科技",
                "汽车",
                "军事",
                "健康"
            ],
            orient: 'vertical',
            left: 'right'
        },
        toolbox: {
            feature: {
                // saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data: [
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23"
                ]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                data: [
                    3,
                    5,
                    6,
                    0,
                    2,
                    0,
                    9,
                    24,
                    30,
                    51,
                    90,
                    73,
                    29,
                    65,
                    79,
                    59,
                    40,
                    26,
                    19,
                    4,
                    25,
                    25,
                    28,
                    5
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "娱乐",
                stack: "总量"
            },{
                data: [
                    12,
                    19,
                    35,
                    33,
                    37,
                    11,
                    18,
                    32,
                    45,
                    62,
                    78,
                    59,
                    28,
                    40,
                    70,
                    80,
                    89,
                    31,
                    26,
                    28,
                    42,
                    24,
                    16,
                    27
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "社会",
                stack: "总量"
            },{
                data: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    2,
                    14,
                    13,
                    1,
                    12,
                    8,
                    22,
                    22,
                    2,
                    1,
                    2,
                    2,
                    2,
                    1,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "生活",
                stack: "总量"
            },{
                data: [
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    2,
                    1,
                    1,
                    0,
                    2,
                    10,
                    3,
                    1,
                    3,
                    2,
                    1,
                    1,
                    1,
                    0,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "能源",
                stack: "总量"
            },{
                data: [
                    2,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    1,
                    10,
                    9,
                    9,
                    4,
                    8,
                    12,
                    13,
                    16,
                    6,
                    9,
                    14,
                    16,
                    17,
                    6,
                    6
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "文化",
                stack: "总量"
            },{
                data: [
                    9,
                    17,
                    9,
                    7,
                    11,
                    11,
                    13,
                    47,
                    56,
                    136,
                    157,
                    119,
                    71,
                    50,
                    70,
                    61,
                    78,
                    47,
                    32,
                    31,
                    32,
                    54,
                    46,
                    23
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "体育",
                stack: "总量"
            },{
                data: [
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    2,
                    24,
                    53,
                    31,
                    17,
                    4,
                    2,
                    8,
                    8,
                    10,
                    8,
                    2,
                    5,
                    3,
                    4,
                    0,
                    0,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "军事",
                stack: "总量"
            },{
                data: [
                    46,
                    39,
                    26,
                    55,
                    18,
                    25,
                    64,
                    139,
                    156,
                    136,
                    151,
                    140,
                    61,
                    83,
                    100,
                    140,
                    113,
                    69,
                    46,
                    58,
                    63,
                    92,
                    27,
                    18
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "财经",
                stack: "总量"
            },{
                data: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    3,
                    0,
                    0,
                    3,
                    6,
                    12,
                    8,
                    3,
                    3,
                    14,
                    9,
                    11,
                    5,
                    5,
                    0,
                    1,
                    1,
                    0,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "IT",
                stack: "总量"
            },{
                data: [
                    3,
                    0,
                    0,
                    0,
                    0,
                    10,
                    4,
                    18,
                    82,
                    72,
                    34,
                    36,
                    16,
                    15,
                    72,
                    85,
                    71,
                    24,
                    49,
                    5,
                    5,
                    5,
                    4,
                    5
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "科技",
                stack: "总量"
            },{
                data: [
                    0,
                    0,
                    1,
                    1,
                    1,
                    0,
                    1,
                    1,
                    0,
                    6,
                    4,
                    3,
                    0,
                    1,
                    7,
                    6,
                    2,
                    1,
                    0,
                    2,
                    0,
                    0,
                    0,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "汽车",
                stack: "总量"
            },{
                data: [
                    6,
                    2,
                    2,
                    3,
                    0,
                    0,
                    1,
                    0,
                    3,
                    0,
                    6,
                    4,
                    1,
                    4,
                    5,
                    5,
                    5,
                    2,
                    2,
                    2,
                    4,
                    1,
                    0,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "房产",
                stack: "总量"
            },{
                data: [
                    0,
                    1,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    2,
                    3,
                    1,
                    3,
                    5,
                    16,
                    7,
                    2,
                    4,
                    2,
                    4,
                    3,
                    2,
                    0
                ],
                areaStyle: {
                    "normal": {}
                },
                type: "line",
                name: "健康",
                stack: "总量"
            }
        ]
    };
    timeNumChart.setOption(timeNumOption);

    $rootScope.pageLoading = false;

}
