/**
 * Created by gxy on 2017/7/3.
 */
import angular from 'angular';
import $ from 'jquery';
import ngAnimate from 'angular-animate';
import '../style/app.scss';


const app = angular.module('WikiApp', [ngAnimate]);
app.controller('MainCtrl', function ($scope, $http, $timeout, $sce) {
  var form = $('form');
  var close = $('.eks');
  var input = $('input');
  var search = $("#search");
  var help = $("#help");

  $scope.results = [];

  close.on('click', function () {
    form.toggleClass('open');

    if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined') {
      search.toggleClass('fullHeight');
      help.toggleClass('hide');
      $scope.searchTxt = '';
    }
    $scope.results = [];
    $scope.$apply();
  });

  input.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    if (form.hasClass('open')) {
      input.focus();
    } else {
      return;
    }
  });

  $scope.search = function () {
    $scope.results = [];
    help.addClass('hide');
    search.removeClass('fullHeight');
    var title = input.val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';

    $.ajax({
      url: api + title + cb,
      jsonp: 'callback',
      dataType: 'jsonp',
      xhrFields: {
        withCredentials: true
      }
    }).done(function (data) {
      console.log('data:',data);
      var results = data.query.pages;
      $.each(results, function (k, v) {
        console.log('k:',k);
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
      $scope.$apply();
    });
  };
});

