interface SelectConditionsDomain {
  id: true;
  userId: true;
  domain: true;
  rating: true;
  content: true;
  hasSpoiler: true;
  createdAt: true;
  updatedAt: true;
  book?: boolean;
  movie?: boolean;
}

export const selectReviewClause: SelectConditionsDomain = {
  id: true,
  userId: true,
  domain: true,
  rating: true,
  content: true,
  hasSpoiler: true,
  createdAt: true,
  updatedAt: true,
};
