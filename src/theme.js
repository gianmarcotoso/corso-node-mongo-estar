import React from 'react'
import { themes } from 'mdx-deck'
import SyntaxHighlighter from 'react-syntax-highlighter'

const book = themes.book

export const getLanguage = className => {
	const match = /language-(\w*)/.exec(className || 'language-javascript')
	let lang = 'javascript'
	if (match.length > 1) {
		lang = match[1]
	}
	return lang
}

export const pre = props => props.children

export const code = props => {
	const language = getLanguage(props.className)
	return <SyntaxHighlighter language={language} {...props} />
}

export default {
	...book,
	styles: {
		...book.styles,
		h1: {
			marginTop: 0,
			textAlign: 'center',
		},
		h2: {
			marginTop: 0,
			textAlign: 'center',
		},
	},
	components: {
		pre,
		code,
	},
}
