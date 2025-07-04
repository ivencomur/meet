const mockData = [
  // ... (your existing event objects)
  {
    "kind": "calendar#event",
    "etag": "\"3181159875584000\"",
    "id": "3qtd6uscq4tsi6gc7nmmmkprps_20200520T120000Z",
    "summary": "React is Fun",
    "location": "Berlin, Germany",
    //...
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    "kind": "calendar#event",
    "etag": `"3181161784712000${i}"`, // Removed unnecessary escape characters
    "id": `mock_id_${i}`,
    "summary": `Mock Event ${i + 3}`,
    "location": "Berlin, Germany",
    //...
  }))
];

export default mockData;