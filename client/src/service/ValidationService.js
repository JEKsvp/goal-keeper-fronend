export default class ValidationService {

    /* Creates container with rule and parameter for rule execution*/
    static ruleContainer(rule, param) {
        return {rule: rule, param: param}
    }

    /* Execute rules one by one with parameter from containers.
        if rule does not return TRUE, throw exception with returned value
    */
    static validate(ruleContainers) {
        for (const container of ruleContainers) {
            let ruleResult = container.rule(container.param);
            if (ruleResult !== true) {
                throw ruleResult;
            }
        }
    }

    static getInvalidParameterNumber(ruleContainers) {
        for (let i = 0; i < ruleContainers.length; i++) {
            if (ruleContainers[i].rule(ruleContainers[i].param) !== true) {
                return i
            }
        }
    }
}