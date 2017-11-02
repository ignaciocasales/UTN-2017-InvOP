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
        <!--<div class="container">
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
        </div>-->
        <div class="container is-fluid" style="margin: 10px; padding: 25px">
            <div class="columns">
                <div class="column is-12">
                    <hr>

                    <div class="columns">
                        <div class="column is-6">
                            <b-field grouped group-multiline>


                                <!-- Add consequence button -->
                                <div class="control is-flex">
                                    <a class="button" @click.prevent="addConsequence">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                        <span>Consecuencia</span>
                                    </a>
                                </div>
                                <!-- /Add consequence button -->


                                <!-- Add alternative button -->
                                <div class="control is-flex">
                                    <a class="button" @click.prevent="addAlternative">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                        <span>Alternativa</span>
                                    </a>
                                </div>
                                <!-- /Add alternative button -->


                                <!-- Switch between cost & gain -->
                                <div class="control is-flex">
                                    <b-switch
                                            v-model="switchCostGain"
                                            true-value="Costo"
                                            false-value="Ganancia"
                                    >
                                        {{ switchCostGain }}
                                    </b-switch>
                                </div>
                                <!-- /Switch between cost & gain -->


                            </b-field>


                            <!-- Radio buttons to select decision criteria. -->
                            <b-field grouped group-multiline>
                                <div class="block">

                                    <b-radio
                                            v-model="criteria"
                                            native-value="optimist"
                                    >
                                        Optimista
                                    </b-radio>

                                    <b-radio v-model="criteria"
                                             native-value="pesimist">
                                        Pesimista
                                    </b-radio>

                                    <b-radio v-model="criteria"
                                             native-value="savage">
                                        Savage
                                    </b-radio>

                                    <b-radio
                                            v-model="criteria"
                                            native-value="laplace"
                                    >
                                        Laplace
                                    </b-radio>

                                    <b-radio
                                            v-model="criteria"
                                            native-value="hurwicz"
                                    >
                                        Hurwicz
                                    </b-radio>
                                </div>
                            </b-field>
                            <!-- /Radio buttons to select decision criteria. -->


                        </div>
                        <div class="column is-6">


                            <!-- Lambda input -->
                            <b-field
                                    grouped
                                    v-if="criteria === 'hurwicz'"
                                    type="number"
                                    label="Lambda:"
                            >
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <input
                                        type="number"
                                        v-model="hurwiczValue"
                                        :value="hurwiczValue"
                                >
                            </b-field>
                            <!-- /Lambda input -->


                        </div>
                    </div>


                    <hr>


                    <!-- Decision table -->
                    <table class="table-fill">


                        <!-- Table Header -->
                        <thead>
                            <tr>
                                <th></th>
                                <th v-for="(consequence, index) in consequences">
                                    <input type="text" placeholder="Consecuencia">
                                    <b-tooltip
                                            label="Eliminar consecuencia"
                                            position="is-top"
                                            type="is-danger"
                                            animated
                                    >
                                        <a @click.prevent="deleteConsequence(consequence, index)">
                                            <span class="icon has-text-dark">
                                                <i class="fa fa-trash-o"></i>
                                            </span>
                                        </a>
                                    </b-tooltip>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <!-- /Table Header -->


                        <!-- Table Body -->
                        <tbody>
                            <tr v-for="(alternativeArray, index) in alternatives"
                                :class="answer == index ? 'isResult' : ''">
                                <td>
                                    <input type="text" placeholder="Alternativa">
                                </td>
                                <td v-for="(alternative, index) in alternativeArray">
                                    <input
                                            type="number"
                                            placeholder="Valor..."
                                            v-model="alternative[Object.keys(alternative)[0]]"
                                            @change="changedAlternatives"
                                    >
                                </td>
                                <td>
                                    <b-tooltip
                                            label="Eliminar alternativa"
                                            position="is-top"
                                            type="is-danger"
                                            animated
                                    >
                                        <a @click.prevent="deleteAlternative(index)">
                                                <span class="icon has-text-dark">
                                                    <i class="fa fa-trash-o"></i>
                                                </span>
                                        </a>
                                    </b-tooltip>
                                </td>
                            </tr>
                        </tbody>
                        <!-- Table Body -->


                    </table>
                    <!-- Decision table -->


                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./io-simulation.js"></script>

<style src="./../assets/css/io-simulation.css" scoped></style>
