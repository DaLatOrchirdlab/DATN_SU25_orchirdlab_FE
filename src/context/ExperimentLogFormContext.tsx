import React, { createContext, useContext, useState } from 'react';

export type MethodType = 1 | 2; // 1: Cấy mô, 2: Lai ghép

export interface ExperimentLogFormData {
  methodID?: string; // chọn ở bước 1
  methodName?: string; // chỉ để hiển thị
  tissueCultureBatchID?: string; // chọn ở bước 1
  batchName?: string; // chỉ để hiển thị
  hybridization?: string[]; // chọn ở bước 2
  hybridizationNames?: string[]; // chỉ để hiển thị
  motherID?: string; // chọn ở bước 2
  motherName?: string; // chỉ để hiển thị
  description?: string; // nhập ở bước 3
}

interface ExperimentLogFormContextType {
  form: ExperimentLogFormData;
  setForm: React.Dispatch<React.SetStateAction<ExperimentLogFormData>>;
  resetForm: () => void;
}

const defaultForm: ExperimentLogFormData = {
  methodID: '',
  methodName: '',
  tissueCultureBatchID: '',
  batchName: '',
  hybridization: [],
  hybridizationNames: [],
  motherID: '',
  motherName: '',
  description: '',
};

const ExperimentLogFormContext = createContext<ExperimentLogFormContextType | undefined>(undefined);

export function useExperimentLogForm() {
  const context = useContext(ExperimentLogFormContext);
  if (!context) {
    throw new Error('useExperimentLogForm must be used within an ExperimentLogFormProvider');
  }
  return context;
}

export function ExperimentLogFormProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<ExperimentLogFormData>(defaultForm);
  const resetForm = () => setForm(defaultForm);
  return (
    <ExperimentLogFormContext.Provider value={{ form, setForm, resetForm }}>
      {children}
    </ExperimentLogFormContext.Provider>
  );
} 