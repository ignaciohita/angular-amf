# angular-amf
=============
Implementation of amfjs for AngularJs

An Angular port of a <a href='https://github.com/emilkm/amfjs'>AMF JS</a> into a factory that has a similar syntax to $http.

# Usage
Before using the factory, you must import the two scripts and its module:

``` html
<script src='amf.js'></script>
<script src='angular.amf.js'></script>
```

``` javascript
angular.module('myApp', ['angularAmf']);
```

Then, wherever you are going to consume it, make a reference to the $amf service for dependency injection:

``` javascript
.factory('testService', ['$amf',function($soap){
//use it here
}])
```

$amf has two methods, init and invoke, which accepts the following paramaters:

init:

| Parameter |Description | Example |
| ------------ | ------------  | ------------  |
| destination | The destination of the AMF endpoint | 'RemotingServicesImpl' |
| endpoint | The address of the endpoint | 'https://mydomain.com/messagebroker/amf' |

Syntax:
``` javascript
$amf.init(destination, endpoint);
```

invoke:

| Parameter |Description | Example |
| ------------ | ------------  | ------------  |
| source | The name of the AMF channel | 'my-amf' |
| operation | The operation name to invoke | 'getWhatever' |
| params | The array of parameters for the operation | ['param1', 'param2'] |

Syntax:
``` javascript
$amf.invoke(source, operation, params);
```

Similar to $http methods, $amf.post returns a promise that you can act upon.

``` javascript
$amf.invoke(source, operation, params).then(function(response){
	//Do Stuff
});
```

NOTE: Response will be a javascript object containing the response mapped to objects. Do a console.log of response so you can see what you are working with.

# Example 1: Hello World
A basic 'Hello World' with no parameters.

``` javascript
angular.module('myApp', ['angularAmf'])
    .constant('BASE_URL', 'https://mydomain.com/messagebroker/amf')
    .factory('testService', ['$amf',function($amf){
        return {
            HelloWorld: function(){
                $amf.init('RemotingServicesImpl', BASE_URL)
                return $amf.post('my-amf', 'HelloWorld');
            }
        }
    }])
    .controller('MainCtrl', function($scope, testService) {
        testService.HelloWorld().then(function(response){
        $scope.response = response;
    });
});

```

# Example 2: Invoke with Parameters
A basic method call with parameters.

``` javascript
angular.module('myApp', ['angularAmf'])
    .constant('BASE_URL', 'https://mydomain.com/messagebroker/amf')
    .factory('testService', ['$amf',function($amf){
        return {
            HelloWorld: function(){
                $amf.init('RemotingServicesImpl', BASE_URL)
                return $amf.post('my-amf', 'HelloWorld', ['param1', 'param2']);
            }
        }
    }])
    .controller('MainCtrl', function($scope, testService) {
        testService.HelloWorld().then(function(response){
        $scope.response = response;
    });
});

```