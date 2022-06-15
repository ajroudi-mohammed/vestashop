import { jsonApi } from "@spree/storefront-api-v2-sdk";
import SpreeResponseContentError from "../errors/SpreeResponseContentError";
import sortOptionsByPosition from "../utils/sort-option-types";
const isColorProductOption = (productOption)=>{
    return productOption.displayName === "Color";
};
const expandOptions = (spreeSuccessResponse, spreeOptionValue, accumulatedOptions)=>{
    const spreeOptionTypeIdentifier = spreeOptionValue.relationships.option_type.data;
    const existingOptionIndex = accumulatedOptions.findIndex((option)=>option.id == spreeOptionTypeIdentifier.id);
    let option1;
    if (existingOptionIndex === -1) {
        const spreeOptionType = jsonApi.findDocument(spreeSuccessResponse, spreeOptionTypeIdentifier);
        if (!spreeOptionType) {
            throw new SpreeResponseContentError(`Option type with id ${spreeOptionTypeIdentifier.id} not found.`);
        }
        option1 = {
            __typename: "MultipleChoiceOption",
            id: spreeOptionType.id,
            displayName: spreeOptionType.attributes.presentation,
            position: spreeOptionType.attributes.position,
            values: []
        };
    } else {
        const existingOption = accumulatedOptions[existingOptionIndex];
        option1 = existingOption;
    }
    let optionValue1;
    const label = isColorProductOption(option1) ? spreeOptionValue.attributes.name : spreeOptionValue.attributes.presentation;
    const productOptionValueExists = option1.values.some((optionValue)=>optionValue.label === label);
    if (!productOptionValueExists) {
        if (isColorProductOption(option1)) {
            optionValue1 = {
                label,
                hexColors: [
                    spreeOptionValue.attributes.presentation
                ]
            };
        } else {
            optionValue1 = {
                label
            };
        }
        if (existingOptionIndex === -1) {
            return [
                ...accumulatedOptions,
                {
                    ...option1,
                    values: [
                        optionValue1
                    ]
                }, 
            ];
        }
        const expandedOptionValues = [
            ...option1.values,
            optionValue1
        ];
        const expandedOptions = [
            ...accumulatedOptions
        ];
        expandedOptions[existingOptionIndex] = {
            ...option1,
            values: expandedOptionValues
        };
        const sortedOptions = sortOptionsByPosition(expandedOptions);
        return sortedOptions;
    }
    return accumulatedOptions;
};
export default expandOptions;
