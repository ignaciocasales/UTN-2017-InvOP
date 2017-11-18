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
        <div class="container is-fluid" style="margin: 10px; padding: 25px">
            <div class="columns is-centered">
                <div class="column is-12">
                    <hr>

                    <div class="columns is-centered">
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
                                            true-value="costo"
                                            false-value="ganancia"
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
                            <!-- /Radio buttons to select decision criteria. -->


                        </div>
                        <div class="column is-6">


                            <!-- Lambda input -->
	                        <b-tooltip label="VALOR ENTRE 0 Y 1">
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
					                        v-model="hurwiczLambda"
					                        :value="hurwiczLambda"
					                        @change="changedAlternatives"
			                        >
		                        </b-field>
	                        </b-tooltip>
                            <!-- /Lambda input -->


                        </div>
                    </div>


                    <hr>
	                <span>Consecuencias:&nbsp;&nbsp;{{ consequences.length }}</span>
	                <br>
	                <span>Alternativas:&nbsp;&nbsp;{{ alternatives.length }}</span>
                    <hr>

                    <!-- Decision table -->
	                <div style="overflow-x: auto">
		                <table class="table-fill" v-if="(consequences.length > 0) && (alternatives.length > 0)">


			                <!-- Table Header -->
			                <thead>
			                <tr>
				                <th></th>
				                <th v-for="(consequence, index) in consequences">
					                <span style="white-space:nowrap;">
						                <input type="text" placeholder="Consecuencia">
						                <b-tooltip
								                label="Eliminar consecuencia"
								                position="is-left"
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
	                </div>
                    <!-- Decision table -->

	                <div v-if="(consequences.length <= 0) || (alternatives.length <= 0)">
		                <b-notification type="is-info" has-icon>
			                La tabla debe tener al menos una alernativa y una consecuecia.
		                </b-notification>
	                </div>


                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./io-simulation.js"></script>

<style src="./../assets/css/io-simulation.css" scoped></style>
