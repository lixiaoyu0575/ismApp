/**
 * Created by Wemakefocus on 2016/4/4.
 */
"use strict";
angular.module('app')
    .directive('networkGraph', function ($http,Data,$q,$compile,$timeout,$rootScope, $location) {
        return {
            templateUrl: 'views/tpl/knowledgeGraph.html',
            restrict: 'E',
            scope: {data: '='},
            link: function postLink(scope, element, attrs) {
                if (!$rootScope.nodeToken) {
                    console.log("user token not exist");
                    $location.path("/login");
                }
                console.log(window.innerHeight);
                $('#cy,#myDetailsTable').height(window.innerHeight-150);
                var errorModal = $rootScope.errorModal = {};
                errorModal.unneededAPI = {};
                scope.firstInit = 1;
                scope.levelMode = true;
                scope.filter={};
                scope.filter.isFilterShow = false;
                scope.filter.isCollapsed = true;
                scope.$on('submitQuery', function (e, item) {
                    $rootScope.errorModal.unneededAPI = {};
                    errorModal.apiTimestamp = new Date().getTime();
                    scope.item = item;
                    //drawNetwork(item);
                    initGraph(item);
                });
                scope.$on('getDiseaseIds',function (e,item) {
                    $rootScope.errorModal.unneededAPI.apiTimestamp = 0;
                    errorModal.apiTimestamp = new Date().getTime();
                    console.log(new Date().getTime());
                    console.log(errorModal.apiTimestamp);
                    console.log($rootScope.errorModal.apiTimestamp);
                    scope.isSearchingDisease = true;
                    scope.isGraphLoading = true;
                    scope.$broadcast("graphElements",{"nodes":""});
                    var graphP = Data.getDisRelation(item);
                    var styleP = Data.getNetworkStyle();
                    scope.modalTimer = $timeout(
                        function () {
                            console.log("timer excute !");
                            errorModal.isWaitingForAPI = 1;
                            var timeOutString = '<p>正在等待数据' +
                                '<div class="spinner">' +
                                '<div class="bounce1"></div>' +
                                '<div class="bounce2"></div>' +
                                '<div class="bounce3"></div>' +
                                '</div>' +'</p>';
                            var modalTimeOutDetails=$compile(timeOutString)(scope);
                            angular.element('#modalTimeOutDetails').html(modalTimeOutDetails);
                            $('#errorModal').modal('show');
                        },
                        1000
                    );
                    scope.firstInit = 1;
                    $q.all([graphP,styleP]).then(
                        function(then){
                            $timeout.cancel(scope.modalTimer);
                            console.log(then);
                            if(!!then[0].unneeded && then[0].unneeded == 1){
                                scope.filter.isFilterShow = false;
                                console.log("this API is unneeded");
                                return 0;
                            };
                            initCy(then);
                        },
                        function (e) {
                            errorModal.isWaitingForAPI = 0;
                            console.log(e);
                            if(!!errorModal.unneededAPI && errorModal.unneededAPI.apiTimestamp != e.config.requestTimestamp){
                            var timeOutString = '<p>等待数据超时，请重新设置<p>';
                            var modalTimeOutDetails=$compile(timeOutString)(scope);
                            angular.element('#modalTimeOutDetails').html(modalTimeOutDetails);
                            $('#errorModal').modal('show');
                            // $('#errorModal').modal('toggle');
                            };
                    });
                });
                scope.$on('getMedicineIds',function (e,item) {
                    $rootScope.errorModal.unneededAPI.apiTimestamp = 0;
                    errorModal.apiTimestamp = new Date().getTime();
                    console.log(new Date().getTime());
                    console.log(errorModal.apiTimestamp);
                    console.log($rootScope.errorModal.apiTimestamp);
                    scope.isSearchingDisease = true;
                    scope.isGraphLoading = true;
                    scope.$broadcast("graphElements",{"nodes":""});
                    var graphP = Data.getMedRelation(item);
                    var styleP = Data.getNetworkStyle();
                    scope.modalTimer = $timeout(
                        function () {
                            console.log("timer excute !");
                            errorModal.isWaitingForAPI = 1;
                            var timeOutString = '<p>正在等待数据'
                                +'<div class="spinner">'
                                +'<div class="bounce1"></div>'
                                +'<div class="bounce2"></div>'
                                +'<div class="bounce3"></div>'
                                +'</div>'
                                +'</p>';
                            var modalTimeOutDetails=$compile(timeOutString)(scope);
                            angular.element('#modalTimeOutDetails').html(modalTimeOutDetails);
                            $('#errorModal').modal('show');
                        },
                        1000
                    );
                    scope.firstInit = 1;
                    $q.all([graphP,styleP]).then(
                        function(then){
                            $timeout.cancel(scope.modalTimer);
                            console.log(then);
                            if(!!then[0].unneeded && then[0].unneeded == 1){
                                scope.filter.isFilterShow = false;
                                console.log("this API is unneeded");
                                return 0;
                            }
                            initCy(then);
                        },
                        function (e) {
                            errorModal.isWaitingForAPI = 0;
                            console.log(e);
                            if(!!errorModal.unneededAPI && errorModal.unneededAPI.apiTimestamp != e.config.requestTimestamp){
                                var timeOutString = '<p>等待数据超时，请重新设置<p>';
                                var modalTimeOutDetails=$compile(timeOutString)(scope);
                                angular.element('#modalTimeOutDetails').html(modalTimeOutDetails);
                                $('#errorModal').modal('show');
                                // $('#errorModal').modal('toggle');
                            }
                        });
                });
                $('#errorModal').on('hidden.bs.modal', function (e) {
                    console.log('modal hidden');
                    scope.isGraphLoading = false;
                    scope.filter.isFilterShow = false;
                })
                var initGraph=function (item) {
                    scope.isGraphLoading=true;
                    // console.log("it is initGraph");
                    // console.log(item);
                    var graphP=Data.getNetworkData(item);
                    var styleP=Data.getNetworkStyle();
                    // when both graph export json and style loaded, init cy
                    scope.firstInit = 1;
                    $q.all([graphP, styleP]).then(initCy);
                };

                scope.gotoAnchor=function (id) {
                    // console.log(id);
                    id="#"+id;
                    // console.log(id);
                    anchorScroll.toView(id,true,'.modal-body');
                    // console.log("gotoAnchor");
                    // console.log(id);
                    // $location.hash(id);
                    // $anchorScroll();
                };
               // scope.gotoAnchor('GS');
                    // Data.getFilterData().then(function (res) {
                    //     console.log('getFilterData().then!!!');
                    //     console.log(res);
                    // });

                //scope.gotoAnchor("testAnchor");
                // var gotoAnchor=function (id) {
                //     console.log("gotoAnchor");
                //     $location.hash(id);
                //     $anchorScroll();
                // };




                        var layoutPadding = 30;
                        var layoutDuration = 500;

                       // console.log(graphP);
                        //console.log(styleP);


                        var infoTemplate = Handlebars.compile([
                            '<p class="ac-name">{{name}}</p>',
                            '<p class="ac-node-type"><i class="fa fa-info-circle"></i> {{NodeTypeFormatted}} {{#if Type}}({{Type}}){{/if}}</p>',
                            '{{#if Milk}}<p class="ac-milk"><i class="fa fa-angle-double-right"></i> {{Milk}}</p>{{/if}}',
                            '{{#if Country}}<p class="ac-country"><i class="fa fa-map-marker"></i> {{Country}}</p>{{/if}}',
                            '<p class="ac-more"><i class="fa fa-external-link"></i> <a target="_blank" href="https://duckduckgo.com/?q={{name}}">More information</a></p>'
                        ].join(''));



                        function highlight(node, superNodeShow) {
                            $('#circlePack svg').remove();
                            cy.$('.added').remove();
                            var nhood = node.closedNeighborhood();

cy.batch(function () {

    // console.log(nhood);
    var firNum = 0;
    nhood.forEach(function (n) {
        if (n._private.group === "nodes") firNum++;
    });
    firNum--;
    var firR = 100;
    // console.log(firNum);
    var num = 1;

    cy.panningEnabled(true);
    cy.zoomingEnabled(true).delay(0, function () {
        cy.$('.highlighted').forEach(function (n) {
            n.animate({
                position: n.data('orgPos')
                // duration:layoutDuration
            });
        })
    }).delay(500, function () {
        cy.elements().not(nhood).removeClass('highlighted').addClass('faded');
        nhood.removeClass('faded').addClass('highlighted');//.removeClass('superShow');
        cy.animate({
            fit: {
                eles: cy.elements(),
                padding: 30
            }
        }, {
            duration: 500
        });
    }).delay(500, function () {
        // console.log("add graph!!!!");
        addFirGraph();
        //addSecGraph()
    });


    function addFirGraph() {
        if (nhood.length === 1) node.layout({
            name: 'preset',
            padding: 300,
            animate: true,
            animationDuration: layoutDuration,
            fit: true,
            stop: function () {
                // cy.panningEnabled(false);
                // cy.zoomingEnabled(false);
                // if (node._private.data.superNum !== undefined)
                //     showPack(superNodeShow[node._private.data.superNum], node);
            }
        });
        //("nhood");
        //console.log(nhood);

        nhood.addClass("detail").difference(node).layout({
            name: 'preset',
            // padding: 150,
            animate: true,
            animationDuration: 100,
            fit: false,
            positions: function (n) {

                var Pos = {
                    x: node._private.data.orgPos.x + Math.sin(2 * Math.PI * (num - 1) / firNum) * firR,
                    y: node._private.data.orgPos.y - Math.cos(2 * Math.PI * (num - 1) / firNum) * firR
                };
                num++;
                return Pos;
            },
            stop: function () {
                //cy.panningEnabled(false);
                //cy.zoomingEnabled(false);
                //addSecGraph();
                cy.animate({
                    fit: {
                        eles: nhood,
                        padding: 30
                    },
                    duration: 500,
                    complete: function () {
                        // if (node._private.data.superNum !== undefined)
                        //     showPack(superNodeShow[node._private.data.superNum], node);
                    }
                });
            }
        });
    }

    function addSecGraph() {
        var a = 50, addEId = 1;
        scope.addIdRecord = [];
        nhood.difference(node.connectedEdges()).difference(node).forEach(function (n) {
            var addNode = n.openNeighborhood().difference(node.connectedEdges()).difference(node).intersection(nhood);
            // console.log(addNode);
            if (addNode.length > 0) {
                addNode.forEach(function (m) {
                    var addId = 1;
                    // console.log($.inArray(m._private.data.id,scope.addIdRecord));
                    while ($.inArray(m._private.data.id + "_" + addId, scope.addIdRecord) !== -1 && addId < 100) addId++;
                    scope.addIdRecord.push(m._private.data.id + "_" + addId);
                    // console.log(addId);
                    // console.log(scope.addIdRecord);
                    var rel = m.edgesWith(n);
                    // console.log(rel);
                    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    cy.add(
                        [{
                            group: "nodes",
                            data: {
                                id: m._private.data.id + "_" + addId,
                                type: m._private.data.type,
                                name: m._private.data.name
                            },
                            position: {x: 100 + a, y: 100}
                        }]);
                    cy.$('#' + m._private.data.id + "_" + addId).addClass('added').addClass('highlighted');
                    cy.$('#' + m._private.data.id + "_" + addId).off("select")
                        .on('mouseover', function () {
                            cy.$('#' + m._private.data.id).trigger('mouseover');
                        }).on('mouseout', function () {
                        cy.$('#' + m._private.data.id).trigger('mouseout');
                    }).on('select', function () {
                        cy.$('#' + m._private.data.id).trigger('select');
                    });
                    // console.log(cy.$('#'+m._private.data.id+"_"+addId));
                    for (var i = 0; i < rel.length; i++) {
                        cy.add([
                            {
                                group: "edges",
                                data: {
                                    id: "e_" + addEId,
                                    source: m._private.data.id + "_" + addId,
                                    target: n._private.data.id,
                                    relation: m.edgesWith(n)[i]._private.data.relation
                                },
                            }]);
                        cy.$('#' + "e_" + addEId).addClass('added').addClass('highlighted');
                        addEId++;
                    }
                })
            }
        });
        var nhood2 = nhood.closedNeighborhood().difference(nhood).difference(node), secNum = 0;
        console.log(nhood2);
        nhood2.forEach(function (n) {
            if (n._private.group === "nodes") secNum++;
        });
        // console.log(secNum);
        num = 0;
        var secR = 200;
        nhood2.layout({
            name: 'preset',
            padding: 30,
            animate: true,
            animationDuration: layoutDuration,
            fit: false,
            positions: function (n) {
                num++;
                var Pos = {
                    x: node._private.data.orgPos.x + Math.sin(2 * Math.PI * (num - 1) / secNum) * secR,
                    y: node._private.data.orgPos.y - Math.cos(2 * Math.PI * (num - 1) / secNum) * secR
                };
                return Pos;
            },
            stop: function () {
                cy.animate({
                    fit: {
                        eles: nhood2,
                        padding: 30
                    },
                    duration: 500,
                    complete: function () {
                        // if (node._private.data.superNum !== undefined)
                        //     showPack(superNodeShow[node._private.data.superNum], node);
                    }
                });

            }
        })
    }
});
                        }

               
                        function vpsc(nodes) {//to solve overlap
                            var rs = new Array(nodes.length);
                            //var dims = [];
                            nodes.forEach(function (r, i) {//???overlap????
                                var x = r.position().x, y = r.position().y, w = 90, h = 50;
                                //dims.push({x: x, y: y, w: w, h: h});
                                rs[i] = new cola.vpsc.Rectangle(x, x + w, y, y + h);
                                // console.log(i);
                                //console.log(rs[i]);
                            });
                            //undoStack.push(dims);
                            cola.vpsc.removeOverlaps(rs);
                            nodes.forEach(function (r, i) {
                                // console.log(i);
                                // console.log(rs[i]);
                                var t = rs[i];
                                r.animate(
                                    {
                                        position: {x: t.x, y: t.y}
                                    }, {
                                        duration: 100
                                    });
                            });
                        }

                        function clear() {
                            console.log("clear");
                            //console.log($('svg'));
                            // $('#circlePack svg').remove();
                            cy.$('.added').remove();


                                cy.panningEnabled(true);
                                cy.zoomingEnabled(true).delay(0,function () {
                                        cy.nodes().forEach(function (n) {
                                            n.animate({
                                                position: n.data('orgPos')
                                                // duration:layoutDuration
                                            });
                                        })
                                }).delay(500,function () {
                                    cy.animate({
                                        fit: {
                                            eles: cy.elements(),
                                            padding: layoutPadding
                                        },
                                        duration: 500,
                                        complete: function () {
                                            vpsc(cy.nodes());
                                        }
                                    });

                                });
                                cy.elements()
                                    .removeClass('highlighted')
                                    .removeClass('faded')
                                    .removeClass('detail')
                                    .removeClass('selected')
                                    // .removeClass('superShow')
                                    .removeClass('added')
                                    .removeClass('hover-highlight')
                                    .removeClass('hover-fade');
                                // invisibleNodes.remove();
                        }
                        function initCy(then) {
                            var crlInitNodePosition = 1;
                            // if(!!!then[0].data){
                            //     console.log(then);
                            //     console.log("data is null!");
                            // }
                            //scope.isGraphLoading = true;
                              console.log("then");
                              console.log(then);
                            // console.log(then[1]);
                           // var loading = document.getElementById('loading');
                            var expJson = then[0].data || then[0];
                            if(scope.firstInit){
                                console.log("firstInit!");
                                scope.allElements = jQuery.extend(true,{},then);
                                scope.firstInit = 0;
                            }
                            console.log(scope.allElements);
                            var styleJson = then[1];
                            var elements = jQuery.extend(true,{},expJson.elements || expJson);
                            // for(var j=0;j<elements.nodes.length;j++){
                            //     //if(j === elements.nodes.length-1)
                            //         elements.nodes[j].data.name=eval(elements.nodes[j].data.name);
                            // }
                            scope.$broadcast("graphElements",elements);
                            //console.log("elements nodes");
                             console.log(elements);
                            // console.log(elements.return);
                            if(elements.return == 1){
                                $('#errorModal').modal('toggle');
                            };
                            console.log("levelMode = "+scope.levelMode);
                            console.log(scope.allElements);
                            if(scope.levelMode == true){
                                var i=0;
                                while(i<elements.edges.length){
                                     // console.log("in elements");
                                    if(!!elements.edges[i].data.level && elements.edges[i].data.level == 2){
                                        elements.edges.splice(i,1);
                                         // console.log('splice');
                                    }else i++;
                                }
                            }
                             console.log(elements);
                            //var elements = expJson.elements;
                            //console.log("elements nodes");
                            // console.log(elements);
                            // var l=0;
                            // elements.edges.forEach(function (e) {
                            //     console.log(e.data.level);
                            //    // console.log(l++);
                            //     // n.data.name=eval(n.data.name);
                            // });
                            // console.log("__________________");
                            // console.log(elements);
                            var test=elements.nodes.sort(function (a, b) {
                                // console.log(a.data.name>b.data.name);
                                if(a.data.name!=b.data.name){
                                    // console.log(a.data.center);
                                    // console.log(b.data.center);
                                if (a.data.name > b.data.name) return -1;
                                else  if (a.data.name < b.data.name) return 1;
                                }else{
                                    // console.log(a.data.center);
                                    // console.log(b.data.center);
                                    // console.log(a.data.center-b.data.center);
                                    if(a.data.center=="yes") {
                                        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                       // console.log(a.data);
                                        return -1;}
                                    if(b.data.center=="yes") {
                                        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                        // console.log(b.data);
                                        return 1;}
                                    return 0;
                                }
                            });
                            // console.log(test);

                            // console.log(test);
                            // console.log(elements);
                            var superNode = [];
                            var edgeIdChangeCol = [];
                            var num = 0, i = 0;
                            //console.log(elements.nodes);
                            //console.log(elements.nodes[1].data.name);

                            while (i < elements.nodes.length - 1) {
                                var nodeCol = [], firAdded = 0;
                                //elements.nodes[i].data.name=eval(elements.nodes[i].data.name);
                                // console.log(elements.nodes[i]);
                                // console.log(i);
                                while (!!elements.nodes[i].data.name &&!!elements.nodes[i+1]&&elements.nodes[i].data.name == elements.nodes[i + 1].data.name) {
                                    var oldOne = elements.nodes[i + 1].data,
                                        newOne = elements.nodes[i].data;
                                    //console.log(oldOne);
                                    // console.log(oldOne.id+"==?"+newOne.id);
                                    if (oldOne.id !== newOne.id)
                                        edgeIdChangeCol.push({
                                            oldId: oldOne.id,
                                            newId: newOne.id
                                        });
                                    //console.log(edgeIdChangeCol);
                                    elements.nodes[i + 1].data.id = elements.nodes[i].data.id;
                                    if (!firAdded) {
                                        elements.nodes[i].data.isSuper = 1;
                                        elements.nodes[i].data.superNum = num;
                                        num++;
                                        nodeCol.push(elements.nodes[i]);
                                        firAdded = 1;
                                    }
                                    elements.nodes[i + 1].data.isSuper = 1;
                                    nodeCol.push(elements.nodes[i + 1]);
                                    i++;
                                };
                                i++;
                                if (firAdded) superNode.push(nodeCol);
                            };
                            //console.log(edgeIdChangeCol);
                            //console.log(superNode);
                            elements.edges.forEach(function (e) {
                                edgeIdChangeCol.forEach(function (g) {
                                    //console.log(g.oldId+'==?'+g.newId);
                                    if (g.oldId === e.data.source) {
                                        e.data.source = g.newId;
                                        //console.log(g.oldId+"source is old!");
                                    };
                                    if (g.oldId === e.data.target) {
                                        e.data.target = g.newId;
                                        //console.log(g.oldId+"target is old!");
                                    };
                                })
                            });
                            elements.edges.sort(function (a, b) {
                                if (a.data.source !== b.data.source) {
                                    if (a.data.source > b.data.source) return 1;
                                    else if (a.data.source < b.data.source) return -1;
                                    else return 0;
                                } else {
                                    if (a.data.target > b.data.target) return 1;
                                    else if (a.data.target < b.data.target) return -1;
                                    else return 0;
                                }
                            });
                            //console.log(elements.edges);

                            i = elements.edges.length - 2;
                            while (i > -1) {
                                // console.log(elements.edges[i].data.level);
                                if (!!elements.edges[i+1] && elements.edges[i].data.source === elements.edges[i + 1].data.source) {
                                    if (elements.edges[i].data.target === elements.edges[i + 1].data.target) {
                                        elements.edges.splice(i + 1, 1);
                                    };
                                };
                                 if (!!elements.edges[i] && elements.edges[i].data.source == elements.edges[i].data.target) {
                                     // console.log(elements.edges[i].data.source);
                                     // console.log(elements.edges[i].data.target);
                                     elements.edges.splice(i , 1);
                                 };
                                i--;
                            };
                            var superNodeShow = [], sizeNum = 50;
                            superNode.forEach(function (n) {
                                var showNode = {
                                    name: " ",
                                    children: []
                                };
                                n.forEach(function (m) {
                                    var child = {
                                        name: m.data.name,
                                        size: sizeNum
                                    };
                                    showNode.children.push(child);
                                })
                                superNodeShow.push(showNode);
                            });
                            //console.log(superNodeShow);
                            // console.log(elements);

                            //loading.classList.add('loaded');

                            //console.log(elements.edges);
                            scope.filterEdgeItems = [];
                            elements.edges.forEach(function (e) {
                                //console.log(e.data.relation);
                                //console.log(scope.filterItems.indexOf(e.data.relation));
                                if(scope.filterEdgeItems.indexOf(e.data.relation) == -1)
                                    scope.filterEdgeItems.push(e.data.relation);
                            });
                            //console.log(scope.filterEdgeItems);
                            scope.filterNodeItems = [];
                            scope.nItemsCh = {
                                "disease":"疾病",
                                "symptom":"症状",
                                "lab":"辅助检查",
                                "medicine":"药品",
                                "fclass":"一级科室",
                                "sclass":"二级科室",
                                "fbody":"一级部位",
                                "sbody":"二级部位",
                                "dclass":"科室"
                            };
                            elements.nodes.forEach(function (e) {
                                //console.log(e.data.relation);
                                //console.log(scope.filterItems.indexOf(e.data.relation));
                                console.log(e);
                                if(scope.filterNodeItems.indexOf(e.data.type) == -1)
                                    scope.filterNodeItems.push(e.data.type);
                            });
                            //console.log(scope.filterNodeItems);


                            scope.isGraphLoading = false;
                            $('#circlePack svg').remove();
                            var cy = window.cy = cytoscape({
                                container: document.getElementById('cy'),
                                layout: {
                                    name: 'cola',
                                    animate: true, // whether to show the layout as it's running
                                    refresh: 1, // number of ticks per frame; higher is faster but more jerky
                                    maxSimulationTime: 1000, // max length in ms to run the layout
                                    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
                                    fit: true, // on every layout reposition of nodes, fit the viewport
                                    padding: 30, // padding around the simulation
                                    infinite: false,
                                    //boundingBox: {x1:0,y1:0,x2:1,y2:1}, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
                                    //boundingBox:{ x1: 0, y1: 0, w: 500, h: 500 },
                                    // layout event callbacks
//  ready: function(){}, // on layoutready
                                    // stop: function(){}, // on layoutstop

                                    // positioning options
                                    randomize: true, // use random node positions at beginning of layout
                                    avoidOverlap: false, // if true, prevents overlap of node bounding boxes
                                    handleDisconnected: false, // if true, avoids disconnected components from overlapping
                                    nodeSpacing: function( node ){ return 0; }, // extra spacing around nodes
                                    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
                                    // different methods of specifying edge length
                                    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
                                    edgeLength: undefined, // sets edge length directly in simulation
                                    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
                                    edgeJaccardLength: undefined, // jaccard edge length in simulation
                                    stop: function () {
                                        // console.log(cy.nodes());
                                        // console.log(cy.edges());
                                        console.log("layout stop!");
                                        // console.log(cy.elements());
                                        // console.log(cy.nodes());
                                        // console.log(cy.edges());
                                        // console.log(store.get("currentId"));
                                        // console.log(cy.$("#"+store.get("currentId")));
                                        // console.log(cy.nodes("[center='yes']"));

                                        //console.log(historyID);
                                        //console.log(cy.nodes("[center='yes']"));
                                         var queryNode;
                                        // var storeInit = function () {
                                        //     console.log(store);
                                        //     store.clear();   // store param init
                                        //     store.set("hID",0);
                                        //     store.set("hIDmedicine",0);
                                        //     store.set("hIDlab",0);
                                        //     store.set("hIDsymptom",0);
                                        //     store.set("hIDdisease",0);
                                        // }
                                        // storeInit();

                                        if(cy.nodes("[center='yes']").length>0) {
                                            vpsc(cy.nodes());
                                            cy.autoungrabify(false);//to grab
                                            queryNode = cy.nodes("[center='yes']")[0]._private.data;
                                            var queryItem = [queryNode.id, queryNode.name];
                                            // console.log((queryItem[0]));
                                            // console.log(store.has(queryItem[0]));
                                            var recordHistory = function (type) {
                                                type = type || "";
                                                if(store.has("hID"+type)){
                                                    // console.log("store has hID");
                                                }
                                                else store.set("hID"+type,0);
                                                var historyID=store.get("hID"+type);
                                                var flag = 1, num;
                                                for (var i = 0; i < 10; i++) {
                                                    if (!!store.get("historyItem" + type + (historyID + i) % 10) && store.get("historyItem" + type + (historyID + i) % 10).id === queryItem[0]) {
                                                        flag = 0;
                                                        num = (historyID + i) % 10;
                                                    }
                                                }
                                                if (flag) {
                                                    store.set("historyItem" + type + historyID, {
                                                        "id": queryItem[0],
                                                        "name": queryItem[1],
                                                        "searched": 1
                                                    });
                                                    historyID++;
                                                    historyID %= 10;
                                                    store.set("hID" + type, historyID);
                                                    // console.log("history added!");
                                                    scope.$emit("historyUpdate", 1);
                                                } else {
                                                    // console.log(store.getAll());
                                                    var temp = store.get("historyItem" + type + num);
                                                    for (var i = (num + 1) % 10; i != historyID; i = (i + 1) % 10) {
                                                        store.remove("historyItem" + type + (i + 9) % 10);
                                                        store.set("historyItem" + type + (i + 9) % 10, store.get("historyItem" + type + i));
                                                    };
                                                    store.remove("historyItem" + type + (historyID + 9) % 10);
                                                    store.set("historyItem" + type + (historyID + 9) % 10, temp);
                                                    // console.log(store.getAll());
                                                    scope.$emit("historyUpdate", 1);
                                                };
                                            }
                                            recordHistory();
                                            recordHistory(queryNode.type);
                                            console.log(store.getAll());
                                        };


                                        //console.log("layout init stop!");

                                    },
                                    ready: function () {
										if(cy.nodes("[center='yes']").length === 1) {
											var centerNode = cy.nodes("[center='yes']")[0],
												count = 0,
												xSum = 0,
												ySum = 0;
											cy.nodes().difference(centerNode).forEach(function(n){
												count++;
												xSum += n._private.position.x;
												ySum += n._private.position.y;
											});
											centerNode._private.position.x = xSum/count;
											centerNode._private.position.y = ySum/count;
											console.log(centerNode);
											console.log([xSum/count,ySum/count]);
											console.log(cy.nodes("[center='yes']"));
											console.log(cy.nodes().difference(cy.nodes("[center='yes']")));
										}
                                        console.log("layout ready!");

                                        $('#errorModal').modal('hide');
                                        scope.filter.isFilterShow = true;
                                        // console.log("filter.isFilterShow = "+scope.filter.isFilterShow);
                                        // console.log("isGraphLoading = "+scope.isGraphLoading);
                                         // console.log("cola layout ready! and isGraphLoading =");

                                         //console.log(cy.nodes());

                                        //scope.$broadcast('graphLoaded',1);

                                       // clear();
                                    },
                                    // iterations of cola algorithm; uses default values on undefined
                                    unconstrIter: 20, // unconstrained initial layout iterations
                                    userConstIter: 0, // initial layout iterations with user-specified constraints
                                    allConstIter: 10, // initial layout iterations with all constraints including non-overlap
                                    //center points controll
                                    r: 75,//radius of center points
                                    centerPos: {x: window.innerWidth / 2.8, y:375},
                                    //centerPos: {x: window.innerWidth / 3.5, y: window.innerHeight / 2.5},//center position
                                    gravity: 0//0.35
                                },
                                style: styleJson,
                                elements: elements,
                                motionBlur: true,
                                selectionType: 'single',
                                boxSelectionEnabled: false,
                                autoungrabify: true
                            });
                                    cy.panzoom({});

                            scope.$on('getDiseaseIds',function (e,item) {
                                cy.destroy();
                                scope.isSearchingDisease = true;
                                scope.isSearchingMedicine = false;
                            });
                            scope.$on('getMedicineIds',function (e,item) {
                                cy.destroy();
                                scope.isSearchingDisease = false;
                                scope.isSearchingMedicine = true;
                            });
                            scope.$on('submitQuery', function (e, item) {
                                scope.isSearchingDisease = false;
                                scope.isSearchingMedicine = false;
                                cy.destroy();
                                $('#circlePack svg').remove();
                            });
                            scope.$on('getDiseaseIds', function (e, item) {
                                cy.destroy();
                                $('#circlePack svg').remove();
                            });
                            scope.$on('getMedicineIds', function (e, item) {
                                cy.destroy();
                                $('#circlePack svg').remove();
                            });
                            scope.$on('nodeMouseover',function (e,item) {
                                //console.log("network get mouseovered node id");
                                //console.log(item);
                                //console.log(cy.$('#'+item));
                                //console.log(edgeIdChangeCol);
                                edgeIdChangeCol.forEach(function (n) {
                                    if(n.oldId===item)
                                        item=n.newId;
                                });
                                var node= cy.$('#'+item);
                                    //node.style()["background-color"] = "#ffffff";
                                node.addClass("hoverd");
                               var i = 1;
                                while(cy.$('#'+item+'_'+i).length>0){
                                    cy.$('#'+item+'_'+i).addClass("hoverd");
                                    i++;
                                };
                                cy.elements().not(cy.$('.hoverd').closedNeighborhood().difference(cy.$('.filtered')).addClass('hover-highlight')).addClass('hover-fade');
                            });
                            scope.$on('nodeMouseleave',function (e,item) {
                                //console.log("network get mouseovered node id");
                                //console.log(item);
                                edgeIdChangeCol.forEach(function (n) {
                                    if(n.oldId===item)
                                        item=n.newId;
                                })
                                // console.log(cy.$('#'+item));
                                var node= cy.$('#'+item);
                                //node.style()["background-color"] = "#ffffff";
                                node.removeClass("hoverd");
                                var i = 1;
                                while(cy.$('#'+item+'_'+i).length>0){
                                    //console.log(cy.$('#'+node._private.data.id+'_'+i));
                                    cy.$('#'+item+'_'+i).removeClass("hoverd");
                                    i++;
                                };
                                cy.elements().removeClass('hover-fade').removeClass('hover-highlight');
                            })
                            cy.on('mouseover', 'node', function (n) {
                                var node = this;
                                node.addClass("hoverd");
                                console.log(node);
                                scope.$broadcast('nodeHovered',node._private.data.id);
                                $('#search').parent().css("display", "block");
                                var i=1;
                                // console.log(cy.$('#'+node._private.data.id+'_'+i));
                                while(cy.$('#'+node._private.data.id+'_'+i).length>0){
                                    // console.log(cy.$('#'+node._private.data.id+'_'+i));
                                    cy.$('#'+node._private.data.id+'_'+i).addClass("hoverd");
                                    i++;
                                };
                                cy.elements().not(cy.$('.hoverd').closedNeighborhood().addClass('hover-highlight')).addClass('hover-fade');
                                // $('#eleDetail').html("<pre><p>name:" + n.cyTarget._private.data.name + "</p>" +
                                //     "<p>type:" + n.cyTarget._private.data.type + "</p></pre>");
                                //console.log(node.renderedStyle());
                                //if(node.hasClass("selected")){
                                //  console.log(node._private.data.superNum);
                                //  if(node._private.data.superNum!==undefined)
                                //    showPack(superNodeShow[node._private.data.superNum],node);
                                //}
                            })
                            cy.on('mouseout', 'node', function (n) {
                                var node = this;
                                node.removeClass("hoverd");
                                scope.$broadcast('nodeNotHovered',node._private.data.id);
                                var i=1;
                                while(cy.$('#'+node._private.data.id+'_'+i).length>0){
                                    cy.$('#'+node._private.data.id+'_'+i);
                                    cy.$('#'+node._private.data.id+'_'+i).removeClass("hoverd");
                                    i++;
                                };
                                cy.elements().removeClass('hover-fade').removeClass('hover-highlight')
                            })

                            cy.on('select', 'node', function (e) {
                                //showPack();
                                  if (crlInitNodePosition) {//?????????position

                                cy.nodes().forEach(function (n) {
                                    n._private.data.orgPos = {
                                        x: n._private.position.x,
                                        y: n._private.position.y
                                    };
                                });


                                      crlInitNodePosition = 0;
                                  };

                                var node = this;
                                if(node._private.data.id.indexOf("_") !== -1) return 0;
                                node.addClass("selected");
                                // console.log("select");
                                // console.log(node.hasClass("highlighted"));
                                // console.log(node.hasClass("selected"));
                                var type = node._private.data.type;
                                if(event.ctrlKey===true){
                                    if(type=="disease"||type=="medicine"||type=="symptom"||type=="lab"){
                                    scope.isGraphLoading = true;
                                    //console.log(node._private.data.id);
									scope.item = node._private.data.id;
                                    initGraph(scope.item);
                                    cy.destroy();
                                    $('#circlePack svg').remove();
                                    };
                                }else{
                                    highlight(node, superNodeShow);
                                };
                            });

                            cy.on('tap',function (event) {
                                // console.log("tap!!!");
                                if(event.cyTarget === cy)
                                    clear();
                            })

                        }

                scope.edgeFilterClick = function (item) {
                    console.log("click test");
                    console.log(item);
                    console.log($("#" + item).is(":checked"));
                    // cy.edges().forEach(function (e) {
                    //     var rel = e.data('relation');
                    //     console.log(rel);
                    // });
                    var edges = cy.edges().filterFn(function (e) {
                        return e.data('relation') == item;
                    });
                    if(!$("#" + item).is(":checked")){
                        edges.addClass("filtered");
                        edges.connectedNodes().forEach(function (n) {
                            var isNodeDisplay = 0;
                           n.connectedEdges().forEach(function (e) {
                               if(!e.hasClass('filtered')){
                                   isNodeDisplay = 1;
                               }
                           });
                            if(isNodeDisplay === 0) n.addClass('filtered');
                        })
                    }else{
                        edges.removeClass("filtered");
                        edges.connectedNodes().removeClass('filtered');
                    }
                    console.log(cy.edges().filterFn(function (e) {
                        return e.data('relation') == item;
                    }));
                    console.log(scope);
                };

                scope.nodeFilterClick = function (item) {
                    console.log("click test");
                    console.log(item);
                    console.log($("#" + item).is(":checked"));
                    // cy.edges().forEach(function (e) {
                    //     var rel = e.data('relation');
                    //     console.log(rel);
                    // });
                    var nodes = cy.nodes().filterFn(function (e) {
                        return e.data('type') == item;
                    });
                    console.log($("#" + item));
                    if(!$("#" + item).is(":checked")){
                        nodes.connectedEdges().union(nodes).addClass("filtered");
                    }else{
                        nodes.connectedEdges().union(nodes).removeClass("filtered");
                    }
                    console.log(cy.nodes().filterFn(function (e) {
                        return e.data('type') == item;
                    }));
                    console.log(scope);
                };
                scope.edgeReverseClick = function () {
                    var itemCol = scope.filterEdgeItems;
                    for(var i=0;i<itemCol.length;i++){
                        var t = $("#"+itemCol[i])[0];
                        t.checked = !t.checked;
                        scope.edgeFilterClick(itemCol[i]);
                    }
                };
                scope.nodeReverseClick = function () {
                    var itemCol = scope.filterNodeItems;
                    for(var i=0;i<itemCol.length;i++){
                        var t = $("#"+itemCol[i])[0];
                        if(t.disabled == false){
                            t.checked = !t.checked;
                            scope.nodeFilterClick(itemCol[i]);
                        }
                    }
                };
                scope.allClickChoose={};
                scope.allClickChoose.edge = false;
                scope.allClickChoose.node = false;
                scope.allClickChoose.edgeAllClick =function () {
                    var itemCol = scope.filterEdgeItems;
                    for(var i=0;i<itemCol.length;i++){
                        var t = $("#"+itemCol[i])[0];
                        if(t.checked !== scope.allClickChoose.edge){
                            // console.log("!!!!!!");
                            // console.log(t.checked);
                            // console.log(scope.allClickChoose.edge);
                            t.checked = scope.allClickChoose.edge;
                            scope.edgeFilterClick(itemCol[i]);
                        };
                    };
                    scope.allClickChoose.edge = !scope.allClickChoose.edge;
                };
                scope.allClickChoose.showLevel2 = function () {
                    console.log("showLevel2");
                    console.log(cy);
                    cy.destroy();
                    scope.isGraphLoading = true;
                    scope.levelMode = !scope.levelMode;
                    $('#showLevel2_1')[0].checked = !scope.levelMode;
                    $('#showLevel2_2')[0].checked = !scope.levelMode;
                    console.log(scope.allElements);
                    initCy(scope.allElements);
                }
                scope.allClickChoose.nodeAllClick =function () {
                    var itemCol = scope.filterNodeItems;
                    for(var i=0;i<itemCol.length;i++){
                        var t = $("#"+itemCol[i])[0];
                        if(t.checked !== scope.allClickChoose.node){
                            // console.log("!!!!!!");
                            // console.log(t.checked);
                            // console.log(scope.allClickChoose.edge);
                            if(t.disabled == false){
                                t.checked = scope.allClickChoose.node;
                                scope.nodeFilterClick(itemCol[i]);
                            };
                        };
                    };
                    scope.allClickChoose.node = !scope.allClickChoose.node;
                };
                $('#refresh').on('click', function () {
                    cy.destroy();
                    if(scope.isSearchingDisease){
                        $('#searchDisease').trigger('click');
                    }else
                    if(scope.isSearchingMedicine){
                        $('#searchMedicine').trigger('click');
                    }else initGraph(scope.item);
                });
                $('#reset').on('click', function () {
                    //console.log("reset clicked");
                    cy.animate({
                        fit: {
                            eles: cy.elements(),
                            padding: layoutPadding
                        },
                        duration: layoutDuration
                    });
                });

                $rootScope.pageLoading = false;
                // setTimeout('$rootScope.pageLoading = false',5000);
            }
        };
    });
