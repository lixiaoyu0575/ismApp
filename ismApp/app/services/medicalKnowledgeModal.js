/**
 * Created by Wemakefocus on 2016/11/27.
 */
(function () {
    "use strict";

    angular
        .module("app")
        .service("medicalKnowledgeModal", medicalKnowledgeModal);

    function medicalKnowledgeModal($rootScope, $compile,$http) {
        // this.functionName = functionName;
        return {
            generateModal: generateModal,
            triggerModal: triggerModal
        };
        function triggerModal(type, id) {
            $rootScope.showMKModal(type, id);
        }
        function generateModal() {
            var list = [],
                movingPoint = 0; //used to recall history and add the history recalled as a new state
            console.log("it is medicalKnowledgeModal");
            $rootScope.showMKModal = function (type, id) {
                list.push([type, id]);
                movingPoint = list.length - 1;
                console.log(type);
                console.log(id);
                showModalFromArray();
            };
            $rootScope.showMKModalWithString = function (str) {
                var argsA = str.split("/");
                console.log(argsA);
                $rootScope.showMKModal(argsA[0], argsA[1]);
            };
            $rootScope.mkModalCrl = {};
            $rootScope.showMKModalBack = function () {
                movingPoint--;
                list.push(list[movingPoint]);
                showModalFromArray();
            };
            $rootScope.showMKModalForward = function () {
                movingPoint++;
                list.push(list[movingPoint]);
                showModalFromArray();
            };
            function showModalFromArray() {
                // console.log(list);
                // console.log(movingPoint);
                var argsA = list[list.length - 1],
                    type = argsA[0],
                    id = argsA[1];
                $http.get('http://59.110.52.133:3010/api/transfer/?q={"path":"/medknowledge/op","params":{%22Table%22:%22' + type +
                        '%22,%22Id%22:%22' + id + '%22}}').success(function (res) {
                    var data = res.Results,
                        textHtml = "",
                        height = 200,
                        width = 100,
                        temp = [],
                        modal,
                        key,
                        textA,
                        symTable,
                        i,
                        j,
                        k,
                        l,
                        imagelist,
                        imageurl,
                        video;
                    console.log(res);
                    modal = $rootScope.modal = {
                        "title": data.Name,
                        "table": data.Table,
                        "content": data.Content,
                        "isBackShow": true,
                        "isForwardShow": true,
                        "pdf": data.Pdf,
                        "video": data.Video,
                        "type": data.Type,
                        "isNavShow": true
                    };
                    if (modal.type === "Evidence" || modal.type === "Clinicalg" ||
                            modal.type === "Video" || modal.type === "Otherres") {
                        modal.isNavShow = false;
                    }
                    if (movingPoint === 0) {
                        modal.isBackShow = false;
                    }
                    if (movingPoint === list.length - 1) {
                        modal.isForwardShow = false;
                    }
                    console.log(modal);
                    modal.list = modal.content;
                    console.log(modal.list);
                    console.log("testModal");
                    if (modal.type === "Video") {
                        textHtml += "<div class='spinner'></div>";
                        textHtml += "<video src='http://1.85.37.136:9999/medknowledge/videoop/?q=" +
                            "{%22Table%22:%22Video%22,%22Vid%22:%22" + modal.video +
                            "%22}' width = '100%'  controls preload></video>";
                    }
                    for (key in modal.list) {

                        if(key==="temp"&&modal.list[key].length===0)
                        {continue;}
                        else if (modal.list.hasOwnProperty(key))
                        {
                            textHtml += "<h3 style='color: #3c8dbc;' id='" + key + "'>" + key + "</h3>";
                            textA = modal.list[key];
                            console.log(textA);
                            for (i = 0, l = textA.length; i < l; i++) {
                                console.log(key + "key0");
                                if (textA[i][0] === 0) {
                                    textHtml += textA[i][1];
                                }else if (textA[i][0] === 1) {
                                    textHtml += "<a ng-click=\"showMKModalWithString('" + textA[i][2] + "')\">" +
                                            textA[i][1] + "</a>";
                                }else if (textA[i][0] === 9) {
                                    textHtml += "</br>" + textA[i][1] + "<br>";
                                }else if (textA[i][0] === 10) {
                                    textHtml += "</br>";
                                }else if (textA[i][0] === 2) {
                                    textHtml += "</br>";
                                    if (textA[i][2] !== 0) {
                                        height = textA[i][2];
                                    }
                                    if (textA[i][3] !== 0) {
                                        height = textA[i][3];
                                    }
                                    imagelist = textA[i][1].split("/");
                                    imageurl = 'http://1.85.37.136:9999/medknowledge/imageop/?q={%22Iid%22:%22' + imagelist[1] + '%22}';
                                    if (modal.type === "Clinicalg") {
                                        textHtml += "<div><img alt='User Image' src=" + imageurl +
                                                " style='width: 100%'/></div>";
                                    }else {
                                        textHtml += "<div><img alt='User Image' src=" + imageurl + "></div>";
                                    }
                                    textHtml += "</br>";
                                }else if (textA[i][0] === 8) {
                                    textHtml += "<table class='table table-bordered table-striped'><thead><tr>" +
                                            "<th>可能疾病</th><th>伴随症状</th><th>就诊科室</th></tr></thead><tbody>";
                                    symTable = textA[i][1];
                                    console.log(symTable);
                                    for (j = 0; j < symTable.length; j++) {
                                        temp[0] = symTable[j]["可能疾病"];
                                        temp[1] = symTable[j]["伴随症状"];
                                        temp[2] = symTable[j]["就诊科室"];
                                        textHtml += "<tr><th><a ng-click=\"showMKModalWithString('" +
                                            temp[0].Id + "')\">" + temp[0].Name + "</a></th><th>  ";
                                        for (k = 0; k < temp[1].length; k++) {
                                            textHtml += "<a ng-click=\"showMKModalWithString('" +
                                                temp[1][k].Id + "')\">&nbsp;" + temp[1][k].Name + "&nbsp;</a>";
                                        }
                                        textHtml += "  </th><th>" + temp[2] + "</th></tr>";
                                    }
                                }else if (textA[i][0] === "table") {
                                    // console.log(textA[i][1]);
                                    textHtml += textA[i][1];
                                }
                                if (i === l - 1) {//to deal with the difference between angular compile and html parse
                                    textHtml += "<p></p>";
                                }
                            }
                        }
                    }
                    console.log(textHtml);
                    console.log($compile(textHtml)($rootScope));
                    angular.element("#modalText").html($compile(textHtml)($rootScope));
                    // $rootScope.$apply();
                    $("#medicalKnowledgeModal").modal("show");
                    if (modal.type === "Video") {
                        video = $("VIDEO");
                        video[0].addEventListener("canplaythrough", function () {
                            $(".spinner").removeClass("spinner");
                        });
                        $("#medicalKnowledgeModal").on("hidden.bs.modal", function () {
                            // console.log("modal hidden");
                            video[0].pause();
                        });
                    }
                });
            }
        }
    }

})();

