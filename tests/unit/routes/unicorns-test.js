import { module, test } from 'qunit';
import { setupTest } from 'ember-fullstack-101/tests/helpers';

module('Unit | Route | unicorns', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:unicorns');
    assert.ok(route);
  });
});
