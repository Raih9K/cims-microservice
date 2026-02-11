export interface FormConfig {
  formId: string;
  mockResponseFile: string;
  mockApiEndpoint: string;
  fields: Record<string, string>; // Maps UI field name to API field name
}

export interface FormSubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export const useFormEngine = (config: FormConfig) => {
  const submitForm = async (formData: any): Promise<FormSubmissionResult> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Construct Mock Request Body (for logging or potential future use)
      let requestBody: Record<string, any> = {};

      if (config.fields && Object.keys(config.fields).length > 0) {
        Object.keys(config.fields).forEach(key => {
          requestBody[config.fields[key]] = formData[key];
        });
      } else {
        // If no mapping is defined, send the raw formData
        requestBody = formData;
      }

      console.log(`[FormEngine] Submitting ${config.formId}`, requestBody);

      // Fetch Mock Response
      const response = await fetch(config.mockApiEndpoint);
      if (!response.ok) {
        throw new Error(`Mock API error: ${response.statusText}`);
      }

      const mockData = await response.json();

      // In a real scenario, we might validate the mock data against the request
      // For now, we return the mock success response
      return { success: true, data: mockData };

    } catch (error: any) {
      console.error(`[FormEngine] Error submitting ${config.formId}`, error);
      return { success: false, error: error.message || 'Submission failed' };
    }
  };

  return { submitForm };
};
