"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, use } from "react";
import { seneriosDetails } from "../Data/seneriosDetails";
type Field = {
  label: string;
  type?: string;
  placeholder?: string;
};

type SubOption = {
  lable: string;
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

      // If this block already exists, merge its fields
      if (combinedBlocksMap[key]) {
        const existingBlock = combinedBlocksMap[key];

        // Merge fields without duplicates
        const mergedFields = [
          ...(existingBlock.fields || []),
          ...(block.fields || []),
        ];

        const uniqueFields = Array.from(
          new Map(mergedFields.map((f) => [f.label, f])).values()
        );

        // Merge subOptions if any
        const mergedSubOptions = [
          ...(existingBlock.subOption || []),
          ...(block.subOption || []),
        ];

        const uniqueSubOptions = Array.from(
          new Map(mergedSubOptions.map((s) => [s.lable, s])).values()
        );

        combinedBlocksMap[key] = {
          ...existingBlock,
          fields: uniqueFields,
          subOption: uniqueSubOptions.length > 0 ? uniqueSubOptions : undefined,
        };
      } else {
        // Add new block
        combinedBlocksMap[key] = { ...block };
      }
    });
  });

  return {
    form: `Combined Form: ${formNames.join(" + ")}`,
    blocks: Object.values(combinedBlocksMap),
  };
};

type SenerioContextType = {
  senerio: string[];
  setSenerio: (senerio: string[] | ((prev: string[]) => string[])) => void;
  formData: any[];
};


const SenerioContext = createContext<SenerioContextType | undefined>(undefined);

export const SenerioProvider = ({ children }: { children: ReactNode }) => {
  const isInitialMount = useRef(true);
  const LOCAL_STORAGE_KEY = "senerio";
  const [senerio, setSenerio] = useState<string[]>([]);
  const [formData, setFormData] = useState<object[]>([]);

  // const clearSenerio = () => setSenerio([]);
  useEffect(() => {
    const combined = buildCombinedForm(
      senerio,
      seneriosDetails
    );
    setFormData(combined.blocks);
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Skip saving on first load
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(senerio));
  }, [senerio]);
  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (Array.isArray(parsedState)) {
        setSenerio(parsedState);
      } else {
        console.warn("Invalid senerio data in localStorage, resetting to empty array.");
        setSenerio([]);
      }
    }
  }, [])
  const senerioValues = { senerio, setSenerio,  formData }
  return (
    <SenerioContext.Provider value={senerioValues}>
      {children}
    </SenerioContext.Provider>
  );
};

export const useSenerioContext = (): SenerioContextType => {
  const context = useContext(SenerioContext);
  if (!context) throw new Error("useSenerioContext must be used within SenerioProvider");
  return context;
};
