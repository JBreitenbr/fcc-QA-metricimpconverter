function multDiv(str) {
  let arr = str.split("/");
  if(arr.length>=3){
    return false;
  } else {
    return arr;
  }
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numRegex = /[.0-9\/]+/g;
    let stri=input.match(numRegex);
    if(stri==null){
      result=1;
    }
    else {
      let chk=multDiv(stri[0]);
      if(!chk){
        result=undefined;
      }
      else if(chk.length==1){
      result=stri[0];
      }
      else {
    result = parseFloat(chk[0]) / parseFloat(chk[1]||"1");
    if (isNaN(chk[0]) || isNaN(chk[1])) {
      result=undefined;
        }
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let alphRegex = /[a-zA-Z]+/g;
    stri=input.match(alphRegex);
    let uarr=["km","mi","gal","l","kg","lbs","KM","MI","GAL","L","KG","LBS"];
    if(stri[0]==null || !uarr.includes(stri[0])){
      result=undefined;
    }
    else{result=stri[0];}
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit=initUnit;
    let result;
    
    if(unit=="km"||unit=="KM"){result="mi";}
    else if(unit=="gal"||unit=="GAL"){result="L";}
    else if(unit=="lbs"||unit=="LBS"){result="kg";}
    else if(unit=="mi"||unit=="MI"){result="km";}
    else if(unit=="L"||unit=="l"){result="gal";}
    else if(unit=="kg"||unit=="KG"){result="lbs";}
    else {result=undefined;}
    return result;
  };

  this.spellOutUnit = function(initUnit) {
    let unit=initUnit;
    let result;
    if(unit=="km"||unit=="KM"){result="kilometers";}
    else if(unit=="gal"||unit=="GAL"){result="gallons";}
    else if(unit=="lbs"||unit=="LBS"){result="pounds";}
    else if(unit=="mi"||unit=="MI"){result="miles";}
    else if(unit=="L"||unit=="l"){result="liters";}
    else if(unit=="kg"||unit=="KG"){result="kilograms";}
    else {result=undefined;}
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit=initUnit;
    let result;
    if(unit=="gal"||unit=="GAL"){
      result=initNum*galToL;
    }
    else if(unit=="lbs"||unit=="LBS"){
      result=initNum*lbsToKg;
    }
    else if(unit=="mi"||unit=="MI"){
      result=initNum*miToKm;
    }
    else if(unit=="L"||unit=="l"){
      result=initNum/galToL;
    }
    else if(unit=="kg"||unit=="KG"){
      result=initNum/lbsToKg;
    }
    else if(unit=="km"||unit=="KM"){
      result=initNum/miToKm;
    }
    else {
      result=undefined;
    }
    if(result!=undefined){result=parseFloat(result.toFixed(5));}
    return result;
  }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result=`${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  
    return result;
  };
  
}

module.exports = ConvertHandler;
