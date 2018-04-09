const salesSchema = {
  title: 'sales schema',
  description: 'describe una venta',
  version: 0,
  type: 'object',
  properties: {
    folio: {
      type: 'string',
      primary: true,
    },
    clientId: {
      type: 'string',
    },
    clientName: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    products: {
      type: 'array',
      maxItems: 5,
      uniqueItems: true,
      item: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
          },
          model: {
            type: 'string',
          },
          quantity: {
            type: 'integer',
          },
          price: {
            type: 'number',
          },
          amount: {
            type: 'number',
          },
        },
      },
    },
    period: {
      type: 'integer',
    },
  },
};

export default salesSchema;
