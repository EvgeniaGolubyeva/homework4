"use strict";function navbarDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/navbar.html"}}function footerDirective(){return{scope:!1,restrict:"E",templateUrl:"views/partial/footer.html"}}function priceRangeDirective(){return{restrict:"E",templateUrl:"views/partial/priceRange.html",scope:{minPrice:"@",maxPrice:"@",lowPrice:"=",highPrice:"="},link:function(a,b){a.minPrice=a.minPrice||0,a.maxPrice=a.maxPrice||500,a.lowPrice=a.lowPrice||a.minPrice,a.highPrice=a.highPrice||a.maxPrice;var c=angular.element(b).find('div[class="priceSlider"]');c.slider({min:a.minPrice,max:a.maxPrice+1,values:[a.lowPrice,a.highPrice],range:!0,slide:function(b,c){return a.$apply(function(){a.lowPrice=c.values[0],a.highPrice=c.values[1]})}}),a.$watch("lowPrice",function(b){b<a.highPrice&&c.slider("values",[b,a.highPrice])}),a.$watch("highPrice",function(b){b>a.lowPrice&&c.slider("values",[a.lowPrice,b])})}}}var auctionApplication=angular.module("auction",["ngRoute"]);auctionApplication.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeController",title:"Home",resolve:HomeController.resolve}).when("/search",{templateUrl:"views/search.html",controller:"SearchController",title:"Search",resolve:SearchController.resolve}).when("/product/:id",{templateUrl:"views/product.html",controller:"ProductController",title:"Product",resolve:ProductController.resolve}).otherwise({redirectTo:"/"})}]),auctionApplication.run(["$rootScope",function(a){a.$on("$routeChangeStart",function(b,c){a.title=c.title})}]);var HomeController=function(){function a(a,b){this.featuredProducts=a,this.$scope=b,this.$scope.model=this}return a.$inject=["featuredProducts","$scope"],a.resolve={featuredProducts:["ProductService",function(a){return a.getFeaturedProducts().then(function(a){return a})}]},a}();angular.module("auction").controller("HomeController",HomeController);var SearchController=function(){function a(a,b){this.searchProducts=a,this.$scope=b,b.model=this}return a.$inject=["searchProducts","$scope"],a.resolve={searchProducts:["ProductService",function(a){return a.getSearchProducts().then(function(a){return a})}]},a}();angular.module("auction").controller("SearchController",SearchController);var ProductController=function(){function a(a,b){this.product=a,this.$scope=b,this.$scope.model=this}return a.$inject=["product","$scope"],a.resolve={product:["ProductService","$route",function(a,b){return a.getProduct(b.current.params.id).then(function(a){return a})}]},a}();angular.module("auction").controller("ProductController",ProductController);var auction;!function(a){!function(a){var b=function(){function a(a,b,c){var d=this;this.$http=a,this.$q=b,this.$log=c,this.FEATURED_PRODUCTS_FILE="data/featured.json",this.SEARCH_PRODUCTS_FILE="data/search.json",this.getFeaturedProducts=function(){return d.getDataFromJSON(d.FEATURED_PRODUCTS_FILE)},this.getSearchProducts=function(){return d.getDataFromJSON(d.SEARCH_PRODUCTS_FILE)},this.getProduct=function(a){return d.$q.all([d.getFeaturedProducts(),d.getSearchProducts()]).then(function(b){var c=b[0].concat(b[1]),e=c.filter(function(b){return b.id==a});return 1==e.length?e[0]:d.$q.reject("Single product with specified id is not found")},function(a){return d.$q.reject(a)})},this.getDataFromJSON=function(a){return d.$http.get(a).then(function(a){return a.data.items},function(b){return d.$log.error("Can not load file "+a),d.$q.reject(b)})}}return a.$inject=["$http","$q","$log"],a}();a.ProductService=b,angular.module("auction").service("ProductService",b)}(a.service||(a.service={}));a.service}(auction||(auction={})),angular.module("auction").directive("auctionNavbar",navbarDirective),angular.module("auction").directive("auctionFooter",footerDirective),angular.module("auction").directive("auctionPriceRange",["$timeout",priceRangeDirective]);