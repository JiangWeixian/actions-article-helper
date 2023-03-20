export declare const DEBUG_KEY = "neo:article-helper";
export declare const COMMENT_AUTHOR: Set<string>;
export declare const prefix = "<!--article-helper-->";
export declare const prompts: {
    check: import("lodash").TemplateExecutor;
    summarize: import("lodash").TemplateExecutor;
};
export declare const codeBlockRE: RegExp;
