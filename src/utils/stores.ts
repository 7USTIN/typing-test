import * as english from "../languages/englishWords.json";
import * as german from "../languages/germanWords.json";
import * as french from "../languages/frenchWords.json";
import * as italian from "../languages/italianWords.json";
import * as spanish from "../languages/spanishWords.json";

import { writable } from "svelte/store";

export const allLanguages = { english, german, french, italian, spanish };
export const language = writable(english);
export const wordRange = writable("TOP_200");
export const upToDate = writable(true);
