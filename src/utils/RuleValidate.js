import Validator from '@/utils/Validator'

var numForIntOrFloat = (rule, value, callback) => {
  if (!value) {
      callback(new Error(' '));
  } else if(!Validator.validateIntOrFloat(Validator.trim(value))){
      callback(new Error(' '));
  } else if(value.length>8){
      callback(new Error(' '));
  } else {
      callback();
  }
};


var numForInt = (rule, value, callback) => {
  if(value){
    if (!Validator.validateIntNum(Validator.trim(value))){
        callback(new Error(' '));
    } else if(value.length>8){
        callback(new Error(' '));
    } else{
      callback();
    }
  } else{
    callback();
  }


};

var formatValue = (rule, value, callback) => {
if(value){
  if (!Validator.validateIntOrFloat(Validator.trim(value))){
      callback(new Error(' '));
  } else if(value.length>8){
      callback(new Error(' '));
  } else{
    callback();
  }
} else{
  callback();
}
};

export default {
  numForIntOrFloat,
  numForInt,
  formatValue
}
