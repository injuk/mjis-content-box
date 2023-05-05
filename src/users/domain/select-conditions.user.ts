interface SelectUsersDomain {
  id: true;
  role: true;
  email: true;
  createdAt: true;
  updatedAt: true;

  nickname?: true;
}

export const selectUserClause: SelectUsersDomain = {
  id: true,
  role: true,
  email: true,
  nickname: true,
  createdAt: true,
  updatedAt: true,
};
