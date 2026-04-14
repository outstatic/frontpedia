export const getFeedQueryFilters = (referenceDate: Date = new Date()) => [
  {
    $or: [
      { collection: "inspiration" },
      { collection: "resources" },
      { collection: "people" },
    ],
  },
  { status: "published" },
  { publishedAt: { $lte: referenceDate.toISOString() } },
];

export const getFeedQuery = (referenceDate: Date = new Date()) => ({
  $and: getFeedQueryFilters(referenceDate),
});
