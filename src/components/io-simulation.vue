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
                            Ir a inicio
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <a class="navbar-item">
                                <img src="/img/utn-logo-small.png" alt="UTN"/>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="container is-fluid" style="margin: 10px; padding: 25px">
            <div class="columns is-centered">
                <div class="column is-12 has-text-centered has-text-weight-light">


                    <h1 class="title">Toma de decisiones</h1>


                    <hr>

                    <div class="columns is-centered">
                        <div class="column is-12">
                            <div class="has-text-centered">
                                <b-field grouped group-multiline position="is-centered">


                                    <!-- Add consequence button -->
                                    <div class="control is-flex">
                                        <a class="button" @click.prevent="addConsequence">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                            <span>Consecuencia</span>
                                        </a>
                                    </div>


                                    <!-- Add alternative button -->
                                    <div class="control is-flex">
                                        <a class="button" @click.prevent="addAlternative">
                                    <span class="icon is-primary">
                                      <i class="fa fa-plus"></i>
                                    </span>
                                            <span>Alternativa</span>
                                        </a>
                                    </div>


                                    <!-- Switch between cost & gain -->
                                    <div class="control is-flex">
                                        <b-switch
                                                v-model="switchCostGain"
                                                true-value="costo"
                                                false-value="ganancia"
                                        >
                                            {{ switchCostGain }}
                                        </b-switch>
                                    </div>
                                </b-field>
                            </div>
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <div class="column is-12">
                            <div class="has-text-centered">


                                <!-- Radio buttons to select decision criteria. -->
                                <b-field grouped group-multiline position="is-centered">
                                    <div class="block">
                                        <b-radio
                                                v-model="criteria"
                                                native-value="optimist"
                                        >
                                            Optimista
                                        </b-radio>

                                        <b-radio v-model="criteria"
                                                 native-value="pessimist">
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
                            </div>
                        </div>
                    </div>
                    <div class="columns is-centered" v-if="criteria === 'hurwicz'">
                        <div class="column is-12">
                            <div class="box has-text-centered">


                                <!-- Lambda input -->
                                <b-tooltip label="VALOR ENTRE 0 Y 1" position="is-right">
                                    <b-field
                                            grouped
                                            v-if="criteria === 'hurwicz'"
                                            type="number"
                                            label="Lambda:"
                                            position="is-centered"
                                    >
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <input
                                                type="number"
                                                v-model="hurwiczLambda"
                                                :value="hurwiczLambda"
                                                @change="changedAlternatives"
                                                style="background: none; border: 1px groove;"
                                        >
                                    </b-field>
                                </b-tooltip>
                            </div>
                        </div>
                    </div>


                    <hr>


	                <span><strong>Consecuencias:</strong>&nbsp;&nbsp;{{ consequences.length }}</span>
	                <br>
	                <span><strong>Alternativas:</strong>&nbsp;&nbsp;{{ alternatives.length }}</span>


                    <hr>


                    <div class="notification is-primary" has-icon>
                        La alternativa óptima según el criterio será <strong>resaltada</strong>.
                    </div>


                    <hr>


                    <!-- Decision table -->
	                <div class="box has-text-centered" style="overflow-x: auto">
		                <table class="table-fill has-text-centered" style="margin-left: auto; margin-right: auto;" v-if="(consequences.length > 0) && (alternatives.length > 0)">


			                <!-- Table Header -->
			                <thead>
			                <tr>
				                <th></th>
				                <th v-for="(consequence, index) in consequences">
					                <span style="white-space:nowrap;">
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
					                </span>
				                </th>
				                <th></th>
			                </tr>
			                </thead>


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
		                </table>
	                </div>
	                <div v-if="(consequences.length <= 0) || (alternatives.length <= 0)">
                        <div class="notification is-info" type="info" has-icon>
			                La tabla debe tener al menos una alernativa y una consecuecia.
		                </div>
	                </div>


                    <hr>


                    <div class="box">
                        <span><strong>Valor Resultado:&nbsp;{{ answerValue }}</strong></span>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer" style="padding: 15px 5px;">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        <strong>Teoria de decisiones</strong> by Ignacio Casales, Santiago Blanc & Alejandro Schulten.
                    </p>
                </div>
                <div class="content has-text-right">
                    <span>
                        Universidad Tecnológica Nacional - 2017
                    </span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script src="./io-simulation.js"></script>

<style src="./../assets/css/io-simulation.css" scoped></style>
