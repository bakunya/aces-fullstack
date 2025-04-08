import { ModuleType as MT } from "@src/domain/ModuleType";

export type ModuleType = Record<keyof typeof MT, string>;