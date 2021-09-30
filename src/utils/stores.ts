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

interface settings {
	language: language;
	wordRange: string;
	capitalize: number;
	modus: string;
	time: number;
	wordCount: number;
}

export const allLanguages = { english, german, french, italian, spanish };
export const upToDate = writable<boolean>(true);

export const settings = writable<settings>({
	language: english,
	wordRange: "TOP_200",
	capitalize: 0,
	modus: "words",
	time: 30,
	wordCount: 50,
});
