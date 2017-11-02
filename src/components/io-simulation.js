export default {
    name: 'simulation',

    data() {
        return {
            switchCostGain: 'Costo',

            criteria: 'optimist',

            consequences: [
                {title: 'C1', field: 'C1'}
            ],

            alternatives: [
                [{'C1': ''}]
            ],

            hurwiczValue: 0.5,

            optimistval: '',

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
         * Get the the maximum of the maximums.
         */
        getMaxiMax() {
            let maxiMax = null;
            let result = null;
            this.alternatives.forEach((alternative, alternativeIndex, alternativeArray) => {
                alternative.forEach((alternativeConsequenceValue, index, array) => {
                    if ((parseInt(alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]], 10) > parseInt(maxiMax, 10)) || (maxiMax === null)) {
                        maxiMax = alternativeConsequenceValue[Object.keys(alternativeConsequenceValue)[0]];
                        result = alternativeIndex;
                    }
                });
            });
            this.optimistval = maxiMax;
            return result;
        },

        /*
         * Temp !
         */
        changedAlternatives() {
            this.resultCalc();
        },

        resultCalc() {
            switch (this.criteria) {
                case "optimist":
                    this.answer = this.getMaxiMax();
                    break;
                case "pesimist":
                    break;
                case "savage":
                    break;
                case "laplace":
                    break;
                case "hurwicz":
                    break;
                default:
                    this.answer = this.getMaxiMax();
            }
        }
    },

    watch: {
        alternatives: function () {
            this.resultCalc();
        },

        consequences: function () {
            this.resultCalc();
        },

        criteria: function () {
            this.resultCalc();
        }
    }
}
