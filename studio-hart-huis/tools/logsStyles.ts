import type {CSSProperties} from 'react'

/** Aanvulling op `panelStyles.ts` voor het Logs-paneel, zelfde aanpak als `mediaStyles.ts`. */
export const logsStyles = {
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: 12,
    margin: '16px 0',
  },
  select: {
    padding: '9px 12px',
    borderRadius: 4,
    border: '1px solid var(--card-border-color, #c9cdd4)',
    background: 'var(--card-bg-color, #fff)',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 14,
  },
  list: {display: 'flex', flexDirection: 'column' as const, gap: 8},
  row: {
    padding: '12px 14px',
    borderRadius: 6,
    border: '1px solid var(--card-border-color, #e3e4e8)',
    background: 'var(--card-bg-color, #fff)',
  },
  rowHead: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'baseline',
    gap: 8,
  },
  badge: (tone: 'ok' | 'fout' | 'muted') => ({
    display: 'inline-block',
    padding: '1px 8px',
    borderRadius: 999,
    fontSize: 11,
    border: '1px solid var(--card-border-color, #e3e4e8)',
    color:
      tone === 'fout'
        ? 'var(--card-badge-critical-fg-color, #b4361a)'
        : tone === 'ok'
          ? 'var(--card-badge-positive-fg-color, #23874e)'
          : 'var(--card-muted-fg-color, #6b7280)',
  }),
  time: {fontSize: 12, color: 'var(--card-muted-fg-color, #6b7280)', marginLeft: 'auto'},
  message: {margin: '6px 0 0', fontSize: 13, lineHeight: 1.5},
  meta: {marginTop: 4, fontSize: 12, color: 'var(--card-muted-fg-color, #6b7280)'},
  warnings: {margin: '6px 0 0', paddingLeft: 18, fontSize: 12, lineHeight: 1.6},
  error: {
    marginTop: 6,
    padding: 8,
    borderRadius: 4,
    background: 'var(--card-code-bg-color, #f6f6f8)',
    fontSize: 12,
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
} satisfies Record<string, CSSProperties | ((tone: 'ok' | 'fout' | 'muted') => CSSProperties)>
