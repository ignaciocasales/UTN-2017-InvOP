export default {
    name: 'simulation',

    data() {
        return {
            switchCostGain: 'ganancia',

            criteria: 'optimist',

            consequences: [
                {title: 'C1', field: 'C1'}
            ],

            alternatives: [
                [{'C1': ''}]
            ],

            hurwiczValue: 0.5,

            answer: ''
        }
    },

    methods: {
        /*
         * Add a consequence to the decision matrix.
         */
        addConsequence() {
            const number = this.consequences.length + 1;
            const consequence = 'C' + number.toString();
            this.alternatives.map((currentValue, index, array) => {
                currentValue.push({
                    [consequence]: ''
                });
                return currentValue;
            });
            this.consequences.push({title: consequence, field: consequence});
        },

        /*
         * Add an alternative to the decision matrix.
         */
        addAlternative() {
            let alternative = [];
            this.consequences.forEach((currentValue, index, array) => {
                alternative.push({
                    [currentValue.field]: ''
                });
            });
            this.alternatives.push(alternative);
        },

        /*
         * Delete a consequence from the decision matrix.
         */
        deleteConsequence(consequence, index) {
            this.alternatives.map((currentValue, index, array) => {
                currentValue.map((currentValue, index, array) => {
                    if (Object.keys(currentValue)[0] === consequence.field) {
                        array.splice(index, 1);
                    }
                });
                return currentValue;
            });
            this.consequences.splice(index, 1);
        },

        /*
         * Delete an alternative from the decision matrix.
         */
        deleteAlternative(index) {
            this.alternatives.splice(index, 1);
        },

        /*
         * Get the matrix of maximums.
         *
         * Returns an array of objects.
         */
        getMaximumsMatrix() {
            return this.alternatives.map((alternative, alternativeIndex, alternativeArray) => {
                let maximumRelativeObject = null;
                let maximumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue, index, array) => {
                    if ((parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]], 10) > parseInt(maximumRelativeValue, 10)) || (maximumRelativeValue === null)) {
                        maximumRelativeValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                        maximumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return maximumRelativeObject;
            });
        },

        /*
         * Get the matrix of minimums.
         *
         * Returns an array of objects.
         */
        getMinimumsMatrix() {
            return this.alternatives.map((alternative, alternativeIndex, alternativeArray) => {
                let minimumRelativeObject = null;
                let minimumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue, index, array) => {
                    if ((parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]], 10) < parseInt(minimumRelativeValue, 10)) || (minimumRelativeValue === null)) {
                        minimumRelativeValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                        minimumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return minimumRelativeObject;
            });
        },

        /*
         * Get the the maximum of the maximums.
         *
         * Returns the index of the MaxiMax in the alternatives array so we can display it.
         */
        getMaxiMax() {
            const maximumsMatrix = this.getMaximumsMatrix();
            let maxiMaxValue = null;
            let result = null;
            maximumsMatrix.forEach((alternative, alternativeIndex, alternativeArray) => {
                if ((parseInt(alternative[Object.keys(alternative)[0]], 10) > parseInt(maxiMaxValue, 10)) || (maxiMaxValue === null)) {
                    maxiMaxValue = alternative[Object.keys(alternative)[0]];
                    result = alternativeIndex;
                }
            });
            return result;
        },

        /*
        * Get the the minimum of the minimums.
        *
        * Returns the index of the MiniMin in the alternatives array so we can display it.
        */
        getMiniMin() {
            const minimumsMatrix = this.getMinimumsMatrix();
            let miniMinValue = null;
            let result = null;
            minimumsMatrix.forEach((alternative, alternativeIndex, alternativeArray) => {
                if ((parseInt(alternative[Object.keys(alternative)[0]], 10) < parseInt(miniMinValue, 10)) || (miniMinValue === null)) {
                    miniMinValue = alternative[Object.keys(alternative)[0]];
                    result = alternativeIndex;
                }
            });
            return result;
        },

        /*
         * Get the the minimum of the maximums.
         *
         * Returns the index of the MaxiMin in the alternatives array so we can display it.
         */
        getMaxiMin() {
            const maximumsMatrix = this.getMaximumsMatrix();
            let maxiMinValue = null;
            let result = null;
            maximumsMatrix.forEach((alternative, alternativeIndex, alternativeArray) => {
                if ((parseInt(alternative[Object.keys(alternative)[0]], 10) < parseInt(maxiMinValue, 10)) || (maxiMinValue === null)) {
                    maxiMinValue = alternative[Object.keys(alternative)[0]];
                    result = alternativeIndex;
                }
            });
            return result;
        },

        /*
        * Calculate optimist criteria.
        *
        * Returns as result the index in the alternatives array depending the criteria.
        */
        getOptimistCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getMaxiMax();
            } else if (this.switchCostGain === 'costo') {
                return this.getMiniMin();
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getMaxiMax();
            }
        },

        /*
         * Calculate pessimist criteria.
         *
         * Returns as result the index in the alternatives array depending the criteria.
         */
        getPessimistCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getMaxiMin();
            } else if (this.switchCostGain === 'costo') {
                // TODO: logic minimax.
                console.error('ERROR: NOT IMPLEMENTED');
                return 0;
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getMaxiMin();
            }
        },

        /*
         * Calculate Savage criteria.
         *
         * Returns as result the index in the alternatives array depending the criteria.
         */
        getSavageCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                // TODO: logic.
            } else if (this.switchCostGain === 'costo') {
                // TODO: logic.
            } else {
                // TODO: logic.
            }
        },

        /*
         * Calculate Laplace criteria.
         *
         * Returns as result the index in the alternatives array depending the criteria.
         */
        getLaplaceCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                // TODO: logic.
            } else if (this.switchCostGain === 'costo') {
                // TODO: logic.
            } else {
                // TODO: logic.
            }
        },

        /*
         * Calculate Hurwicz criteria.
         *
         * Returns as result the index in the alternatives array depending the criteria.
         */
        getHurwiczCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                // TODO: logic.
            } else if (this.switchCostGain === 'costo') {
                // TODO: logic.
            } else {
                // TODO: logic.
            }
        },

        resultCalc() {
            switch (this.criteria) {
                case "optimist":
                    this.answer = this.getOptimistCriteriaResult();
                    break;
                case "pessimist":
                    this.answer = this.getPessimistCriteriaResult();
                    break;
                case "savage":
                    console.log('TODO: savage');
                    break;
                case "laplace":
                    console.log('TODO: laplace');
                    break;
                case "hurwicz":
                    console.log('TODO: hurwicz');
                    break;
                default:
                    this.answer = this.getMaxiMax();
            }
        },

        /*
        * When an alternative changes from the inputs, calculate again.
        */
        changedAlternatives() {
            this.resultCalc();
        }
    },

    watch: {
        /*
        * When an alternative changes, calculate again.
        */
        alternatives: function () {
            this.resultCalc();
        },

        /*
        * When an consequence changes, calculate again.
        */
        consequences: function () {
            this.resultCalc();
        },

        /*
        * When the criteria changes, calculate again.
        */
        criteria: function () {
            this.resultCalc();
        },

        /*
        * When switchCostGain changes, calculate again.
        */
        switchCostGain: function () {
            this.resultCalc();
        }
    }
}
