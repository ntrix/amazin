type RuleName = 'name' | 'email' | 'password' | 'address' | 'city' | 'tel' | 'postalCode' | 'message' | 'required';

type RuleType = [string, string];

type RuleListType = Record<RuleName, RuleType[]>;
