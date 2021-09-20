type RuleName = 'name' | 'email' | 'password' | 'address' | 'tel' | 'zip' | 'message';

type RuleType = { RegEx: string; msg: string };

type RulesType = Record<RuleName, RuleType>;
