<template>
  <EditorPage :content />
</template>

<script setup lang="ts">
import { EditorPage } from '~/pages/editor'

definePageMeta({
  name: 'EditorPage',
})

const content = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Заголовок 2 уровня',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Заголовок 3 уровня',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Обычный текст',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Маркированный список из единственного элемента',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
        type: null,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Нумерованный список из единственного элемента',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Маркированный список, состоящий из нескольких элементов',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Вот второй элемент',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      attrs: {
        start: 1,
        type: null,
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Нумерованный список, состоящий из нескольких элементов',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Вот второй элемент',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Это цитата',
            },
          ],
        },
      ],
    },
  ],
}
</script>
