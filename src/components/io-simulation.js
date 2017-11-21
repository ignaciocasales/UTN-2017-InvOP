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

            hurwiczLambda: 0.5,

            answer: '',

            answerValue: '',

            isMoreThanOneResultFlag: false
        }
    },

    methods: {
        /**
         * Add a consequence to the
         * decision matrix.
         */
        addConsequence() {
            const number = this.consequences.length + 1;
            const consequence = 'C' + number.toString();
            this.alternatives.map((currentValue) => {
                currentValue.push({
                    [consequence]: ''
                });
                return currentValue;
            });
            this.consequences.push({title: consequence, field: consequence});
        },

        /**
         * Add an alternative to the
         * decision matrix.
         */
        addAlternative() {
            let alternative = [];
            this.consequences.forEach((currentValue) => {
                alternative.push({
                    [currentValue.field]: ''
                });
            });
            this.alternatives.push(alternative);
        },

        /**
         * Delete a consequence from the
         * decision matrix.
         */
        deleteConsequence(consequence, index) {
            this.alternatives.map((currentValue) => {
                currentValue.map((currentValue, index, array) => {
                    if (Object.keys(currentValue)[0] === consequence.field) {
                        array.splice(index, 1);
                    }
                });
                return currentValue;
            });
            this.consequences.splice(index, 1);
        },

        /**
         * Delete an alternative from the
         * decision matrix.
         */
        deleteAlternative(index) {
            this.alternatives.splice(index, 1);
        },

        /**
         * Get the matrix of maximums.
         * Returns an array of objects.
         */
        getMaximumsMatrix() {
            return this.alternatives.map((alternative) => {
                let maximumRelativeObject = null;
                let maximumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue) => {
                    if ((parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]], 10) > parseInt(maximumRelativeValue, 10)) || (maximumRelativeValue === null)) {
                        maximumRelativeValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                        maximumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return maximumRelativeObject;
            });
        },

        /**
         * Get the matrix of minimums.
         * Returns an array of objects.
         */
        getMinimumsMatrix() {
            return this.alternatives.map((alternative) => {
                let minimumRelativeObject = null;
                let minimumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue) => {
                    if ((parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]], 10) < parseInt(minimumRelativeValue, 10)) || (minimumRelativeValue === null)) {
                        minimumRelativeValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                        minimumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return minimumRelativeObject;
            });
        },

        /**
         *  Get maximums values for each
         *  column.
         */
        getColumnsMaxValues() {
            let columnsMaxValues = [];

            this.alternatives.forEach((alternative) => {
                alternative.forEach((alternativeConsequenceValue, index) => {
                    const currentValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                    let currentColumnMaxValue = null;
                    if (typeof columnsMaxValues[index] === 'undefined') {
                        currentColumnMaxValue = currentValue;
                    } else {
                        currentColumnMaxValue = columnsMaxValues[index][Object.keys(columnsMaxValues[index])[0]];
                    }
                    if ((parseInt(currentValue, 10) >= parseInt(currentColumnMaxValue, 10)) || (currentColumnMaxValue === null) || (currentValue === "")) {
                        columnsMaxValues[index] = alternativeConsequenceValue;
                    }
                });
            });

            return columnsMaxValues;
        },

        /**
         * Get minimums values for each
         * column.
         */
        getColumnsMinValues() {
            let columnsMinValues = [];

            this.alternatives.forEach((alternative) => {
                alternative.forEach((alternativeConsequenceValue, index) => {
                    const currentValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                    let currentColumnMinValue = null;
                    if (typeof columnsMinValues[index] === 'undefined') {
                        currentColumnMinValue = currentValue;
                    } else {
                        currentColumnMinValue = columnsMinValues[index][Object.keys(columnsMinValues[index])[0]];
                    }
                    if ((parseInt(currentValue, 10) <= parseInt(currentColumnMinValue, 10)) || (currentColumnMinValue === null) || (currentValue === "")) {
                        columnsMinValues[index] = alternativeConsequenceValue;
                    }
                });
            });

            return columnsMinValues;
        },

        /**
         * Get the Savage gain matrix.
         */
        getSavageGainMatrix() {
            const columnsMaxValues = this.getColumnsMaxValues();
            return this.alternatives.map((alternative) => {
                return alternative.map((alternativeConsequenceValue, index) => {
                    const currentColumnMaxValue = columnsMaxValues[index][Object.keys(columnsMaxValues[index])[0]];
                    const currentValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];

                    return Object.keys(alternativeConsequenceValue)[0] = currentColumnMaxValue - currentValue;
                });
            });
        },

        /**
         * Get the Savage cost matrix.
         */
        getSavageCostMatrix() {
            const columnsMinValues = this.getColumnsMinValues();

            return this.alternatives.map((alternative) => {
                return alternative.map((alternativeConsequenceValue, index) => {
                    const currentColumnMinValue = columnsMinValues[index][Object.keys(columnsMinValues[index])[0]];
                    const currentValue = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];

                    return Object.keys(alternativeConsequenceValue)[0] = currentValue - currentColumnMinValue;
                });
            });
        },

        /**
         * Get the Savage gain matrix.
         */
        getSavageMaximumsGainResultsMatrix() {
            return this.getSavageGainMatrix().map((alternative) => {
                let maximumRelativeObject = null;
                let maximumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue) => {
                    if ((parseInt(alternativeConsequenceValue, 10) > parseInt(maximumRelativeValue, 10)) || (maximumRelativeValue === null)) {
                        maximumRelativeValue = alternativeConsequenceValue;
                        maximumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return maximumRelativeObject;
            });
        },

        /**
         * Get the Savage cost matrix.
         */
        getSavageMaximumsCostResultsMatrix() {
            return this.getSavageCostMatrix().map((alternative) => {
                let maximumRelativeObject = null;
                let maximumRelativeValue = null;
                alternative.forEach((alternativeConsequenceValue) => {
                    if ((parseInt(alternativeConsequenceValue, 10) > parseInt(maximumRelativeValue, 10)) || (maximumRelativeValue === null)) {
                        maximumRelativeValue = alternativeConsequenceValue;
                        maximumRelativeObject = alternativeConsequenceValue;
                    }
                });
                return maximumRelativeObject;
            });
        },

        /**
         * Get the matrix following the
         * Laplace criteria.
         * Returns an array of objects.
         */
        getAveragesMatrix() {
            return this.alternatives.map((alternative) => {
                let averageObject;
                let sum = 0;

                alternative.forEach((alternativeConsequenceValue) => {
                    sum += parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]]);
                });

                averageObject = {
                    value: sum / alternative.length
                };

                return averageObject;
            });
        },

        /**
         * Get the Hurwicz calculation.
         */
        getHurwiczCalculationResult(bestValue, worstValue) {
            const lambda = this.hurwiczLambda;

            return ((lambda * (bestValue)) + ((1 - lambda) * (worstValue)));
        },

        /**
         * Get the matrix following the
         * Hurwicz criteria.
         * Returns an array of objects.
         */
        getHurwiczMatrix() {
            // Both matrix should have the same length.
            const maximumsMatrix = this.getMaximumsMatrix();
            const minimumsMatrix = this.getMinimumsMatrix();

            const resultMatrix = [];

            if (this.switchCostGain === 'ganancia') {
                maximumsMatrix.forEach((currentValue, index) => {
                    resultMatrix.push({
                        value: this.getHurwiczCalculationResult(
                            currentValue[Object.keys(currentValue)[0]],
                            minimumsMatrix[index][Object.keys(minimumsMatrix[index])[0]]
                        )
                    });
                });
            } else if (this.switchCostGain === 'costo') {
                maximumsMatrix.forEach((currentValue, index) => {
                    resultMatrix.push({
                        value: this.getHurwiczCalculationResult(
                            minimumsMatrix[index][Object.keys(minimumsMatrix[index])[0]],
                            currentValue[Object.keys(currentValue)[0]]
                        )
                    });
                });
            }


            return resultMatrix;
        },

        /**
         * Returns the index of the maximum value of
         * a given array.
         */
        getMax(matrix) {
            let maxiMaxValue = null;
            let result = null;
            matrix.forEach((alternative, alternativeIndex) => {
                if ((parseInt(alternative[Object.keys(alternative)[0]], 10) > parseInt(maxiMaxValue, 10)) || (maxiMaxValue === null)) {
                    maxiMaxValue = alternative[Object.keys(alternative)[0]];
                    result = alternativeIndex;
                }
            });
            return result;
        },

        /**
         * Returns the index of the minimum value of
         * a given array.
         */
        getMin(matrix) {
            let miniMinValue = null;
            let result = null;
            matrix.forEach((alternative, alternativeIndex) => {
                if ((parseInt(alternative[Object.keys(alternative)[0]], 10) < parseInt(miniMinValue, 10)) || (miniMinValue === null)) {
                    miniMinValue = alternative[Object.keys(alternative)[0]];
                    result = alternativeIndex;
                }
            });
            return result;
        },

        isMoreThanOneResult(matrix, answer) {
            this.isMoreThanOneResultFlag = false;
            let count = 0;
            switch (this.criteria) {
                case "optimist":
                    count = 0;
                    matrix.forEach((currentValue,index) => {
                        if (matrix[answer][Object.keys(matrix[answer])[0]] === currentValue[Object.keys(currentValue)[0]]) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        this.isMoreThanOneResultFlag = true;
                    }
                    return;
                case "pessimist":
                    count = 0;
                    matrix.forEach((currentValue,index) => {
                        if (matrix[answer][Object.keys(matrix[answer])[0]] === currentValue[Object.keys(currentValue)[0]]) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        this.isMoreThanOneResultFlag = true;
                    }
                    return;
                case "savage":
                    count = 0;
                    matrix.forEach((currentValue,index) => {
                        if (matrix[answer] === currentValue) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        this.isMoreThanOneResultFlag = true;
                    }
                    return;
                case "laplace":
                    count = 0;
                    matrix.forEach((currentValue,index) => {
                        if (matrix[answer][Object.keys(matrix[answer])[0]] === currentValue[Object.keys(currentValue)[0]]) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        this.isMoreThanOneResultFlag = true;
                    }
                    return;
                case "hurwicz":
                    count = 0;
                    matrix.forEach((currentValue,index) => {
                        if (matrix[answer][Object.keys(matrix[answer])[0]] === currentValue[Object.keys(currentValue)[0]]) {
                            count++;
                        }
                    });
                    if (count > 1) {
                        this.isMoreThanOneResultFlag = true;
                    }
                    return;
                default:
                    return;
            }
        },

        /**
         * Get the the maximum of the maximums.
         * Returns the index of the MaxiMax in the
         * alternatives array so we can display it.
         */
        getMaxiMax() {
            const matrix = this.getMaximumsMatrix();
            const answer = this.getMax(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Get the the minimum of the minimums.
         * Returns the index of the MiniMin in the
         * alternatives array so we can display it.
         */
        getMiniMin() {
            const matrix = this.getMinimumsMatrix();
            const answer = this.getMin(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Get the the minimum of the maximums.
         * Returns the index of the MaxiMin in the
         * alternatives array so we can display it.
         */
        getMaxiMin() {
            const matrix = this.getMinimumsMatrix();
            const answer = this.getMax(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Get the the minimum of the maximums.
         * Returns the index of the MiniMax in the
         * alternatives array so we can display it.
         */
        getMiniMax() {
            const matrix = this.getMaximumsMatrix();
            const answer = this.getMin(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Get the the minimum from the Savage matrix.
         * Returns the index of the MaxLi in the
         * alternatives array so we can display it.
         */
        getSavageMiniMaxGain() {
            let miniMinValue = null;
            let result = null;
            const matrix = this.getSavageMaximumsGainResultsMatrix();
            matrix.forEach((alternative, alternativeIndex) => {
                if ((parseInt(alternative, 10) < parseInt(miniMinValue, 10)) || (miniMinValue === null)) {
                    miniMinValue = alternative;
                    result = alternativeIndex;
                }
            });
            this.answerValue = matrix[result];
            this.isMoreThanOneResult(matrix, result);
            return result;
        },

        /**
         * Get the the minimum from the Savage matrix.
         * Returns the index of the MaxLi in the
         * alternatives array so we can display it.
         */
        getSavageMiniMaxCost() {
            let miniMinValue = null;
            let result = null;
            const matrix = this.getSavageMaximumsCostResultsMatrix();
            matrix.forEach((alternative, alternativeIndex) => {
                if ((parseInt(alternative, 10) < parseInt(miniMinValue, 10)) || (miniMinValue === null)) {
                    miniMinValue = alternative;
                    result = alternativeIndex;
                }
            });
            this.answerValue = matrix[result];
            this.isMoreThanOneResult(matrix, result);
            return result;
        },

        /**
         * Get the the minimum of the averages.
         * Returns the index of the MaxLi in the
         * alternatives array so we can display it.
         */
        getMaxLi() {
            const matrix = this.getAveragesMatrix();
            const answer = this.getMax(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Get the the minimum of the averages.
         * Returns the index of the MinLi in the
         * alternatives array so we can display it.
         */
        getMinLi() {
            const matrix = this.getAveragesMatrix();
            const answer = this.getMin(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Returns the index of the MaxH in the
         * alternatives array so we can display it.
         */
        getMaxH() {
            const matrix = this.getHurwiczMatrix();
            const answer = this.getMax(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Returns the index of the MinH in the
         * alternatives array so we can display it.
         */
        getMinH() {
            const matrix = this.getHurwiczMatrix();
            const answer = this.getMin(matrix);
            this.answerValue = matrix[answer][Object.keys(matrix[answer])[0]];
            this.isMoreThanOneResult(matrix, answer);
            return answer;
        },

        /**
         * Calculate optimist criteria.
         * Returns as result the index in the
         * alternatives array depending the criteria.
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

        /**
         * Calculate pessimist criteria.
         * Returns as result the index in the
         * alternatives array depending the criteria.
         */
        getPessimistCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getMaxiMin();
            } else if (this.switchCostGain === 'costo') {
                return this.getMiniMax();
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getMaxiMin();
            }
        },

        /**
         * Calculate Savage criteria.
         * Returns as result the index in the
         * alternatives array depending the criteria.
         */
        getSavageCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getSavageMiniMaxGain();
            } else if (this.switchCostGain === 'costo') {
                return this.getSavageMiniMaxCost();
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getSavageMiniMaxGain();
            }
        },

        /**
         * Calculate Laplace criteria.
         * Returns as result the index in the
         * alternatives array depending the criteria.
         */
        getLaplaceCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getMaxLi();
            } else if (this.switchCostGain === 'costo') {
                return this.getMinLi();
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getMaxLi();
            }
        },

        /**
         * Calculate Hurwicz criteria.
         * Returns as result the index in the
         * alternatives array depending the criteria.
         */
        getHurwiczCriteriaResult() {
            if (this.switchCostGain === 'ganancia') {
                return this.getMaxH();
            } else if (this.switchCostGain === 'costo') {
                return this.getMinH();
            } else {
                console.warn('WARN: NO DEFAULT COST/GAIN SELECTED.');
                return this.getMaxH();
            }
        },

        getAnswerValue() {
            if ((this.answerValue === "") || (this.answerValue === 'undefined') || (this.answerValue === null) || (isNaN(this.answerValue))) {
                this.answerValue = 0;
            }

            return this.answerValue;
        },

        /**
         * Calculate the result depending the
         * criteria.
         */
        resultCalc() {
            if ((this.consequences.length <= 0) || (this.alternatives.length <= 0)) {
                this.answer = 0;
                return;
            }

            switch (this.criteria) {
                case "optimist":
                    this.answer = this.getOptimistCriteriaResult();
                    return;
                case "pessimist":
                    this.answer = this.getPessimistCriteriaResult();
                    return;
                case "savage":
                    this.answer = this.getSavageCriteriaResult();
                    return;
                case "laplace":
                    this.answer = this.getLaplaceCriteriaResult();
                    return;
                case "hurwicz":
                    this.answer = this.getHurwiczCriteriaResult();
                    return;
                default:
                    this.answer = this.getMaxiMax();
                    return;
            }
        },

        /**
         * When an alternative changes from the
         * inputs, calculate again.
         */
        changedAlternatives() {
            this.resultCalc();
        },

        hurwiczMaxMin() {
            if (this.hurwiczLambda > 1) {
                this.hurwiczLambda = 1;
            }
            if (this.hurwiczLambda < 0) {
                this.hurwiczLambda = 0;
            }
        }
    },

    watch: {
        /**
         * When an alternative changes, calculate again.
         */
        alternatives: function () {
            this.resultCalc();
        },

        /**
         * When an consequence changes, calculate again.
         */
        consequences: function () {
            this.resultCalc();
        },

        /**
         * When the criteria changes, calculate again.
         */
        criteria: function () {
            this.resultCalc();
        },

        /**
         * When switchCostGain changes, calculate again.
         */
        switchCostGain: function () {
            this.resultCalc();
        },

        hurwiczLambda: function () {
            this.hurwiczMaxMin();
        }
    }
}
