import { validateRules } from 'src/constants';

export const validate = (type = '', value = '') => {
  const rules = validateRules[type as RuleName];
  const errorCombinedMessage = rules.reduce((acc, [msg, rule]) => acc + (!new RegExp(rule).test(value) ? msg : ''), '');
  return errorCombinedMessage;
};
