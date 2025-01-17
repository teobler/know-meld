"use client"

import { useState } from "react";
import RequirementRefine from "@/components/business/RequirementRefine";
import FeatureUserStoryGenerate from "@/components/business/FeatureUserStoryGenerate";
import { Feature, Story } from "@/app/genify.type";
import ClickableSteps from "@/components/steps/ClickableSteps";
import UseCaseGenerate from "@/components/business/UseCaseGenerate";

type Step = "requirementRefine" | "featureUserStoryGenerate" | "useCaseGenerate";

export default function Page() {
    const [currentStep, setCurrentStep] = useState<Step>("requirementRefine");
    const [requirements, setRequirements] = useState("");
    const [selectedFeatureStories, setSelectedFeatureStories] = useState<Feature>();

    const handleRequirementRefineFinish = (requirements: string) => {
        setCurrentStep("featureUserStoryGenerate");
        setRequirements(requirements);
    }

    const handleFeatureStoriesSelected = (value: { selectedFeature: Feature, selectedStories: Story[] }) => {
        setCurrentStep("useCaseGenerate");
        setSelectedFeatureStories({ ...value.selectedFeature, stories: value.selectedStories });
    }

    const stepList = ["requirementRefine", "featureUserStoryGenerate", "useCaseGenerate"];
    function handleStepOnchange(selectedStep: string): void {
        setCurrentStep(selectedStep as Step);
    }

    const handleUseCaseGenerated = () => {
        console.log("use case generated");
    }

    const renderContent = () => {

        switch (currentStep) {
            case "requirementRefine":
                return (
                    <RequirementRefine historicalContent={requirements} handleFinishAction={handleRequirementRefineFinish} />
                );
            case "featureUserStoryGenerate":
                return (
                    <FeatureUserStoryGenerate contentInput={requirements} handleFinishAction={handleFeatureStoriesSelected} />
                );
            case "useCaseGenerate":
                return (
                    <UseCaseGenerate contentInput={{ requirements, selectedFeatureStories }} handleFinishAction={handleUseCaseGenerated} />
                )
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ClickableSteps currentStep={currentStep} stepList={stepList} handleStepOnchangeAction={handleStepOnchange} />
            {renderContent()}
        </div>
    );
}