<template>
    <div>
        <nav class="navbar bg-sim" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma" width="112" height="28">
                </a>
            </div>
        </nav>
        <div class="container">
            <section class="section">
                <div class="columns">
                    <div class="column">
                        <b-field grouped group-multiline>
                            <div class="control is-flex">
                                <a class="button" @click.prevent="addConsequence">Agregar Consecuencia</a>
                            </div>
                            <div class="control is-flex">
                                <a class="button" @click.prevent="addAlternative">Agregar Alternativa</a>
                            </div>
                            <div class="control is-flex">
                                <b-switch v-model="isSwitchedCustom"
                                          true-value="Costo"
                                          false-value="Ganancia">
                                    {{ isSwitchedCustom }}
                                </b-switch>
                            </div>
                        </b-field>
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
                        <hr>
                        <table>
                            <thead>
                                <tr>
                                    <th>-</th>
                                    <th v-for="(consequence, index) in consequences">
                                        {{ consequence.title }}
                                        <b-tooltip label="Eliminar consecuencia"
                                                   position="is-right"
                                                   type="is-danger"
                                                   animated>
                                            <a>
                                                <span class="icon has-text-danger">
                                                    <i class="fa fa-trash-o"></i>
                                                </span>
                                            </a>
                                        </b-tooltip>
                                    </th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(alternativeArray, index) in alternatives">
                                    <td>
                                        <input type="text" :value="'Alternativa ' + (index + 1).toString()"/>
                                    </td>
                                    <td v-for="(alternative, index) in alternativeArray">
                                        <input type="number"
                                               :placeholder="alternative[Object.keys(alternative)[0]]"
                                               v-model="alternative[Object.keys(alternative)[0]]">
                                    </td>
                                    <td>
                                        <b-tooltip label="Eliminar alternativa"
                                                   position="is-top"
                                                   type="is-danger"
                                                   animated>
                                            <a>
                                                <span class="icon has-text-danger">
                                                    <i class="fa fa-trash-o"></i>
                                                </span>
                                            </a>
                                        </b-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
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
                    [{'C1': 0}]
                ]
            }
        },
        methods: {
            addConsequence() {
                const number = this.consequences.length + 1;
                const consequence = 'C' + number.toString();
                this.alternatives.map((currentValue, index, array) => {
                    currentValue.push({
                        [consequence]: 0
                    });
                    return currentValue;
                });
                this.consequences.push({title: consequence, field: consequence});
            },
            addAlternative() {
                let alternative = [];
                this.consequences.forEach((currentValue, index, array) => {
                    alternative.push({
                        [currentValue.field]: 0
                    });
                });
                this.alternatives.push(alternative);
            }
        }
    }
</script>

<style>
    .bg-sim {
        background-image: linear-gradient(141deg, #495a67 0%, #69707a 71%, #6e768e 100%);
        -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.75);
    }
    table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        margin: 0;
        padding: 0;
        width: 100%;
        table-layout: fixed;
    }

    table caption {
        font-size: 1.5em;
        margin: .5em 0 .75em;
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
    input[type=text],
    input[type=number]{
        background: none;
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-radius: 0;
    }
</style>
