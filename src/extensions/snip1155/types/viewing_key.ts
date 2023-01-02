type CreateViewingKey = {
  create_viewing_key: {
    entropy: string;
    padding?: string;
  };
};

type SetViewingKey = {
  set_viewing_key: {
    key: string;
    padding?: string;
  };
};
