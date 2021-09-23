type RuleName = 'name' | 'email' | 'password' | 'address' | 'city' | 'tel' | 'postalCode' | 'message';

type RuleType = { RegEx: string; msg: string };

type RulesType = Record<RuleName, RuleType>;
