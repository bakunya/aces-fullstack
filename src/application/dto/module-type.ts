import { ModuleType as MT } from "@src/domain/Module";

export type ModuleType = Record<keyof typeof MT, string>;