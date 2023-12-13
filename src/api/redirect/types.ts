export type ArcRedirectRuleMatchType = {
  caseSensitive: boolean;
  matchOperator: string;
  matchType: string;
  matchValue: string;
  negate: boolean;
};

export type ArcRedirectRuleContentType = {
  type: string;
  end: number;
  matches: ArcRedirectRuleMatchType[];
  name: string;
  redirectURL: string;
  start: number;
  statusCode: number;
  useIncomingQueryString: boolean;
  useRelativeUrl: string;
};

export type ArcRedirectRuleType = {
  status: string;
  id: string;
  siteId: string;
  policyType: string;
  sort_key: number;
  submittedBy: string;
  submittedAt: string;
  ruleContent: ArcRedirectRuleContentType;
};

export type ArcRedirectRulesResponse = {
  rules: ArcRedirectRuleType[];
};
