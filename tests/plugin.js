define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-match-stylesheet-names-to-rules SCSS tests',

    message: function () {
      assert.strictEqual(plugin.message({
        error : {
          errorName: 'failed_on_no_match',
          message: 'top-level-selector'
        }
      }), 'Top-level selectors should match the filename. The expected selector is: ".top-level-selector".');

      assert.strictEqual(plugin.message({
        error : {
          errorName: 'failed_on_multiple',
          message: ''
        }
      }), 'Do not use multiple top-level rules in a file.');
    },

    failMultiple: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss-fails-multiple.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }), '/Users/you/repos/_scss-fails-multiple.scss');

        assert.strictEqual(errors.length, 1);
        assert.equal(errors[0].errorName, 'failed_on_multiple');
        assert.equal(errors[0].message, '');
      }));
    },

    failNoMatch: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss-fails-no-match.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }), '/Users/you/repos/_scss-fails-no-match.scss');

        assert.strictEqual(errors.length, 1);
        assert.equal(errors[0].errorName, 'failed_on_no_match');
        assert.equal(errors[0].message, 'scss-fails-no-match');
      }));
    },

    success: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/_scss_passes.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }), '/Users/you/repos/_scss_passes.scss');

        assert.strictEqual(errors.length, 0);
      }));
    }
  });
});