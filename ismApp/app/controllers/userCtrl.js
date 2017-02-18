/**
 * Created by think on 2017/1/18.
 */
'use strict';
(function(){
angular.module('app').controller('userCtrl', userCtrl);
    userCtrl.$inject=['$location',"authentication","getUsers","$rootScope","$http","$scope"];
    function userCtrl($location,authentication,getUsers, $rootScope,$http,$scope) {
    var vm = $scope.vm = {};
    vm.page = {
        size: 5,
        index: 1
    };
    vm.sort = {
        column: 'id',
        direction: -1,
        toggle: function(column) {
            if (column.sortable === false)
                return;

            if (this.column === column.name) {
                this.direction = -this.direction || -1;
            } else {
                this.column = column.name;
                this.direction = -1;
            }
        }
    };

        vm.Authority=["normal","administrator"];
    // 构建模拟数据
    vm.columns = [
        {
            label: '姓名',
            name: 'name',
            type: 'string'
        },
        {
            label: '电子邮箱',
            name: 'email',
            type: 'string'
        },
        {
            label: '权限',
            name: 'authority',
            type: 'string'
        },

        {
            label: '操作',
            name: 'actions',
            sortable: false
        }
    ];

        vm.items = [];
        vm.ChangedItems=[];
        vm.NewUser={};
        vm.SelectUser={};

        vm.ShowUsers=function(){
            vm.formError = "";
            console.log(getUsers);
            console.log(getUsers.getMyUser);
           getUsers.getMyUser().error(function(err){
                vm.formError = err.message;
                console.log(vm.formError);
            }).then(function(res){
                console.log(res);

               vm.items=res.data;
               console.log(vm.items);
               //console.log(res.data);
               console.log(res.data.length);
               console.log(vm.items.length);
            });
        };

        vm.SelectedUser=function(item){
            vm.SelectUser=item;
            console.log(item);
        };

        vm.PostUsers=function(){
            var ChangedUser={};
            ChangedUser.data=[];
            vm.ChangedItems.forEach(function(user){
                var UserObj={};
                UserObj.Info=user;
                ChangedUser.data.push(UserObj);
            });
            console.log(ChangedUser);
            getUsers.postMyUser(ChangedUser)
        .then(function(res){
            console.log(res);
        });
            vm.ChangedItems=[];
        };

        vm.DeleteUser=function(user){
            $(".modal-backdrop").hide();
            vm.items= _.reject(vm.items,function(item){
                return user.name===item.name;
            });
            getUsers.deleteUser(user).then(function(res){
                console.log(res);
            });
        };


        vm.ShowUsers();
        //vm.PostUsers();

        vm.CreateNewUser=function(){
            vm.items.push(vm.NewUser);
            console.log(vm.NewUser);
            authentication.register(vm.NewUser).then(function(res){
                console.log(res);
                vm.NewUser={};
            });
        };


        vm.ShowItems=function(){
            console.log(vm.ChangedItems);
        };

        vm.AddChangedItems=function(item){
            if(vm.ChangedItems.length===0){
                vm.ChangedItems.push(item);
            }
            else{
            for (var i=0;i<vm.ChangedItems.length;i++)
            {
                if (item.email===vm.ChangedItems[i].email)
                {
                    vm.ChangedItems[i].authority=item.authority;
                    break;
                }
                if(i===vm.ChangedItems.length-1)
                {
                    vm.ChangedItems.push(item);
                }
            }}
        };
        //console.log(vm.items);
    // 供页面中使用的函数
    vm.age = function(birthday) {
        //return moment().diff(birthday, 'years');
    };


    /*var MAX_NUM = 10 * 1000;
    function rand(min, max) {
        return min + Math.round(Math.random() * (max-min));
    }
    for (var i = 0; i < MAX_NUM; ++i) {
        var id = rand(0, MAX_NUM);
        vm.items.push({
            id: i + 1,
            name: 'Name' + id, // 字符串类型
            followers: rand(0, 100 * 1000 * 1000), // 数字类型
            summary: '这是一个测试' + i,
            income: rand(1000, 100000) // 金额类型
        });
    }*/
}})();