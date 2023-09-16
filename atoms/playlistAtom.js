import { RecoilEnv, atom } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const selectedPlaylistIdState = atom({
  key: "selectedPlaylistIdState",
  default: "37i9dQZF1DWXNFSTtym834",
});
