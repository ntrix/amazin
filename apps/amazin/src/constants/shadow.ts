/* shadow background layer */
export type ShadowType = 'scope' | 'navSearch' | 'navDrop' | 'sidebar' | '';

export const SHADOW: Record<string, ShadowType> = {
  SCOPE: 'scope',
  NAV_SEARCH: 'navSearch',
  NAV_DD: 'navDrop',
  SIDEBAR: 'sidebar'
};
