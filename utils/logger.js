/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//display a JSON object to console
var displayJson = exports.displayJson = function(json) {
    for(var i in json){
        /*if(isObject(json[i])){
            displayJson(json);
        }*/
        console.log("key= " + i +", value=",json[i]);
    }
};

//test for object
var isObject = exports.isObject = function(n) {
  return Object.prototype.toString.call(n) === '[object Object]';
};