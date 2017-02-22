
jQuery(function ($) {

    var scope = {};
    scope.curdate = new Date();
    scope.curdate.setHours(0, 0, 0, 0);
    console.log('now:' + scope.curdate);
    scope.config = {
        tabs: {
            name: 'tabs',
            active: 'tab_top',
            tabs: [
                { id: 'tab_top', text: '<i class="fa fa-home fa-lg"></i>' },
                { id: 'tab_kakeibo', text: '<i class="fa fa-table fa-lg"></i>' },
                { id: 'tab_graph', text: '<i class="fa fa-line-chart fa-lg"></i>' },
                { id: 'tab_setting', text: '<i class="fa fa-cog fa-fw fa-lg"></i>' }
            ],
            onClick: function (event) {
                console.log(`ok ${event.target}`);
            }
        },
        grid_top: {
            name: 'grid',
            header: 'List of Names',
            //multiSearch: true,
            show: {
                toolbar: true,
                footer: true,
                toolbarReload: false,
                toolbarColumns: false
                //toolbarSearch: true
            },
            searches: [
                { field: 'sdate', caption: 'date', type: 'date' }
            ],
            columns: [
                { field: 'sdate', caption: '日付', size: '80px', render: 'date:yyyy/mm/dd', editable: { type: 'date' } },
                { field: 'fname', caption: '費目', size: '10%' },
                { field: 'lname', caption: '内訳', size: '10%' },
                { field: 'product', caption: '品名', size: '10%' },
                { field: 'check', caption: '済', editable: { type: 'checkbox' }, size: '30px' },
                { field: 'income', caption: '収入', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'outgo', caption: '支出', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'balance', caption: '残高', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'email', caption: '備考', size: '30%' },
            ],
            records: [
                { recid: 1, sdate: "01/12/2017", fname: "Peter", lname: "Jeremia", income: 1000 },
                { recid: 2, fname: "Bruce", lname: "Wilkerson" }
            ]
        }
    };

    // タブ設定
    $('#tabs').w2tabs(scope.config.tabs);
    // 日付入力
    var input_date = $('#top_date');
    var now = scope.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
    input_date.w2field('date', { format: 'yyyy/mm/dd' }).val(now).change(function (e) {
        scope.curdate.setFullYear($(this).val().substr(0, 4));
        scope.curdate.setMonth($(this).val().substr(5, 2) - 1, $(this).val().substr(8, 2));
        scope.curdate.setHours(0, 0, 0, 0);
    });
    // 日付変更ボタン
    $('button[type="my-date"]').click(function () {
        var offset = ($(this).attr('id') === 'btn-l') ? -1 : 1;
        scope.curdate.setDate(scope.curdate.getDate() + offset);
        var now = scope.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
        $('#top_date').val(now);
    });
    // Top グリッド
    var top_grid = $('#top_grid');
    top_grid.w2grid(scope.config[top_grid.attr('config')]);
});
/*
var mymodule = angular.module('myApp', ['ngSanitize']);

mymodule.controller('MyController', ['$scope', function ($scope) {

    $scope.curdate = new Date();

    $scope.onclick = function (val) {
        $scope.curdate.setDate($scope.curdate.getDate() + val);
    };

    $scope.click_tab = function () {
        console.log("ok");
    };

    $scope.tablist = [
    ];

    $scope.grid_config = {
        name: 'grid',
        header: 'List of Names',
        //multiSearch: true,
        show: {
            toolbar: true,
            footer: true,
            toolbarReload: false,
            toolbarColumns: false
            //toolbarSearch: true
        },
        searches: [
            { field: 'sdate', caption: 'date', type: 'date' }
        ],
        columns: [
            { field: 'sdate', caption: '日付', size: '80px', render: 'date:yyyy/mm/dd', editable: { type: 'date' } },
            { field: 'fname', caption: '費目', size: '10%' },
            { field: 'lname', caption: '内訳', size: '10%' },
            { field: 'product', caption: '品名', size: '10%' },
            { field: 'check', caption: '済', editable: { type: 'checkbox' }, size: '30px' },
            { field: 'income', caption: '収入', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'outgo', caption: '支出', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'balance', caption: '残高', render: 'int', editable: { type: 'int' }, size: '10%' },
            { field: 'email', caption: '備考', size: '30%' },
        ],
        records: [
            { recid: 1, sdate: "01/12/2017", fname: "Peter", lname: "Jeremia", income: 1000 },
            { recid: 2, fname: "Bruce", lname: "Wilkerson" }
        ]
    }
}]);

mymodule
    .directive('myDate', function () {
        return {
            restrict: 'A',
            replace: true,
            template: '<input class="w2field dt" required value={{now}}>',
            link: function (scope, element, attrs) {

                var updateDate = function () {
                    var d = scope.curdate;
                    scope.now = d.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
                    element.w2field('date', { format: 'yyyy/mm/dd' });
                    console.log(scope.now);
                };
                //$.datepicker.setDefaults($.datepicker.regional['ja']);
                //element.datepicker();

                scope.$watch('curdate',
                    function (newValue, oldValue, scope) {
                        console.log(newValue);
                        updateDate();
                    });
            }
        }
    });

mymodule
    .directive('myTab2', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                name: '@',
                active: '=',
                tabs: '='
            },
            link: function (scope, element, attrs) {
                element.w2tabs({
                    name: scope.name,
                    active: scope.active,
                    tabs: scope.tabs
                });
            }
        }
    });

mymodule
    .directive('myToolbar', function () {
        return {
            link: function (scope, element, attrs) {
                $('#' + attrs.id).w2toolbar({
                    name: 'myToolbar',
                    items: [
                        {
                            type: 'html', id: 'item1', html: '<input class="w2field" my-date id="id_item1">'
                        }
                    ],
                    onRefresh: function (event) {
                        console.log('object' + event.target + ' is refreshed');
                        if (event.target == 'item1') {
                            // w2field in toolbar must be initialized during refresh
                            // see: https://github.com/vitmalina/w2ui/issues/886
                            event.onComplete = function (ev) {
                                $("#id_item1").w2field('date', { format: 'd.m.yyyy' });
                            };
                        }
                    }

                });

                w2ui['myToolbar'].on("refresh", function (event) {
                    console.log('object' + event.target + ' is refreshed');
                    if (event.target == 'item1') {
                        // w2field in toolbar must be initialized during refresh
                        // see: https://github.com/vitmalina/w2ui/issues/886
                        event.onComplete = function (ev) {
                            $("#id_item1").w2field('date', { format: 'd.m.yyyy' });
                        };
                    }

                });

                console.log(w2ui['myToolbar']);
            }
        }
    });

mymodule
    .directive('myTable2', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                config: '='
            },
            link: function (scope, element, attrs) {
                element.w2grid(scope.config);
            }
        }
    });

mymodule
    .directive('myTab', function () {
        return {
            require: '^^myTabPanel',
            restrict: 'E',
            replace: true,
            transclude: true,
            tmplate: '<div ngshow="show" ng-transclude></div>',
            scope: {
                title: '@'
            },
            link: function (scope, element, attrs, panelController) {
                panelController.AddTab(scope);
            }
        }
    });

mymodule
    .directive('myTabPanel', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                name: '@',
                active: '@'
            },
            teplate: '<div my-tab2 name="{{name}}"></div>',
            controller: ['$scope', function ($scope) {
                $scope.tabs = [];

                this.addTab = function (tab) {
                    $scope.tabs.push(tab);
                    if ($scope.tabs.length - 1 === Number($scope.active)) {
                        $scope.onselect(tab);
                    }
                };

                $scope.onselect = function (tab) {
                    angular.forEach($scope.tabs, function (t) {
                        t.show = false;
                        t.selected = false;
                    });
                    tab.show = true;
                    tab.selected = true;
                };
            }]
        }
    });    
*/
