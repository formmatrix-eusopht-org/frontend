import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./TransactionsContainer.css";
import { useScenarioContext, Subsection } from "@/context/ScenarioContext";

const TypeContainer: React.FC = () => {
  const { 
    scenarios, 
    activeScenarios, 
    setActiveScenarios, 
    activeSubOptions, 
    setActiveSubOptions,
    setSelectedSubsection
  } = useScenarioContext();
  
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsOpen(true); 
      } else {
        setIsOpen(false); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScenarioSelect = (scenarioName: string, isChecked: boolean): void => {
    console.log(`Selecting scenario: ${scenarioName}, checked: ${isChecked}`);
    
    // Update active scenarios
    setActiveScenarios(prev => {
      const updated = { ...prev, [scenarioName]: isChecked };
      
      // Handle mutual exclusivities and dependencies
      if (isChecked) {
        // Simple Transfer
        if (scenarioName === 'Simple Transfer') {
          updated['Multiple Transfer'] = false;
          updated['Duplicate Registration'] = false;
          updated['Duplicate Title'] = false;
          updated['Name Change'] = false;
          updated['Change of Address'] = false;
        }
        
        // Multiple Transfer
        else if (scenarioName === 'Multiple Transfer') {
          updated['Simple Transfer'] = false;
          updated['Duplicate Registration'] = false;
          updated['Name Change'] = false;
          updated['Change of Address'] = false;
        }
        
        // Duplicate Title
        else if (scenarioName === 'Duplicate Title') {
          updated['Simple Transfer'] = false;
          updated['Duplicate Registration'] = false;
        }
        
        // Duplicate Registration
        else if (scenarioName === 'Duplicate Registration') {
          updated['Duplicate Title'] = false;
        }
        
        // Duplicate Stickers
        else if (scenarioName === 'Duplicate Stickers') {
          updated['Duplicate Plates & Stickers'] = false;
          updated['Filing for Planned Non-Operation (PNO)'] = false;
        }
        
        // Duplicate Plates & Stickers
        else if (scenarioName === 'Duplicate Plates & Stickers') {
          updated['Duplicate Stickers'] = false;
          updated['Filing for Planned Non-Operation (PNO)'] = false;
          updated['Personalized Plates'] = false;
          updated['Disabled Person Placards/Plates'] = false;
        }
        
        // Name Change
        else if (scenarioName === 'Name Change') {
          updated['Simple Transfer'] = false;
        }
        
        // Change of Address
        else if (scenarioName === 'Change of Address') {
          updated['Simple Transfer'] = false;
        }
        
        // Filing for Planned Non-Operation (PNO)
        else if (scenarioName === 'Filing for Planned Non-Operation (PNO)') {
          updated['Restoring PNO Vehicle to Operational'] = false;
          updated['Certificate of Non-Operation'] = false;
          updated['Duplicate Stickers'] = false;
          updated['Duplicate Plates & Stickers'] = false;
        }
        
        // Restoring PNO Vehicle to Operational
        else if (scenarioName === 'Restoring PNO Vehicle to Operational') {
          updated['Filing for Planned Non-Operation (PNO)'] = false;
        }
        
        // Certificate of Non-Operation
        else if (scenarioName === 'Certificate of Non-Operation') {
          updated['Filing for Planned Non-Operation (PNO)'] = false;
        }
        
        // Personalized Plates
        else if (scenarioName === 'Personalized Plates') {
          updated['Disabled Person Placards/Plates'] = false;
          updated['Duplicate Plates & Stickers'] = false;
        }
        
        // Disabled Person Placards/Plates
        else if (scenarioName === 'Disabled Person Placards/Plates') {
          updated['Personalized Plates'] = false;
          updated['Duplicate Plates & Stickers'] = false;
        }
        
        // Commercial Vehicle
        else if (scenarioName === 'Commercial Vehicle') {
          updated['Salvage'] = false;
        }
        
        // Salvage
        else if (scenarioName === 'Salvage') {
          updated['Commercial Vehicle'] = false;
        }
        
        // Add Lienholder
        else if (scenarioName === 'Add Lienholder') {
          updated['Remove Lienholder'] = false;
        }
        
        // Remove Lienholder
        else if (scenarioName === 'Remove Lienholder') {
          updated['Add Lienholder'] = false;
        }
      }
      
      console.log('Updated activeScenarios:', updated);
      return updated;
    });

    if (isChecked) {
      setSelectedSubsection(scenarioName);
    }

    if (scenarioName === 'Duplicate Stickers') {
      if (isChecked) {
        setActiveSubOptions(prev => ({
          ...prev,
          'Duplicate Stickers-Month': true,
          'Duplicate Stickers-Year': true
        }));
      } else {
        setActiveSubOptions(prev => ({
          ...prev,
          'Duplicate Stickers-Month': false,
          'Duplicate Stickers-Year': false
        }));
      }
    }
    
    if (scenarioName === 'Name Change') {
      if (isChecked) {
        setActiveSubOptions(prev => ({
          ...prev,
          'Name Change-Name Correction': true,
          'Name Change-Legal Name Change': false,
          'Name Change-Name Discrepancy': false
        }));
      } else {
        setActiveSubOptions(prev => {
          const updated = { ...prev };
          delete updated['Name Change-Name Correction'];
          delete updated['Name Change-Legal Name Change'];
          delete updated['Name Change-Name Discrepancy'];
          return updated;
        });
      }
    }
    
    if (scenarioName === 'Personalized Plates' && !isChecked) {
      setActiveSubOptions(prev => {
        const updated = { ...prev };
        delete updated['Personalized Plates-Order'];
        delete updated['Personalized Plates-Replace'];
        delete updated['Personalized Plates-Reassign/Retain'];
        delete updated['Personalized Plates-Exchange'];
        return updated;
      });
    }
  };

  const handleSubOptionSelect = (parentName: string, subOptionName: string, isChecked: boolean): void => {
    const optionKey = `${parentName}-${subOptionName}`;
    console.log(`Selecting sub-option: ${optionKey}, checked: ${isChecked}`);
    
    if (parentName === 'Name Change') {
      const updatedOptions = { ...activeSubOptions };

      if (isChecked) {
        Object.keys(updatedOptions).forEach(key => {
          if (key.startsWith('Name Change-')) {
            updatedOptions[key] = false;
          }
        });
        
        updatedOptions[optionKey] = true;
      } else {
        updatedOptions[optionKey] = false;
      }
      
      console.log('Updated activeSubOptions for Name Change:', updatedOptions);
      setActiveSubOptions(updatedOptions);
      
      if (!activeScenarios['Name Change']) {
        console.log('Auto-selecting Name Change parent option');
        setActiveScenarios(prev => ({
          ...prev,
          'Name Change': true
        }));
      }
    } 
    else if (parentName === 'Personalized Plates' && isChecked) {
      const updatedOptions = { ...activeSubOptions };
      Object.keys(updatedOptions).forEach(key => {
        if (key.startsWith('Personalized Plates-')) {
          updatedOptions[key] = false;
        }
      });
      
      updatedOptions[optionKey] = true;
      
      console.log('Updated activeSubOptions for Personalized Plates:', updatedOptions);
      setActiveSubOptions(updatedOptions);
      
      if (!activeScenarios['Personalized Plates']) {
        console.log('Auto-selecting Personalized Plates parent option');
        setActiveScenarios(prev => ({
          ...prev,
          'Personalized Plates': true
        }));
      }
    } 
    else {
      setActiveSubOptions(prev => {
        const updated = {
          ...prev,
          [optionKey]: isChecked
        };
        console.log('Updated activeSubOptions:', updated);
        return updated;
      });
    }
  };

  const isCheckboxDisabled = (subsection: string): boolean => {
    const mutualExclusions: Record<string, string[]> = {
      'Remove Lienholder': ['Add Lienholder'],
      'Add Lienholder': ['Remove Lienholder'],
      'Commercial Vehicle': ['Salvage'],
      'Salvage': ['Commercial Vehicle']
    };
  
    const scenarioDependencies: Record<string, string[]> = {
      'Simple Transfer': ['Multiple Transfer', 'Duplicate Registration', 'Duplicate Title', 'Name Change', 'Change of Address'],
      'Multiple Transfer': ['Simple Transfer', 'Duplicate Registration', 'Name Change', 'Change of Address'],
      'Duplicate Title': ['Simple Transfer', 'Duplicate Registration'],
      'Duplicate Registration': ['Duplicate Title'],
      'Duplicate Stickers': ['Duplicate Plates & Stickers', 'Filing for Planned Non-Operation (PNO)'],
      'Duplicate Plates & Stickers': ['Duplicate Stickers', 'Filing for Planned Non-Operation (PNO)', 'Personalized Plates', 'Disabled Person Placards/Plates'],
      'Name Change': ['Simple Transfer'],
      'Change of Address': ['Simple Transfer'],
      'Filing for Planned Non-Operation (PNO)': ['Restoring PNO Vehicle to Operational', 'Certificate of Non-Operation', 'Duplicate Stickers', 'Duplicate Plates & Stickers'],
      'Restoring PNO Vehicle to Operational': ['Filing for Planned Non-Operation (PNO)'],
      'Certificate of Non-Operation': ['Filing for Planned Non-Operation (PNO)'],
      'Personalized Plates': ['Disabled Person Placards/Plates', 'Duplicate Plates & Stickers'],
      'Disabled Person Placards/Plates': ['Personalized Plates', 'Duplicate Plates & Stickers']
    };
  
    if (mutualExclusions[subsection]?.some(excluded => activeScenarios[excluded])) {
      return true;
    }
  
    return Object.entries(activeScenarios).some(([scenario, isActive]) => 
      isActive && scenarioDependencies[scenario]?.includes(subsection)
    );
  };

  return (
    <div className={`type-container-wrapper ${isOpen ? "open" : ""}`}>
      <button className="side-tab" onClick={() => setIsOpen(true)}>
        <span>Transactions</span>
      </button>

      <div className={`type-container ${isOpen ? "show" : ""}`}>
        <div className="header-container">
          <h2>Transactions</h2>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="close-icon" />
          </button>
        </div>

        <div className="transactionSections">
          {scenarios.map(({ transactionType, subsections }) => (
            <div key={transactionType} className="transaction-item">
              <h3 className="transaction-header">{transactionType}</h3>

              <div className="subsections">
                {subsections.map((subsection, index) =>
                  typeof subsection === "string" ? (
                    <label 
                      key={index} 
                      className={`checkbox-labelllll ${isCheckboxDisabled(subsection) ? 'disabled' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        className="checkbox"
                        checked={!!activeScenarios[subsection]}
                        onChange={(e) => handleScenarioSelect(subsection, e.target.checked)}
                        disabled={isCheckboxDisabled(subsection)}
                      />
                      {subsection}
                    </label>
                  ) : (
                    <div key={subsection.name} className="subsection-group">
                      <label 
                        className={`checkbox-labelllll ${isCheckboxDisabled(subsection.name) ? 'disabled' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          className="checkbox"
                          checked={!!activeScenarios[subsection.name]}
                          onChange={(e) => handleScenarioSelect(subsection.name, e.target.checked)}
                          disabled={isCheckboxDisabled(subsection.name)}
                        />
                        {subsection.name}
                      </label>

                      {subsection.subOptions && activeScenarios[subsection.name] && (
                        <div className="sub-options">
                          {subsection.subOptions.map((option, subIndex) => (
                            <label key={subIndex} className="sub-option-label">
                              <input 
                                type="checkbox" 
                                className="checkbox"
                                checked={!!activeSubOptions[`${subsection.name}-${option}`]}
                                onChange={(e) => handleSubOptionSelect(subsection.name, option, e.target.checked)}
                                data-testid={`${subsection.name.toLowerCase().replace(/\s+/g, '-')}-${option.toLowerCase().replace(/\s+/g, '-')}`}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeContainer;