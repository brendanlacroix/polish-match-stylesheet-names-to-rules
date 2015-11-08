module.exports = {
  name: 'match-stylesheet-names-to-rules',
  message: function(error){
    if (error.error.errorName === 'failed_on_no_match') {
      return 'Top-level selectors should match the filename. The expected selector is: ".' + error.error.message + '".';
    }

    return 'Do not use multiple top-level rules in a file.';
  },
  test: function(ast, path){
    var errors = [],
        filename = path.split('/').pop().split('.')[0].replace(/_/g,'-').trim(),
        firstRule,
        firstRuleString;

    /* This rule doesn't make sense to apply to plain CSS files, because you can't nest. */
    if (['scss','sass','less'].indexOf(path.split('.').pop()) === -1) {
      return errors;
    }

    if (!ast.contains('ruleset')) {
      return;
    }

    firstRule = ast.first('ruleset');

    /*
     * Remove leading punctuation, if present, using a non-global replace.
     */
    if (filename.indexOf('-') === 0) {
      filename = filename.replace('-','');
    }

    /*
     * Disallow multiple top-level selectors.
     */
    if (firstRule !== ast.last('ruleset')) {
      errors.push({
        errorName: 'failed_on_multiple',
        message: ''
      });
    } else if (firstRule.first('selector').first('simpleSelector').toString().replace(/_/g,'-').replace(/(\.|\#)/g, '').trim() !== filename) {
      errors.push({
        errorName: 'failed_on_no_match',
        message: filename
      });
    }

    return errors;
  }
};
