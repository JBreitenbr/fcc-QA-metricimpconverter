const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "42L";
      assert.equal(convertHandler.getNum(input), 42);
      done();
    });
    
    test("Decimal number input", function (done) {
      let input = "75.7kg";
      assert.equal(convertHandler.getNum(input), 75.7);
      done();
    });

    test("Fractional number input", function (done) {
      let input = "3/4mi";
      assert.equal(convertHandler.getNum(input), 3/4);
      done();
    });

    
    test("Fractional with a decimal  number input", function (done) {
      let input = "3.7/4gal";
      assert.equal(convertHandler.getNum(input), 3.7/4);
      done();
    });

    test("Double fraction input", function (done) {
      let input = "3/4/5km";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });
    
    test("Input contains no number", function (done) {
      let input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("Valid inputs", function (done) {
let input=["km","mi","gal","L","kg","lbs"];
let output=["km","mi","gal","L","kg","lbs"];
for(let i=0; i<input.length; i++){
assert.equal(convertHandler.getUnit(input[i]),output[i]);
}
      done();   
    });
    
test("Invalid unit input", function (done) {
      let input = "3g";
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("Valid inputs return unit", function (done) {
      let input = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG"];
      let expected = ["L","gal","km","mi","kg","lbs","L","gal","km","mi","kg","lbs"];
for(let i=0; i<input.length; i++){
assert.equal(convertHandler.getReturnUnit(input[i]),expected[i]);
}
      done();
    });
  });
    suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("Valid units spelled out", function (done) {
      let input = ["gal","l","mi","km","lbs","kg","GAL","L","MI","KM","LBS","KG"];
      let expected = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
  for(let i=0; i<input.length; i++){
assert.equal(convertHandler.spellOutUnit(input[i]),expected[i]);
  }
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("gal to L", function (done) {
      let input = [1, "gal"];
      let expected = 3.78541;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });

        test("L to gal", function (done) {
      let input = [1, "L"];
      let expected = 0.26417;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });

  test("mi to km", function (done) {
      let input = [1, "mi"];
      let expected = 1.60934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });
  test("km to mi", function (done) {
      let input = [1, "km"];
      let expected = 0.62137;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });
    test("lbs to kg", function (done) {
      let input = [1, "lbs"];
      let expected = 0.45359;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });

    test("kg to lbs", function (done) {
      let input = [1, "kg"];
      let expected = 2.20462;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),expected,0.1); 
      done();
    });
  });
});