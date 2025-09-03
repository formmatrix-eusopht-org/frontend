"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { seneriosDetails } from "../Data/seneriosDetails";

type Field = {
  label: string;
  type?: string;
  placeholder?: string;
};

type SubOption = {
  label: string;
  type: string;
};

type Block = {
  refernce?: string;
  reference?: string;
  blockName: string;
  fields?: Field[];
  subOption?: SubOption[];
};

type FormScenario = {
  form: string;
  blocks: Block[];
};

type SenerioContextType = {
  senerio: string[];
  setSenerio: (senerio: string[] | ((prev: string[]) => string[])) => void;
  formData: Block[];
};

const LOCAL_STORAGE_KEY = "senerio";

const buildCombinedForm = (
  formNames: string[],
  seneriosForForms: FormScenario[]
): FormScenario => {
  const combinedBlocksMap: Record<string, Block> = {};

  formNames?.forEach((formName) => {
    const form = seneriosForForms?.find((f) => f.form === formName);
    if (!form) return;

    form.blocks.forEach((block) => {
      const key = block.reference || block.blockName;

      if (combinedBlocksMap[key]) {
        const existingBlock = combinedBlocksMap[key];

        const mergedFields = [
          ...(existingBlock.fields || []),
          ...(block.fields || []),
        ];
        const uniqueFields = Array.from(
          new Map(mergedFields.map((f) => [f.label, f])).values()
        );

        const mergedSubOptions = [
          ...(existingBlock.subOption || []),
          ...(block.subOption || []),
        ];
        const uniqueSubOptions = Array.from(
          new Map(mergedSubOptions.map((s) => [s.label, s])).values()
        );

        combinedBlocksMap[key] = {
          ...existingBlock,
          fields: uniqueFields,
          subOption: uniqueSubOptions.length > 0 ? uniqueSubOptions : undefined,
        };
      } else {
        combinedBlocksMap[key] = { ...block };
      }
    });
  });

  return {
    form: `Combined Form: ${formNames.join(" + ")}`,
    blocks: Object.values(combinedBlocksMap),
  };
};

const SenerioContext = createContext<SenerioContextType | undefined>(undefined);

export const SenerioProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Load from localStorage right away
  const [senerio, setSenerio] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      try {
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [formData, setFormData] = useState<Block[]>([]);

  // Rebuild formData whenever senerio changes
  useEffect(() => {
    const combined = buildCombinedForm(senerio, seneriosDetails);
    setFormData(combined.blocks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(senerio));
  }, [senerio]);

  const senerioValues = { senerio, setSenerio, formData };

  return (
    <SenerioContext.Provider value={senerioValues}>
      {children}
    </SenerioContext.Provider>
  );
};

export const useSenerioContext = (): SenerioContextType => {
  const context = useContext(SenerioContext);
  if (!context) {
    throw new Error("useSenerioContext must be used within SenerioProvider");
  }
  return context;
};
