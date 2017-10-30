<template>
    <div>
        <div class="io-shadow">
            <div class="container is-fluid">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                        <span class="icon is-medium">
                            <i class="fa fa-home"></i>
                        </span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
        <div class="container">
            <section class="hero">
                <div class="hero-body">
                    <div class="container">
                        <h2 class="title is-2">
                            Investigación Operativa
                        </h2>
                        <h2 class="subtitle">
                            Teoria de decisiones
                        </h2>
                    </div>
                </div>
            </section>
        </div>
        <div class="container is-fluid" style="margin: 10px; padding: 25px">
            <div class="columns">
                <div class="column">
                    <hr>
                    <b-field grouped group-multiline>
                        <div class="control is-flex">
                            <a class="button" @click.prevent="addConsequence">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                <span>Consecuencia</span>
                            </a>
                        </div>
                        <div class="control is-flex">
                            <a class="button" @click.prevent="addAlternative">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                <span>Alternativa</span>
                            </a>
                        </div>
                        <div class="control is-flex">
                            <b-switch v-model="isSwitchedCustom"
                                      true-value="Costo"
                                      false-value="Ganancia">
                                {{ isSwitchedCustom }}
                            </b-switch>
                        </div>
                    </b-field>
                    <b-field grouped group-multiline>
                        <div class="block">
                            <b-radio v-model="radio"
                                     native-value="optimist">
                                Optimista
                            </b-radio>
                            <b-radio v-model="radio"
                                     native-value="pesimist">
                                Pesimista
                            </b-radio>
                            <b-radio v-model="radio"
                                     native-value="savage">
                                Savage
                            </b-radio>
                            <b-radio v-model="radio"
                                     native-value="laplace">
                                Laplace
                            </b-radio>
                            <b-radio v-model="radio"
                                     native-value="hurwicz">
                                Hurwicz
                            </b-radio>
                        </div>
                    </b-field>
                    <b-field v-if="radio == 'hurwicz'"
                             type="number"
                             label="Lambda">
                        <b-input :value="0.5"></b-input>
                    </b-field>
                    <hr>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th v-for="(consequence, index) in consequences">
                                <input type="text" placeholder="consecuencia"><!--{{ consequence.title }}-->
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td v-for="(consequence, index) in consequences">
                                <b-tooltip label="Eliminar consecuencia"
                                           position="is-right"
                                           type="is-danger"
                                           animated>
                                    <a @click.prevent="deleteConsequence(consequence, index)">
                                        <span class="icon has-text-danger">
                                            <i class="fa fa-trash-o"></i>
                                        </span>
                                    </a>
                                </b-tooltip>
                            </td>
                            <td></td>
                        </tr>
                        <tr v-for="(alternativeArray, index) in alternatives"
                            :class="answ == index ? 'isResult' : ''">
                            <td>
                                <input type="text" placeholder="alternativa">
                                <!--Alternativa {{ (index + 1).toString() }}-->
                            </td>
                            <td v-for="(alternative, index) in alternativeArray">
                                <input type="number"
                                       :placeholder="alternative[Object.keys(alternative)[0]]"
                                       v-model="alternative[Object.keys(alternative)[0]]"
                                       @change="changedAlternatives">
                            </td>
                            <td>
                                <b-tooltip label="Eliminar alternativa"
                                           position="is-top"
                                           type="is-danger"
                                           animated>
                                    <a @click.prevent="deleteAlternative(index)">
                                            <span class="icon has-text-danger">
                                                <i class="fa fa-trash-o"></i>
                                            </span>
                                    </a>
                                </b-tooltip>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'simulation',
        data() {
            return {
                isSwitchedCustom: 'Costo',
                radio: 'optimist',
                consequences: [
                    {title: 'C1', field: 'C1'}
                ],
                alternatives: [
                    [{'C1': ''}]
                ],
                optimistval: '',
                answ: ''
            }
        },
        methods: {
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
            addAlternative() {
                let alternative = [];
                this.consequences.forEach((currentValue, index, array) => {
                    alternative.push({
                        [currentValue.field]: ''
                    });
                });
                this.alternatives.push(alternative);
            },
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
            deleteAlternative(index) {
                this.alternatives.splice(index, 1);
            },
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
                this.answ = result;
            },
            changedAlternatives() {
                this.getMaxiMax();
            }
        },
        watch: {
            alternatives: function () {
                this.getMaxiMax();
            },
            consequences: function () {
                this.getMaxiMax();
            }
        }
    }
</script>

<style>
    .io-shadow {
        -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
    }

    .isResult {
        background-color: #B3E5FC;
        border-color: #40C4FF;
    }

    table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
    }

    table tr {
        background: #f8f8f8;
        border: 1px solid #ddd;
        padding: .35em;
    }

    table th,
    table td {
        padding: .625em;
        text-align: center;
    }

    table th {
        /*font-size: .85em;
        letter-spacing: .1em;
        text-transform: uppercase;*/
    }

    @media screen and (max-width: 600px) {
        table {
            border: 0;
        }

        table caption {
            font-size: 1.3em;
        }

        table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }

        table tr {
            border-bottom: 3px solid #ddd;
            display: block;
            margin-bottom: .625em;
        }

        table td {
            border-bottom: 1px solid #ddd;
            display: block;
            font-size: .8em;
            text-align: right;
        }

        table td:before {
            /*
            * aria-label has no advantage, it won't be read inside a table
            content: attr(aria-label);
            */
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
        }

        table td:last-child {
            border-bottom: 0;
        }
    }

    th, td {
        border-left: 1px black;
    }

    input[type=text],
    input[type=number] {
        background: none;
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 75%;
        border: none;
        border-radius: 0;
    }

    input[type=text]:focus {
        border: none;
        outline: none 0;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
</style>
