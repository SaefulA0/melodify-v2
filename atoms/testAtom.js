import { RecoilEnv, atom } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const currentMoodTestState = atom({
  key: "currentMoodState",
  default: null,
});

export const userSelectedGenreTestState = atom({
  key: "userSelectedGenreState",
  default: null,
});
