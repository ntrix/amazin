import { validateRules } from 'src/constants';

export const validate = (type: string, value = '') => {
  const rules = validateRules[type as RuleName];
  if (!rules?.length) return '';

  const errorCombinedMessage = rules.reduce(
    (acc, [msg, rule = '']) => acc + (new RegExp(rule).test(value) ? '' : msg),
    ''
  );
  return errorCombinedMessage;
};

export const validateAll = (validRules: ValidateType) =>
  Object.keys(validRules).some((rule) => validate(rule, validRules[rule as RuleName]))
    ? 'Please double check the required (*) information!'
    : '';
