



"use strict";
angular.module("app").controller("AdvReaction1", AdvReaction1);


    function AdvReaction1($scope, $rootScope,$http, $location) {


    var vm = $scope.vm = {};
    $rootScope.pageLoading = false;



 /*       vm.Ids=[];


        vm.SearchWait=function() {
            if(vm.Ids.length===0){
                vm.isItemsLoading=true;
            $http.get("http://59.110.52.133:9999/adr/getXids/")
                .success(function (response) {
                        vm.isItemsLoading=false;
                        vm.Ids = response.Results.Med.concat(response.Results.Drug);
                        console.log(vm.Ids);
                    });
            }
            else
            {vm.isItemsLoading=false;}

        };*/



    vm.Ids = ['d100001','d100002','d100003','d100004','d100007','d100008','d100009','d100010','d100011','d100012'
    ,'d100101','d111000','d110000','d111100','d120000','d123000','d137080','m100001','m100007','m100008','m100015','m100017','m100018','m100020','m100080','m100100'
    ];

    vm.test=function()
    {console.log(1);};

    vm.ShowGraph=function() {
        //console.log(1);
        d3.select("svg").remove();

        var width = 708;
        var height = 600;
       // var width = $(".widget-body .row").width;
        //var height= $(".widget-body .row").height;

        if(vm.selected){
            d3.select(".widget-body")
                .select(".row")
                .select(".col-md-12")
                .append("div")
                .attr("id","AdvGraph")
                .attr("class","col-md-12")
                .attr("style","background-color:#F0F8FF");

        var svg = d3.select("#AdvGraph")
            .append("svg")
            .attr("background","steelblue")
            .attr("width", width)
            .attr("height", height);}

        var g = svg.append("g").attr("transform", "translate(" + (width * 0.15) + ",0)");

        /*var tree = d3.cluster()
            .size([height, width * 0.6]);*/


        var pad = width * 0.5;


        d3.json('http://59.110.52.133:3010/api/transfer/?q={"path":"/adr/getMapTree","params":%7B%22Id%22:%22'+vm.selected+'%22%7D}')
            //.header("apikey",$rootScope.Authenapikey)
            //.header("token",$rootScope.userToken)
            .get( function (error, data) {
            if(error)
            {throw error;}
            console.log(data);
            var DFR=data.Results;
            console.log(DFR);

            for (var i = 0; i < DFR.length; i++) {
                if (DFR[i].parent === "") {
                    var oriName = DFR[i].name;
                    DFR[i].name = DFR[i].name + DFR[i].category;
                    for (var j = 0; j < DFR.length; j++) {
                        if (DFR[j].parent === oriName && DFR[j].category !== "")
                        {DFR[j].parent = DFR[j].parent + DFR[i].category;}
                    }
                }
            }

            var TransObj=function(obj)
            {
                obj.children=[];
                return obj;
            };

            var Lengend=[{"category":"D"},{"category":"M"},{"category":"A"}];

            var tree = d3.layout.cluster()
                .size([height, width * 0.6]);


            function ChangeY(RootNode) {
                if (RootNode.children) {
                    var dx = height / (RootNode.children.length + 1);

                    var Drugs = [];
                    var Adv = [];
                    //var Dx=height*
                    for (var i = 0; i < RootNode.children.length; i++) {
                        //console.log(RootNode.children[i]);
                        if (RootNode.children[i].category === "D") {
                            Drugs.push(RootNode.children[i]);
                            RootNode.children[i].y = 0;
                            //RootNode.children[i].x=(i+1)*100;
                            console.log(RootNode.children[i].category);//pad-RootNode.children[i].y;
                            // ChangeY(RootNode.children[i]);
                        }
                        else {
                            Adv.push(RootNode.children[i]);
                        }
                    }
                    var AddFactorD = 0;
                    var factorD = 0;
                    var AddFactorA = 0;
                    var factorA = 0;
                    for (var k = 0; k < RootNode.children.length; k++) {
                        console.log(AddFactorD);
                        console.log(AddFactorA);
                        if (RootNode.children[k].category === "D") {
                            RootNode.children[k].x = root.x + AddFactorD * dx;
                            if (factorD % 2 === 0)
                            {factorD = 1 - factorD;}
                            else {factorD = -(factorD + 1);}
                            AddFactorD = AddFactorD + factorD;
                        }
                        else {
                            RootNode.children[k].x = root.x + AddFactorA * dx;
                            if (factorA % 2 === 0)
                            {factorA = 1 - factorA;}
                            else {factorA = -(factorA + 1);}
                            AddFactorA = AddFactorA + factorA;
                        }
                    }

                }
            }

            var CreateTree=function(DFR){
                var Answer={};
                for(var i=0;i<DFR.length;i++)
                {

                    if(DFR[i].parent===""&&DFR[i].category==="M")
                    {

                        DFR[i].children=[];
                        for(var j=0;j<DFR.length;j++)
                        {
                            if(DFR[j].category!=="M")
                            {
                                DFR[i].children.push(DFR[j]);}

                        }
                        Answer=DFR[i];
                    }
                    else if(DFR[i].parent===""&&DFR[i].category==="D")
                    {
                        DFR[i].children=[];
                        for(var j=0;j<DFR.length;j++)
                        {
                            if (DFR[j].parent===DFR[i].name)
                            {
                                DFR[i].children.push(DFR[j]);
                            }
                        }
                        console.log(DFR[i].children);
                        for (var k=0;k<DFR[i].children.length;k++)
                        {
                            if(DFR[i].children[k].category==="M")
                            {
                                // console.log(DFR[k].name);
                                DFR[i].children[k].children=[];
                                for (var t=0;t<DFR.length;t++)
                                {
                                    if (DFR[t].parent===DFR[i].children[k].name)
                                    {
                                        DFR[i].children[k].children.push(DFR[t]);
                                    }
                                }
                            }
                        }
                        Answer=DFR[i];
                    }
                }
                return Answer;
            };


            var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y, d.x]; });

            var root=CreateTree(DFR);
            //console.log(CreateTree(DFR));
            console.log(root);

            /* if (root.category === "M") {
             console.log(root.category);
             root.y = pad * 0.5;
             root.x = height * 0.5;
             console.log(root.y);
             ChangeY(root);
             }*/

            var nodes=tree.nodes(root);
            var links=tree.links(nodes);

            for(var i=0;i<nodes.length;i++)
            {
                if (nodes[i].parent===""&&nodes[i].category==="M")
                {
                    var dx = height / (nodes[i].children.length + 1);
                    var Drugs = [];
                    var Adv = [];
                    nodes[i].y=pad*0.5;
                    for (var j = 0; j < nodes[i].children.length; j++) {
                        //console.log(RootNode.children[i]);
                        if (nodes[i].children[j].category === "D") {
                            Drugs.push(nodes[i].children[j]);
                            nodes[i].children[j].y = 0;
                            //RootNode.children[i].x=(i+1)*100;
                            //console.log(RootNode.children[i].category);//pad-RootNode.children[i].y;
                            // ChangeY(RootNode.children[i]);
                        }
                        else {
                            Adv.push(nodes[i].children[j]);
                        }
                    }
                    var AddFactorD = 0;
                    var factorD = 0;
                    var AddFactorA = 0;
                    var factorA = 0;
                    for (var k = 0; k < nodes[i].children.length; k++) {
                        //console.log(AddFactorD);
                        //console.log(AddFactorA);
                        if (nodes[i].children[k].category === "D") {
                            nodes[i].children[k].x = nodes[i].x + AddFactorD * dx;
                            if (factorD % 2 === 0)
                            {factorD = 1 - factorD;}
                            else {factorD = -(factorD + 1);}
                            AddFactorD = AddFactorD + factorD;
                        }
                        else {
                            nodes[i].children[k].x = nodes[i].x + AddFactorA * dx;
                            if (factorA % 2 === 0)
                            {factorA = 1 - factorA;}
                            else {factorA = -(factorA + 1);}
                            AddFactorA = AddFactorA + factorA;
                        }
                    }

                }
            }

            console.log(nodes);
            //console.log(links);

            var legends=svg.selectAll(".AdvLegend")
                .data(Lengend)
                .enter()
                .append("g")
                .attr("class","AdvLegend")
                .attr("transform",function(d,i){
                    var legendX=50;
                    var legendY=20*i+50;
                    return "translate("+legendX+","+legendY+")";
                });

            legends.append("circle")
                .attr("r",4)
                .attr("fill",function(d){
                    if (d.category === "D")
                    {return "#000079";}
                    else if (d.category === "M")
                    {return "#272727";}
                    else if (d.category === "A")
                    {return "#930000";}
                    else
                    {return "#BEBEBE";}
                });
            legends.append("text")
                .attr("dx",10)
                .attr("dy",4)
                .text(function(d)
                {
                    if (d.category === "D")
                    {return "药品";}
                    else if (d.category === "M")
                    {return "药物";}
                    else if (d.category === "A")
                    {return "不良反应";}
                }
                );

            var link = g.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "Advlink")
                .attr("d", diagonal);

            var node = g.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", function (d) {
                    return "Advnode" + (d.children ? " Advnode--internal" : " Advnode--leaf");
                })

                .attr("transform", function (d) {
                    return "translate(" + (d.y) + "," + (d.x) + ")";
                });

            node.append("circle")
                .attr("class","AdvNodeCircle")
                .attr("r", function(d){
                    if (d.parent==="")
                    {return 4;}
                    else
                    {return 2.5;}
                })
                .attr("fill", function (d) {
                    if (d.category === "D")
                    {return "#000079";}
                    else if (d.category === "M")
                    {return "#272727";}
                    else if (d.category === "A")
                    {return "#930000";}
                    else
                    {return "#BEBEBE";}
                })
            ;

            node.append("text")
                .attr("dy", 3)
                .attr("x", function (d) {
                    return d.children ? -8 : 8;
                })
                .style("text-anchor", function (d) {
                    return d.children ? "end" : "start";
                })
                .text(function (d) {
                    return d.name;
                });
        });

    };
}
