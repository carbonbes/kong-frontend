import { HEADING_NODE } from './heading-node.ts'
import { PARAGRAPH_NODE } from './paragraph-node.ts'
import { BULLETLIST_NODE } from './bullet-list-node.ts'
import { ORDEREDLIST_NODE } from './ordered-list-node.ts'
import { BLOCKQUOTE_NODE } from './blockquote-node.ts'
import { HORIZONTALRULE_NODE } from './horizontal-rule-node.ts'

export const ROOT_NODES = [
  HEADING_NODE,
  PARAGRAPH_NODE,
  BULLETLIST_NODE,
  ORDEREDLIST_NODE,
  BLOCKQUOTE_NODE,
  HORIZONTALRULE_NODE,
] as const
