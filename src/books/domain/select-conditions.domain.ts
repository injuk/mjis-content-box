// TODO: 이 쪽 너무 지저분함. 수정하기!
interface SelectReviewDomain {
  select: {
    id: true;
    domain: true;
    rating: true;
    content: true;
    hasSpoiler: true;
    createdAt: true;
    updatedAt: true;

    user: {
      select: {
        id: true;
        email: true;
        nickname: true;
      };
    };
  };
}

interface SelectConditionsDomain {
  id: true;
  title: true;
  originalTitle: true;
  author: true;
  publisher: true;
  publishedAt: true;
  isbn: true;
  genre: true;
  coverUrl: true;
  createdAt: true;
  createdBy: true;
  updatedAt: true;
  updatedBy: true;

  reviews?: SelectReviewDomain;
}
export const selectBookClause: SelectConditionsDomain = {
  id: true,
  title: true,
  originalTitle: true,
  author: true,
  publisher: true,
  publishedAt: true,
  isbn: true,
  genre: true,
  coverUrl: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true,
};

export const selectBookWithReviewClause: SelectConditionsDomain = {
  id: true,
  title: true,
  originalTitle: true,
  author: true,
  publisher: true,
  publishedAt: true,
  isbn: true,
  genre: true,
  coverUrl: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true,

  reviews: {
    select: {
      id: true,
      domain: true,
      rating: true,
      content: true,
      hasSpoiler: true,
      createdAt: true,
      updatedAt: true,

      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
    },
  },
};
