#!/usr/bin/env node
/*!
 * ----------
 * XOKB®-Data
 * ----------
 * Data of XOKB — A manually curated dedicated xanthomonas oryzae database.
 * ___________________________________________________________________________
 *
 * Grunt, http://gruntjs.com/ — The JavaScript Task Runner.
 * ___________________________________________________________________________
 *
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Sequømics Research [http://research.sequomics.com/].
 * @copyright : Sequømics Corporation [http://sequomics.com/].
 * ___________________________________________________________________________
 *
 * @date      : 10-Dec-2016
 * @license   : Apache, version 2.0
 * @require   : Node.js®
 * @require   : NPM
 * @require   : grunt-cli
 * @build     : SEED™ — Örebro
 *              └────── A Sequømics Product — http://sequomics.com/.
 * ___________________________________________________________________________
 *
 * --/The Heart of Build System/-- of "XOKB®-Data".
 * ___________________________________________________________________________
 */


// "disallowMultipleSpaces": {"allowEOLComments": true}
// "disallowSemicolons": false
// "requireSemicolons": true
// "requireSpaceAfterLineComment": { "allExcept": ["#", "="] }
// "disallowAnonymousFunctions": true

// global __dirname: true
// global require: true

// # Usage: $ node -v
// # Usage: $ npm -v
// # Usage: $ grunt -version

// Invoking strict mode.
"use strict";

// To load required Node module.
// -----------------------------
var os         = require('os');
var fs         = require('fs');


// To load required NPM modules.
// -----------------------------
var chalk      = require('chalk');
var glob       = require('glob');

// Default color defined.
// ----------------------
var noop       = chalk.red;
var yeep       = chalk.green;
var okay       = chalk.blue;
var boop       = chalk.gray;

///-------------------
// An object literals.
///-------------------
var build = {
  // Non-identifier property names are quoted.
  "system"     : "SEED™",
  "name"       : "Örebro",
  "year"       : "2015",
  "audience"   : "for all scientist and computational biologist."
};

///-------------------
// A citation of XOKB®
///-------------------
var cite = JSON.parse(fs.readFileSync('./citation.json', {
  encoding: "utf8"
}));

// To get asset(s) information.
///----------------------------
var pkg  = JSON.parse(fs.readFileSync('./package.json', {
  encoding: "utf8"
}));

// To get credential(s) information.
///---------------------------------
var npm  = JSON.parse(fs.readFileSync('./secret.json', {
  encoding: "utf8"
}));

// To get build system(s) information.
///-----------------------------------
var seed  = JSON.parse(fs.readFileSync('./seed.json', {
  encoding: "utf8"
}));

var message    = "SEED™ — Supported under Mac OS X and Linux only!";
var contact    = "database@sequomics.com";

// ----------------------------------------------------------------------------------------------------------
///-------------------------
// A smart license function.
///------- Apache ----------
var license    = [
  '/*!                                                                                                  ',
  ' * Build System — ' + yeep(build.system) + ': ' + okay(build.name) + ' — ' + (seed).version           ,
  ' * ' + boop(build.audience)                                                                           ,
  ' * ---------------------------------------------------------------------------                       ',
  ' * Copyright © 2015 - ' + new Date().getFullYear() + ', Sequømics Corporation, All rights reserved.  ',
  ' * Available via the Apache, version 2.0. [http://www.apache.org/licenses/]                          ',
  ' * See: http://seed.sequomics.com/ — for details.                                                    ',
  ' * ---------------------------------------------------------------------------                       ',
  ' */                                                                                                  ',
  '\n',
].map(function(s) {
  return s.replace(/\s+$/, '');
}).join("\n");

///-------------------------
// A smart banner function.
///------- GPL-3.0 ---------
var banner     = [
  '/*!                                                                                                  ',
  ' * ——————————————————                                                                                ',
  ' * XOKB®-Data: v' + (pkg).version                                                                     ,
  ' * ——————————————————                                                                                ',
  ' * Data of XOKB — A manually curated dedicated xanthomonas oryzae database.                          ',
  ' * From the Desk of Prabhat Kumar — CEO, Founder & Scientist.                                        ',
  ' * -----------------------------------------------------------------------------                     ',
  ' * Copyright © 2006 - ' + new Date().getFullYear() + ', Prabhat Kumar, All rights reserved.          ',
  ' * Copyright © 2014 - ' + new Date().getFullYear() + ', Sequømics Research, All rights reserved.     ',
  ' * Copyright © 2014 - ' + new Date().getFullYear() + ', Sequømics Corporation, All rights reserved.  ',
  ' * -----------------------------------------------------------------------------                     ',
  ' * Released under the GNU General Public License (http://www.gnu.org/licenses/).                     ',
  ' */                                                                                                  ',
  '\n',
].map(function(s) {
  return s.replace(/\s+$/, '');
}).join("\n");
// ----------------------------------------------------------------------------------------------------------

///------------------------------------
// A function to register `dateFormat`.
///------------------------------------
function dateFormat(date, format) {
  if (format === undefined) {
    format = date;
    date = new Date();
  }
  var map = {
    "M": date.getMonth() + 1,
    "d": date.getDate(),
    "h": date.getHours(),
    "m": date.getMinutes(),
    "s": date.getSeconds(),
    "q": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  format = format.replace(/([yMdhmsqS])(\1)*/g, function(all, t){
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length-2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format; // A formated date.
}

// ----------------------------------------------------------------------------------------------------------
// All Grunt Operations Defined... |------------------------------------------| 10/Dec/2016 | SEED™ — Örebro.
//                           Copyright © 2016, Prabhat Kumar, All rights reserved.
// ----------------------------------------------------------------------------------------------------------

// A Grunt wrapper function to {exports}, as a module in to Node environment.
module.exports = function(grunt) {
  
  // Force use of Unix newlines.
  grunt.util.linefeed = '\n';
  
  // Assigning `grunt.util._` to `_`.
  var _ = grunt.util._;
  
  // A regular expression.
  // ---------------------
  RegExp.quote = function(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };
