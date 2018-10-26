// This middleware may be used in the future

import ActionCable from 'actioncable';

export default function cable() {
  const cable = ActionCable.createConsumer('/cable');

  return ({ dispatch, getState }) => next => action => {
    if (typeof(action) === 'function') {
      return next(action)
    }

    const { channel, feed, leave } = action;
    let { received } = action;

    if (!channel) {
      return next(action);
    }

    if (leave) {
      const subscription = _.find(
        cable.subscriptions.subscriptions,
        sub => sub.identifier === JSON.stringify({ channel, feed }),
      );

      return cable.subscriptions.remove(subscription);
    }

    if (typeof(received) === 'string') {
      received = data => dispatch({ type: received, data })
    }

    return cable.subscriptions.create({ channel, feed }, { received });
  };
};
