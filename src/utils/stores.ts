import * as english from "../languages/englishWords.json";
import * as german from "../languages/germanWords.json";
import * as french from "../languages/frenchWords.json";
import * as italian from "../languages/italianWords.json";
import * as spanish from "../languages/spanishWords.json";

import { writable } from "svelte/store";

interface language {
	name: string;
	TOP_200: string[];
	TOP_1000: string[];
}

export const allLanguages = { english, german, french, italian, spanish };
export const language = writable<language>(english);
export const wordRange = writable<string>("TOP_200");
export const upToDate = writable<boolean>(true);
