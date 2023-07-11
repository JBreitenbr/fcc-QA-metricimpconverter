'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if(initUnit!=undefined && initUnit!=null){
      initUnit=initUnit.toLowerCase();
    }
    if(initUnit=="l"){initUnit="L";}
    if(initNum.indexOf("//")>0 && !initUnit){
      res.json("invalid number and unit");
      return;
    }
    if(initNum.indexOf("//")>0 && !(initUnit==undefined||initUnit==null)){
      res.json("invalid number");
      return;
    }
    if ((initNum==undefined || initNum==null) && initUnit==undefined) {
      res.json("invalid number and unit");
      return;
    } else if (initNum==undefined ||  initNum==null) {
      res.json("invalid number");
      return;
    } else if (initUnit==undefined || initUnit==null) {
      res.json("invalid unit");
      return;
        }

        let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum,initUnit,returnNum,returnUnit);

    res.json({ initNum, initUnit, returnNum, returnUnit, string });
  
});
}
