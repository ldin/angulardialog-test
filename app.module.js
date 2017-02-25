'use strict';

angular.module('dialogApp', []);

angular
    .module('dialogApp')
    .controller('dialogCtrl',dialogCtrl);
angular
    .module('dialogApp')

    .directive('ngConfirmClick', [
      function(){
        return {
          priority: -1,
          restrict: 'A',
          link: function(scope, element, attrs){
            element.bind('click', function(e){
              var message = attrs.ngConfirmClick;

              if(message && !confirm(message)){
                e.stopImmediatePropagation();
                e.preventDefault();
              }
            });
          }
        }
      }
    ]);


function dialogCtrl($scope, $timeout, $window){

  var fixHeight = document.getElementById("fixHeight");

  $scope.msgNew = '';
  $scope.lastId = 0;
  $scope.templateMsg=[
    'Hi!',
    'What did you say?',
    'Do not understand you',
    'Have a nice day',
    "Don't worry about it",
    'I do not speak English',
    'How do you say ... in English?',
    'I understand',
    "I don't understand",
    "You're going the wrong way"
  ];

  $scope.dialog={};

  $scope.msgSent = function(){
    if(angular.equals("", $scope.msgNew))return;

    var text = $scope.msgNew;
    if(text)
    addmsg(0, text);
    $scope.msgNew = '';

    $timeout($scope.msgFake, 1000);

  }

  $scope.msgFake = function(){
    var text = $scope.templateMsg[Math.floor(Math.random()*($scope.templateMsg.length+1))];
    addmsg(1, text);
  };

  $scope.msgDell = function(id){
    $scope.dialog[id].dell = 1;
  };

  $scope.deleteAll = function(){
    $scope.dialog = {};
    $scope.lastId = 0;
  };

  //(function init(){
  //  for(var i=1; i<10; i++)$timeout($scope.msgFake, 1000);
  //})();

  var addmsg = function(type,text){
    $scope.lastId += 1;
    $scope.dialog[$scope.lastId] = {
      id:$scope.lastId,
      name:type==0?'I':'Opponent',
      type:type,
      date:new Date(),
      txt:text,
      dell:0
    };

    fixHeight.scrollTop = fixHeight.scrollHeight;
  }

  $scope.alert = function(txt){
    $window.alert(txt);
  }


};
