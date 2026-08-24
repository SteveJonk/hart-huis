import type {CSSProperties} from 'react'

/**
 * Sanity's eigen card-variabelen, zodat het paneel meekleurt met het thema dat
 * de redacteur gekozen heeft. De fallbacks zijn de lichte waarden, voor het
 * geval de variabelen buiten een Card niet gezet zijn.
 */
export const styles = {
  wrapper: {
    padding: 24,
    maxWidth: 720,
    fontFamily: 'inherit',
    color: 'var(--card-fg-color, #1b1d21)',
  },
  intro: {color: 'var(--card-muted-fg-color, #6b7280)', lineHeight: 1.6},
  row: {display: 'flex', flexWrap: 'wrap' as const, gap: 12, margin: '20px 0'},
  button: {
    padding: '10px 18px',
    borderRadius: 4,
    border: '1px solid transparent',
    background: 'var(--card-focus-ring-color, #2276fc)',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
  },
  secondary: {
    padding: '10px 18px',
    borderRadius: 4,
    border: '1px solid var(--card-border-color, #c9cdd4)',
    background: 'transparent',
    color: 'inherit',
    fontSize: 14,
    cursor: 'pointer',
  },
  notice: {
    padding: 16,
    borderRadius: 4,
    border: '1px solid var(--card-border-color, #f0c000)',
    lineHeight: 1.6,
  },
  output: {
    padding: 16,
    borderRadius: 4,
    background: 'var(--card-code-bg-color, #f6f6f8)',
    border: '1px solid var(--card-border-color, #e3e4e8)',
    fontFamily: 'inherit',
    fontSize: 13,
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
} satisfies Record<string, CSSProperties>
