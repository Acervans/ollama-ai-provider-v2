import { z } from 'zod';
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const ollamaErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),

    // The additional information below is handled loosely to support
    // Ollama-compatible providers that have slightly different error
    // responses:
    type: z.string().nullish(),
    param: z.any().nullish(),
    code: z.union([z.string(), z.number()]).nullish(),
  }),
});

export type OllamaErrorData = z.infer<typeof ollamaErrorDataSchema>;

export const ollamaFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: ollamaErrorDataSchema,
  errorToMessage: data => data.error.message,
});
