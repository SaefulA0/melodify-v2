import { RecoilEnv, atom } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const currentMoodState = atom({
  key: "currentMoodUserState",
  default: null,
});

export const selectedGenreState = atom({
  key: "selectedGenreState",
  default: null,
});
