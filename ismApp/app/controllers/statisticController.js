/**
 * Created by xiaoyu on 17-3-3.
 */
"use strict";
angular.module("app")
    .controller("statiticController", statiticController)
function statiticController($scope, $rootScope) {
    var typeNumChart = echarts.init(document.getElementById("statisticTypeNum")),
        timeNumChart = echarts.init(document.getElementById("statisticTimeNum")),
        typeNumOption;
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
    $rootScope.pageLoading = false;

}
