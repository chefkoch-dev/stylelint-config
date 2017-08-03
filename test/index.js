/**
 * A test for the Chefkoch stylelint configuration with Tape.js. Inspired by:
 * https://github.com/stylelint/stylelint-config-standard/blob/master/__tests__/index.js
 */

"use strict";

var describe = require('tape');
var stylelint = require("stylelint");
var fs = require("fs");

var lintingRules = require("../");

var validCss = fs.readFileSync("./test/css-valid.css", "utf-8");
var invalidCss = fs.readFileSync("./test/css-invalid.css", "utf-8");

describe('Flags no warnings with valid CSS', function(assert) {
    stylelint.lint({
        code: validCss,
        config: lintingRules
    })
    .then(function (data) {
        assert.ok(!data.errored, 'Did not error');
        assert.equal(data.results[0].warnings.length, 0, 'Flags no warnings');

        assert.end();
    })
});

describe('Flags warnings with valid CSS', function(assert) {
    stylelint.lint({
        code: invalidCss,
        config: lintingRules
    })
    .then(function (data) {
        assert.ok(data.errored, 'Did error');
        assert.equal(data.results[0].warnings.length, 1, 'Flags one warnings');
        assert.equal(data.results[0].warnings[0].text, 'Expected a leading zero (number-leading-zero)', 'Correct warning text');
        assert.equal(data.results[0].warnings[0].rule, 'Number-leading-zero', 'Correct rule flagged');
        assert.equal(data.results[0].warnings[0].severity, 'Error', 'Correct severity flagged');
        assert.equal(data.results[0].warnings[0].line, 2, 'Correct line number');
        assert.equal(data.results[0].warnings[0].column, 10, 'Correct column number');

        assert.end();
    });
});