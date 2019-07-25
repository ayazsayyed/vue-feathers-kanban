const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      hooks.queryWithCurrentUser({ ownerField: 'ownerId' })
    ],
    get: [
      hooks.queryWithCurrentUser({ ownerField: 'ownerId' })
    ],
    create: [
      hooks.associateCurrentUser({ as: 'ownerId' })
    ],
    update: [
      hooks.queryWithCurrentUser({ ownerField: 'ownerId' })
    ],
    patch: [
      hooks.queryWithCurrentUser({ ownerField: 'ownerId' })
    ],
    remove: [
      hooks.queryWithCurrentUser({ ownerField: 'ownerId' })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
