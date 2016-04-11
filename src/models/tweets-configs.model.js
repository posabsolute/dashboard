export default {
  name: 'tweetsConfigModel',
  data: {
    handle: {
      validate: {
        required: true,
      },
    },
    count: {
      validate: {
        required: true,
        range: [10, 250],
      },
    },
    order: {
      validate: {},
    },
  },
};
