export default {
  name: 'tweetsModel',
  endpoint: () => `/1.1/statuses/user_timeline.json`,
  dataProcessor: (data, params, configs) => {
    return {
      'handle': params.screen_name,
      'id': configs.id,
      'list': data,
    };
  },
};
