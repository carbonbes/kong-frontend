import { HEADING_NODE } from './heading-node'
import { PARAGRAPH_NODE } from './paragraph-node'
import { BULLETLIST_NODE } from './bullet-list-node'
import { ORDEREDLIST_NODE } from './ordered-list-node'
import { BLOCKQUOTE_NODE } from './blockquote-node'
import { HORIZONTALRULE_NODE } from './horizontal-rule-node'

export const ROOT_NODES = [
  HEADING_NODE,
  PARAGRAPH_NODE,
  BULLETLIST_NODE,
  ORDEREDLIST_NODE,
  BLOCKQUOTE_NODE,
  HORIZONTALRULE_NODE,
] as const
