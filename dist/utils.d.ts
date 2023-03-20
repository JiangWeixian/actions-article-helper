export declare const getTokenCount: (text: string) => Promise<number>;
/**
 * @description Preprocess markdown content, e.g.
 * - remove code blocks
 */
export declare const preprocess: (content: string, { removeCodeblocks }?: {
    removeCodeblocks: boolean;
}) => string;
export declare const formatComment: ({ article, summary }: {
    article: string;
    summary: string;
}) => string;
