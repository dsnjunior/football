import { createId as createIdBase } from "@paralleldrive/cuid2";

export const idContext = {
  user: 'usr',
  session: 'ses',
} as const


export function createId(context: keyof typeof idContext) {
  return `${idContext[context]}_${createIdBase()}`;
}