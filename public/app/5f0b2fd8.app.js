"use strict";angular.module("tbApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap"]).constant("Urls",{client:"/assets/images/",server:"localhost:9000/server/img"}).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,b,c,d){b.otherwise("/"),c.html5Mode(!0),d.interceptors.push("authInterceptor")}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(a,b,c,d){return{request:function(a){return a.headers=a.headers||{},c.get("token")&&(a.headers.Authorization="Bearer "+c.get("token")),a},responseError:function(a){return 401===a.status?(d.path("/login"),c.remove("token"),b.reject(a)):b.reject(a)}}}]).run(["$rootScope","$location","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,d){c.isLoggedIn(function(a){d.authenticate&&!a&&b.path("/login")})})}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginCtrl"}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupCtrl"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsCtrl",authenticate:!0})}]),angular.module("tbApp").controller("LoginCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.login=function(d){a.submitted=!0,d.$valid&&b.login({email:a.user.email,password:a.user.password}).then(function(){c.path("/")})["catch"](function(b){a.errors.other=b.message})},a.loginOauth=function(a){d.location.href="/auth/"+a}}]),angular.module("tbApp").controller("SettingsCtrl",["$scope","User","Auth",function(a,b,c){a.errors={},a.changePassword=function(b){a.submitted=!0,b.$valid&&c.changePassword(a.user.oldPassword,a.user.newPassword).then(function(){a.message="Password successfully changed."})["catch"](function(){b.password.$setValidity("mongoose",!1),a.errors.other="Incorrect password",a.message=""})}}]);var App=angular.module("tbApp");App.controller("SignupCtrl",["$scope","Auth","$location","$window",function(a,b,c,d){a.user={},a.errors={},a.register=function(d){a.submitted=!0,console.log(d),d.$valid&&b.createUser({firstName:a.user.firstName,lastName:a.user.lastName,email:a.user.email,password:a.user.password,dateOfBirth:d.dateOfBirth.$$lastCommittedViewValue,gender:d.gender.$$lastCommittedViewValue}).then(function(){c.path("/")})["catch"](function(b){b=b.data,a.errors={},angular.forEach(b.errors,function(b,c){d[c].$setValidity("mongoose",!1),a.errors[c]=b.message})})},a.loginOauth=function(a){d.location.href="/auth/"+a},a.disabled=function(a,b){return"day"===b&&(0===a.getDay()||6===a.getDay())},a.maxDate=new Date,a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0},a.dateOptions={formatYear:"yyyy",startingDay:1},a.format="dd-MMMM-yyyy";var e=new Date;e.setDate(e.getDate()+1);var f=new Date;f.setDate(e.getDate()+2),a.events=[{date:e,status:"full"},{date:f,status:"partially"}],a.getDayClass=function(b,c){if("day"===c)for(var d=new Date(b).setHours(0,0,0,0),e=0;e<a.events.length;e++){var f=new Date(a.events[e].date).setHours(0,0,0,0);if(d===f)return a.events[e].status}return""}}]),angular.module("tbApp").controller("BusinessNewPrestationCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-newPrestation",{url:"/business/newPrestation",templateUrl:"app/business/business-newPrestation/business-newPrestation.html",controller:"BusinessNewPrestationCtrl"})}]),angular.module("tbApp").controller("BusinessNewRendezvousCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-newRendezvous",{url:"/business/newRendezvous",templateUrl:"app/business/business-newRendezvous/business-newRendezvous.html",controller:"BusinessNewRendezvousCtrl"})}]),angular.module("tbApp").controller("BusinessNewScheduleCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-newSchedule",{url:"/business/newSchedule",templateUrl:"app/business/business-newSchedule/business-newSchedule.html",controller:"BusinessNewScheduleCtrl"})}]),angular.module("tbApp").controller("BusinessNewStaffCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-newStaff",{url:"/business/newStaff",templateUrl:"app/business/business-newStaff/business-newStaff.html",controller:"BusinessNewStaffCtrl"})}]),angular.module("tbApp").controller("BusinessPrestationsCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-prestations",{url:"/business/prestations",templateUrl:"app/business/business-prestations/business-prestations.html",controller:"BusinessPrestationsCtrl"})}]),angular.module("tbApp").controller("BusinessRendezvousCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-rendezvous",{url:"/business/rendezvous",templateUrl:"app/business/business-rendezvous/business-rendezvous.html",controller:"BusinessRendezvousCtrl"})}]),angular.module("tbApp").controller("BusinessSchedulesCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-schedules",{url:"/business/schedules",templateUrl:"app/business/business-schedules/business-schedules.html",controller:"BusinessSchedulesCtrl"})}]),angular.module("tbApp").controller("BusinessShowCtrl",["$scope","Auth","Business","Urls",function(a,b,c,d){function e(b){c.getBusiness(b.businessId,function(b){a.business=b,a.business.imageBusinessUrl=d.client+a.business.imageBusinessUrl},function(b){a.error=b})}b.getCurrentUser(function(a){return a}).then(e)}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-show",{url:"/business/show",templateUrl:"app/business/business-show/business-show.html",controller:"BusinessShowCtrl"})}]),angular.module("tbApp").controller("BusinessStaffsCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-staffs",{url:"/business/staffs",templateUrl:"app/business/business-staffs/business-staffs.html",controller:"BusinessStaffsCtrl"})}]),angular.module("tbApp").controller("BusinessUpdateCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business-update",{url:"/business/update",templateUrl:"app/business/business-update/business-update.html",controller:"BusinessUpdateCtrl"})}]),angular.module("tbApp").controller("BusinessCtrl",["$scope","$http","Auth","Business",function(a,b,c,d){function e(b){d.getBusiness(b.businessId,function(b){a.business=b},function(b){a.error=b})}c.getCurrentUser(function(a){return a}).then(e)}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("business",{url:"/business",templateUrl:"app/business/business.html",controller:"BusinessCtrl"})}]),angular.module("tbApp").controller("MainCtrl",["$scope","$http",function(a,b){a.busiesses=[],b.get("/api/businesses").success(function(b){a.businesses=b})}]),angular.module("tbApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("tbApp").factory("Auth",["$http","User","$cookieStore","$q",function(a,b,c,d){var e=function(a){return angular.isFunction(a)?a:angular.noop},f={};return c.get("token")&&(f=b.get()),{login:function(g,h){return a.post("/auth/local",{email:g.email,password:g.password}).then(function(a){return c.put("token",a.data.token),f=b.get(),e(h)(),a.data},function(a){return this.logout(),e(h)(a.data),d.reject(a.data)}.bind(this))},logout:function(){c.remove("token"),f={}},createUser:function(a,d){return b.save(a,function(g){return c.put("token",g.token),f=b.get(),e(d)(null,a)},function(a){return this.logout(),e(d)(a)}.bind(this)).$promise},changePassword:function(a,c,d){return b.changePassword({id:f._id},{oldPassword:a,newPassword:c},function(a){return e(d)(null,a)},function(a){return e(d)(a)}).$promise},getCurrentUser:function(a){if(0===arguments.length)return f;var b=f.hasOwnProperty("$promise")?f.$promise:f;return d.when(b).then(function(b){return e(a)(b),b},function(){return e(a)({}),{}})},isLoggedIn:function(a){return 0===arguments.length?f.hasOwnProperty("roles"):this.getCurrentUser(null).then(function(b){var c=b.hasOwnProperty("roles");return e(a)(c),c})},isStaff:function(a){if(0===arguments.length){if(void 0===f.roles)return console.log("false"),!1;var b=f.roles.indexOf("staff");return-1===b&&(b=!1),b}return this.getCurrentUser(null).then(function(b){if(void 0===b.roles)return!1;var c=b.roles.indexOf("staff");return e(a)(c),-1===c&&(c=!1),c})},getToken:function(){return c.get("token")}}}]),angular.module("tbApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("tbApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){return d.$setValidity("mongoose",!0)})}}});var app=angular.module("tbApp");app.controller("NavbarSecondryCtrl",["$scope","$modal","$log","Auth","Business",function(a,b,c,d,e){function f(b){e.getBusiness(b.businessId,function(b){a.business=b},function(b){a.error=b})}a.status1={isopen:!1},a.status2={isopen:!1},a.status3={isopen:!1},a.status4={isopen:!1},a.status5={isopen:!1},a.toggleDropdown=function(a){a.isopen=!a.isopen},d.getCurrentUser(function(a){return a}).then(f),a.open=function(){var d=b.open({animation:!0,templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",resolve:{biz:function(){return a.business}}});d.result.then(function(b){a.business=b},function(){c.info("Modal dismissed at: "+new Date)})}}]),app.controller("ModalInstanceCtrl",["$scope","$modalInstance","Business","biz",function(a,b,c,d){a.business=d,a.ok=function(){c.changeStatus(a.business._id,function(a){var c=a.business;b.close(c)},function(c){a.error=c,b.dismiss(a.error)})},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("tbApp").controller("NavbarCtrl",["$scope","$location","Auth",function(a,b,c){a.menu=[{title:"Home",link:"/"}],a.isCollapsed=!0,a.isLoggedIn=c.isLoggedIn,a.isStaff=c.isStaff,a.getCurrentUser=c.getCurrentUser,a.logout=function(){c.logout(),b.path("/")},a.isActive=function(a){return a===b.path()}}]),angular.module("tbApp").factory("Business",["$http",function(a){return{getBusinesses:function(b,c){a({method:"GET",url:"api/businesses"}).success(function(a){b(a)}).error(function(a){c(a)})},getBusiness:function(b,c,d){a({method:"GET",url:"api/businesses/"+b}).success(function(a){c(a)}).error(function(a){d(a)})},changeStatus:function(b,c,d){a({method:"PUT",url:"api/businesses/"+b+"/status"}).success(function(a){c(a)}).error(function(a){d(a)})}}}]),angular.module("tbApp").factory("User",["$resource",function(a){return a("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("tbApp").run(["$templateCache",function(a){a.put("app/account/login/login.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p><p>Staff account is <code>staff@staff.com</code> / <code>staff</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password required></div><div class="form-group has-error"><p class=help-block ng-show="form.email.$error.required && form.password.$error.required && submitted">Please enter your email and password.</p><p class=help-block ng-show="form.email.$error.email && submitted">Please enter a valid email.</p><p class=help-block>{{ errors.other }}</p></div><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Login</button> <a class="btn btn-default btn-lg btn-register" href=/signup>Register</a></div><hr><div><a class="btn btn-facebook" href="" ng-click="loginOauth(\'facebook\')"><i class="fa fa-facebook"></i> Connect with Facebook</a> <a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')"><i class="fa fa-google-plus"></i> Connect with Google+</a></div></form></div></div><hr></div>'),a.put("app/account/settings/settings.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class="btn btn-lg btn-primary" type=submit>Save changes</button></form></div></div></div>'),a.put("app/account/signup/signup.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><!-- First name --><div class=form-group ng-class="{ \'has-success\': form.firstName.$valid && submitted,\n                                            \'has-error\': form.firstName.$invalid && submitted }"><label>Prénom</label><input name=firstName class=form-control ng-model=user.firstName required><p class=help-block ng-show="form.firstName.$error.required && submitted">Un prénom est requis.</p></div><!-- Last name --><div class=form-group ng-class="{ \'has-success\': form.lastName.$valid && submitted,\n                                            \'has-error\': form.lastName.$invalid && submitted }"><label>Nom</label><input name=lastName class=form-control ng-model=user.lastName required><p class=help-block ng-show="form.lastName.$error.required && submitted">Un nom est requis.</p></div><!-- Email --><div class=form-group ng-class="{ \'has-success\': form.email.$valid && submitted,\n                                            \'has-error\': form.email.$invalid && submitted }"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show="form.email.$error.email && submitted">Ce n\'est pas une adresse mail valide.</p><p class=help-block ng-show="form.email.$error.required && submitted">What\'s your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><!-- Password --><div class=form-group ng-class="{ \'has-success\': form.password.$valid && submitted,\n                                            \'has-error\': form.password.$invalid && submitted }"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show="(form.password.$error.minlength || form.password.$error.required) && submitted">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><!-- Date of birth & gender --><div ng-controller=SignupCtrl><div class=row><div class=col-sm-6><label>Date de naissance</label><div class=form-group ng-class="{ \'has-success\': form.dateOfBirth.$valid && submitted, \'has-error\': form.dateOfBirth.$invalid && submitted }"><p class=input-group><input class=form-control datepicker-popup={{format}} name=dateOfBirth ng-model=user.dateOfBirth is-open=opened max-date=maxDate datepicker-options=dateOptions date-disabled="disabled(date, mode)" required mongoose-error close-text="Close"> <span class=input-group-btn><button type=button class="btn btn-default" ng-click=open($event)><i class="glyphicon glyphicon-calendar"></i></button></span></p><p class=help-block ng-show=form.dateOfBirth.$error.mongoose>{{ errors.dateOfBirth }}</p></div></div><div class=col-sm-6><div class=form-group ng-class="{ \'has-success\': form.dateOfBirth.$valid && submitted, \'has-error\': form.dateOfBirth.$invalid && submitted }"><label>Sexe</label><select class=form-control name=gender ng-model=user.gender required mongoose-error><option value=homme>Homme</option><option value=femme>Femme</option></select><p class=help-block ng-show=form.gender.$error.mongoose>{{ errors.gender }}</p></div></div></div></div><!-- Buttons --><div><button class="btn btn-inverse btn-lg btn-login" type=submit>Sign up</button> <a class="btn btn-default btn-lg btn-register" href=/login>Login</a></div><hr><div><a class="btn btn-facebook" href="" ng-click="loginOauth(\'facebook\')"><i class="fa fa-facebook"></i> Connect with Facebook</a> <a class="btn btn-google-plus" href="" ng-click="loginOauth(\'google\')"><i class="fa fa-google-plus"></i> Connect with Google+</a></div></form></div></div><hr></div>'),a.put("app/business/business-newPrestation/business-newPrestation.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>créer une nouvelle prestation"),a.put("app/business/business-newRendezvous/business-newRendezvous.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>prend un rendez-vous pour un client"),a.put("app/business/business-newSchedule/business-newSchedule.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>créer un nouvelle horaire"),a.put("app/business/business-newStaff/business-newStaff.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>Ajouter un nouveau staff"),a.put("app/business/business-prestations/business-prestations.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>Voir la liste des prestations"),a.put("app/business/business-rendezvous/business-rendezvous.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>voir les rendez-vous du business"),a.put("app/business/business-schedules/business-schedules.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>voir les horaires"),a.put("app/business/business-show/business-show.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div ng-include="\'components/navbar/navbar-secondary.html\'"></div><div class=container><!-- colonne gauche --><div class=col-sm-4><img class=img-rounded ng-src={{business.imageBusinessUrl}} style="max-height:200px"></div><!-- colonne centrale --><div class=col-sm-4><h3>Adresse géographique</h3><hr class=divider><h4>{{business.name}}</h4><p><i class="fa icon-infos fa-building"></i> {{business.zip}} {{business.city}} ({{business.canton}})</p><p><i class="fa icon-infos fa-road"></i> {{business.street}}</p></div><!-- colonne droite --><div class=col-sm-4><h3>Adresse de infos</h3><hr class=divider><p><i class="fa icon-infos fa-phone"></i> {{business.phone}}</p><p><i class="fa icon-infos fa-mobile"></i> {{business.mobile}}</p><p><i class="fa icon-infos fa-external-link-square"></i> {{business.site}}</p><p><i class="fa icon-infos fa-facebook-official"></i> {{business.facebook}}</p></div><!-- colonne horaires pleine largeur --><div class="col-sm-12 col-schedule"><h3>Horaires</h3><hr class=divider><table class=table><thead><tr><th>Jour</th><th>Description</th><th>Débute</th><th>Termine</th></tr></thead><tbody><tr ng-repeat="schedule in business.schedules"><td>{{schedule.dayName}}</td><td>{{schedule.description}}</td><td>{{schedule.startHour}}</td><td>{{schedule.endHour}}</td></tr></tbody></table></div></div>'),a.put("app/business/business-staffs/business-staffs.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>voir la liste du personnel"),a.put("app/business/business-update/business-update.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div>mettre à jour les infos du salon"),a.put("app/business/business.html","<div ng-include=\"'components/navbar/navbar.html'\"></div><div ng-include=\"'components/navbar/navbar-secondary.html'\"></div><div class=container><h1>Vue d'ensemble : {{business.name}}</h1></div>"),a.put("app/main/main.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><header class=hero-unit id=banner><div class=container><h1>Page d\'accueil</h1><p class=lead>Bienvenu sur la page d\'accueil !</p></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Salons de coiffures :</h1><ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="business in businesses"><li><a href=# tooltip={{business.city}}>{{business.name}}</a></li></ul></div></div></div><footer class=footer><div class=container><p>TB2015 | Direct Haircut | <a href=https://github.com/LL0892/TB2015>Git projet</a></p></div></footer>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>'),a.put("components/navbar/navbar-secondary.html",'<nav class="navbar navbar-lower" role=navigation ng-controller=NavbarSecondryCtrl><div class=container><div class="collapse navbar-collapse collapse-buttons"><form class="navbar-form navbar-left" role=search><!-- Salon button --><div class=btn-group dropdown is-open=status1.isopen><button type=button class="btn btn-default dropdown-toggle btn-lg" dropdown-toggle ng-click=toggleDropdown(status1)>Le salon <span class=caret></span></button><ul class=dropdown-menu role=menu><li><a href=/business/show>Voir les infos du salon</a></li><li class=divider></li><li><a href=/business/update><i class="glyphicon glyphicon glyphicon-pencil" aria-hidden=true></i> Modifier les infos du salon</a></li></ul></div><!-- Rendezvous button --><div id=rendezvous class=btn-group dropdown is-open=status5.isopen><button type=button class="btn btn-default dropdown-toggle btn-lg" dropdown-toggle ng-click=toggleDropdown(status5)>Rendez-vous <span class=caret></span></button><ul class=dropdown-menu role=menu><li><a href=/business/rendezvous>Voir les rendez-vous</a></li><li class=divider></li><li><a href=/business/newRendezvous><i class="glyphicon glyphicon glyphicon-book" aria-hidden=true></i> Prendre un rendez-vous</a></li></ul></div><!-- Prestation button --><div id=prestation class=btn-group dropdown is-open=status2.isopen><button type=button class="btn btn-default dropdown-toggle btn-lg" dropdown-toggle ng-click=toggleDropdown(status2)>Prestations <span class=caret></span></button><ul class=dropdown-menu role=menu><li><a href=/business/prestations>Voir les prestations</a></li><li class=divider></li><li><a href=/business/newPrestation><i class="glyphicon glyphicon glyphicon-plus" aria-hidden=true></i> Ajouter une prestation</a></li></ul></div><!-- Horaires button --><div id=horaire class=btn-group dropdown is-open=status3.isopen><button type=button class="btn btn-default dropdown-toggle btn-lg" dropdown-toggle ng-click=toggleDropdown(status3)>Horaires <span class=caret></span></button><ul class=dropdown-menu role=menu><li><a href=/business/schedules>Voir les tranches horaires</a></li><li class=divider></li><li><a href=/business/newSchedule><i class="glyphicon glyphicon glyphicon-plus" aria-hidden=true></i> Ajouter une tranche horaire</a></li></ul></div><!-- Staff button --><div id=staff class=btn-group dropdown is-open=status4.isopen><button type=button class="btn btn-default dropdown-toggle btn-lg" dropdown-toggle ng-click=toggleDropdown(status4)>Personnel <span class=caret></span></button><ul class=dropdown-menu role=menu><li><a href=/business/staffs>Voir le personnel du salon</a></li><li class=divider></li><li><a href=/business/newStaff><i class="glyphicon glyphicon glyphicon-plus" aria-hidden=true></i> Ajouter un membre au personnel</a></li></ul></div><!-- Status button --><button class="btn btn-warning btn-sm" ng-show=business.isActive ng-click=open()>Désactiver les réservations</button> <button class="btn btn-success btn-sm" ng-hide=business.isActive ng-click=open()>Activer les réservations</button><!-- Modal template --><script type=text/ng-template id=myModalContent.html><div class="modal-header">\r\n                <h3 class="modal-title">Changement de status :</h3>\r\n            </div>\r\n            <div ng-show="business.isActive" class="modal-body">\r\n              <p>Vous allez changer le status de ce salon à: inactif.</p>\r\n              <p>Il ne sera alors plus possible de prendre de rendez-vous pour les clients.</p>\r\n            </div>\r\n            <div ng-hide="business.isActive" class="modal-body">\r\n              <p>Vous allez changer le status de ce salon à: actif.</p> \r\n              <p>Il sera alors possible pour les clients de prendre des rendez-vous auprès de votre salon.</p>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button class="btn btn-success" ng-click="ok()">Confirmer</button>\r\n                <button class="btn btn-danger" ng-click="cancel()">Annuler</button>\r\n            </div></script></form></div></div></nav>'),a.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click="isCollapsed = !isCollapsed"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href="/" class=navbar-brand>tb</a></div><div collapse=isCollapsed class="navbar-collapse collapse" id=navbar-main><ul class="nav navbar-nav"><li ng-repeat="item in menu" ng-class="{active: isActive(item.link)}"><a ng-href={{item.link}}>{{item.title}}</a></li><li ng-show=isStaff() ng-class="{active: isActive(\'/business\')}"><a href=/business>Gestion du salon</a></li></ul><ul class="nav navbar-nav navbar-right"><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/signup\')}"><a href=/signup>Sign up</a></li><li ng-hide=isLoggedIn() ng-class="{active: isActive(\'/login\')}"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>{{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/settings\')}"><a href=/settings><span class="glyphicon glyphicon-cog"></span></a></li><li ng-show=isLoggedIn() ng-class="{active: isActive(\'/logout\')}"><a href="" ng-click=logout()>Logout</a></li></ul></div></div></div>')}]);