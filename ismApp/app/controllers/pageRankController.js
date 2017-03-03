/**
 * Created by xiaoyu on 17-3-3.
 */
"use strict";
angular.module("app")
    .controller("pageRankController", pageRankController);
function pageRankController($scope, $rootScope) {
    var svg = d3.select("svg").call(d3.zoom().on("zoom", function () {
            svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
        })),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    d3.json("../../data/page_rank_dict.json", function(error, graph) {
        if (error) throw error;

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", function (d) {
                return Math.log(d.value + 1) / Math.log(100) * 5 + 2;
            })
            .attr("fill", function(d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function(d) {
                var str = "标题: " + d.title +
                        "\n类别: " + d.group +
                        "\n权值: " + d.value +
                        "\nURL: " + d.id;
                return str;
            });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }
        // var legendRectSize = 18;                                  // NEW
        // var legendSpacing = 4;
        // var legend = svg.selectAll('.legend')                     // NEW
        //     .data(color.domain())                                   // NEW
        //     .enter()                                                // NEW
        //     .append('g')                                            // NEW
        //     .attr('class', 'legend')                                // NEW
        //     .attr('transform', function(d, i) {                     // NEW
        //         var height = legendRectSize + legendSpacing;          // NEW
        //         var offset =  height * color.domain().length / 2;     // NEW
        //         var horz = 50;                       // NEW
        //         var vert = i * 50 +offset;                       // NEW
        //         return 'translate(' + horz + ',' + vert + ')';        // NEW
        //     });                                                     // NEW
        //
        // legend.append('circle')                                     // NEW
        //     .attr('r', legendRectSize)                          // NEW
        //     // .attr('height', legendRectSize)                         // NEW
        //     .style('fill', color)                                   // NEW
        //     .style('stroke', color);                                // NEW
        //
        // legend.append('text')                                     // NEW
        //     .attr('x', legendRectSize + legendSpacing)              // NEW
        //     .attr('y', legendRectSize / 2)              // NEW
        //     .text(function(d) { return d; });                       // NEW


        //********************* to add pan and zoom with svg-pan-zoom ****************************//
        function addPanzoom() {
            console.log("adding pan zoom");
            window.zoomTiger = svgPanZoom("#pageRank svg", {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: false,
                center: true,
                maxZoom: 25,
                minZoom: 0.3,
                dblClickZoomEnabled: false,
                mouseWheelZoomEnabled: true
            });
        }
        addPanzoom();

        //********************* to add pan and zoom  End  ****************************//

    });

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }


    $rootScope.pageLoading = false;

}
