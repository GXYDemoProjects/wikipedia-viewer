/**
 * Created by gxy on 2017/7/3.
 */
import angular from 'angular';
import '../style/app.scss'

const wikiController = function($http){
  this.searchItems = [];
  this.state = 'icon';
  this.getRandom = function () {
    let randomUrl;
    $http({
      method:'get',
      url:'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?'
    }).then(
      (response) => {
        console.log('response.data:',response.data);
        let pageId;
        for(let item in response.data.query.pages) {
          pageId = response.data.query.pages[item].pageid;
          console.log('pageId:',pageId);
        }
        $http({
          method: 'get',
          url:`http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${pageId}&inprop=url&format=json&callback=?`
        }).then(
          (response2) => {
            console.log('response2:',response2);
            for(let item in response2.data.query.pages) {
              randomUrl = response2.data.query.pages[item].fullurl;
            }
          },
          (error2) => {
            console.log('error2:',error2);
          }
        )
      },
      (error) => {
        console.log('error:',error);
      }
    );
    console.log('randomUrl:',randomUrl);
    window.open(randomUrl);
  };
  this.initSearch = function () {
    this.state = 'search';
  };
  this.formatUrl = (queryStr) => {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch';
    const nums = 10;
    const format = 'jsonfm';
    return `${baseUrl}&search=${queryStr}&limit=${nums}&namespace=0&format=${format}`;
  };
  this.formatSearchResult = (items) => {
    const res = [];
    // 1 for name 2 for description 3 for href
    items[1].forEach((item) => res.push({name:item}));
    items[2].forEach((item,index) => res[index].desc = item);
    items[3].forEach((item,index) => res[index].href = item);
    return res;
  };

  this.getRandom = function () {

  };
  this.search = function () {
    const queryStr = this.searchStr;
    $http({
      method: 'get',
      url: this.formatUrl(queryStr),
    }).then(
      (response) => {
        console.log('response.data:',response.data);
        this.searchItems = this.formatSearchResult(response.data);
      },
      (error) => {
        console.log(error);
      }
    )
  };

  this.cancel = function () {
    this.searchItems = [];
    this.state = 'icon';
  }
};

const MODULE_NAME = 'app';
angular.module(MODULE_NAME,[])
.controller('wikiController',['$http',wikiController]);

export default MODULE_NAME;