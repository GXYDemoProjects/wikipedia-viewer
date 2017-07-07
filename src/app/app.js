/**
 * Created by gxy on 2017/7/3.
 */
import angular from 'angular';
import $ from 'jquery';
import '../style/app.scss';


const app = angular.module('WikiApp', []);
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  const form = $('form');
  const close = $('.eks');
  const input = $('input');
  const search = $('#search');
  const help = $('#help');

  $scope.results = [];

  close.on('click', () => {
    form.toggleClass('open');

    if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined') {
      search.toggleClass('fullHeight');
      help.toggleClass('hide');
      $scope.searchTxt = '';
    }
    $scope.results = [];
    $scope.$apply();
  });

  input.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
    if (form.hasClass('open')) {
      input.focus();
    }
  });

  $scope.search = function () {
    $scope.results = [];
    help.addClass('hide');
    search.removeClass('fullHeight');
    const title = $scope.searchTxt;
    const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    const cb = '&callback=JSON_CALLBACK';
    const page = 'https://en.wikipedia.org/?curid=';

    $.ajax({
      url: api + title + cb,
      jsonp: 'callback',
      dataType: 'jsonp',
      xhrFields: {
        withCredentials: true,
      },
    }).done((data) => {
      const results = data.query.pages;
      $.each(results, (k, v) => {
        $scope.results.push({ title: v.title, body: v.extract, page: page + v.pageid });
      });
      $scope.$apply();
    });

    /* $http.get(api + title + cb, {
     withCredentials: true,
     }).then((response) => {
     const data = response.data;
     const results = data.query.pages;
     angular.forEach(results, (k, v) => {
     console.log('sucess:',sucess);
     $scope.results.push({ title: v.title, body: v.extract, page: page + v.pageid });
     });
     // $scope.$apply();
     }, (error) => {
     console.log('error:', error);
     });*/
  };
}]);

