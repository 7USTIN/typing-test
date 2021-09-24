import english from "../languages/englishWords";
import german from "../languages/germanWords";
import french from "../languages/frenchWords";
import italian from "../languages/italianWords";
import spanish from "../languages/spanishWords";

import { writable } from "svelte/store";

export const allLanguages = { english, german, french, italian, spanish };
export const language = writable(english);
export const wordRange = writable("TOP_200");
export const upToDate = writable(true);
