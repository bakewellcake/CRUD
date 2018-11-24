<template>
    <v-layout justify-center class="auth-fs-background mb-3">
        <v-snackbar :top="true" :color="snackbar.color" v-model="snackbar.visible">{{ snackbar.text }}</v-snackbar>
        <v-flex xs10>
            <v-card class="mt-2">
                <v-card-title>
                    <h3 class="headline mb-0">CRUD Application</h3>
                    <v-btn right absolute v-on:click="openCreateEditDialog('CREATE')">New Item</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-layout column wrap>
                        <v-flex xs12>
                            <v-data-table :headers="beerHeaders" :items="beerData" class="elevation-1">
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.company }}</td>
                                    <td>{{ props.item.style }}</td>
                                    <td>{{ props.item.percentage | percentage }}</td>
                                    <td>{{ props.item.rating }}</td>
                                    <td>
                                        <v-icon small class="mr-2" v-on:click="openCreateEditDialog('EDIT', props.item)">edit</v-icon>
                                        <v-icon small v-on:click="deleteItem(props.item)">delete</v-icon>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs12>
                            <v-card color="grey darken-2" dark class="mt-3">
                                <v-card-title class="headline grey darken-3">
                                    Search for beers
                                </v-card-title>
                                <v-card-text>
                                    Explore the various beers stored in the database
                                </v-card-text>
                                <v-card-text>
                                    <v-autocomplete v-model="searchBeersModel" :items="searchBeersData" :loading="searchBeersLoading"
                                        :search-input.sync="searchBeers" color="white" hide-no-data hide-selected
                                        item-text="name" item-value="id" label="Search beers" v-on:input="selected = true"
                                        placeholder="Start typing to Search" prepend-icon="mdi-database-search" return-object
                                    ></v-autocomplete>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-expand-transition>
                                    <v-list v-if="searchBeersModel" class="grey darken-3">
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Name</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ searchBeersModel.name }}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Company</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ searchBeersModel.company }}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Style</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ searchBeersModel.style }}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Percentage</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ searchBeersModel.percentage | percentage }}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Rating</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ searchBeersModel.rating + '/5' }}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-expand-transition>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :disabled="!searchBeersModel" color="grey darken-3" v-on:click="searchBeersModel = null">Clear</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-dialog v-model="createEditDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ createEditMode === 'CREATE' ? 'Create item' : 'Edit item' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form ref="createEditBeerForm" v-model="createEditBeerFormValid">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field v-model="createEditBeerModel.name" label="Name" :rules="[v => !!v || 'Name is required']"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="createEditBeerModel.company" label="Company" :rules="[v => !!v || 'Company is required']"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="createEditBeerModel.style" label="Style" :rules="[v => !!v || 'Style is required']"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field v-model="createEditBeerModel.percentage" label="Percentage" :rules="[v => !!v || 'Percentage is required', v => !!Number(v) || 'Valid numbers only']"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field v-model="createEditBeerModel.rating" label="Rating" :rules="[v => !!v || 'Rating is required', v => !!Number(v) || 'Valid numbers only']"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat v-on:click="createEditDialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat v-on:click="saveItem" :disabled="!createEditBeerFormValid">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        data: function () {
            return {                  
                snackbar: {
                    visible: false,
                    color: null,
                    text: null
                },
                createEditBeerFormValid: null,
                createEditDialog: false,
                createEditMode: null,
                createEditBeerModel: {},
                createEditBeerDefaultModel: {
                    name: null,
                    company: null,
                    style: null,
                    percentage: null,
                    rating: null
                },
                searchBeers: null,
                searchBeersModel: null,
                searchBeersData: [],
                searchBeersLoading: false,
                selected: false,
                beerData: [],
                beerHeaders: [
                    { text: 'Name', value: 'name' },
                    { text: 'Company', value: 'company' },
                    { text: 'Style', value: 'style' },
                    { text: 'Percentage', value: 'percentage' },
                    { text: 'Rating', value: 'rating' },
                    { text: 'Action', value: 'action', sortable: false }
                ]
            }
        },
        methods: {
            toast: function (text, color) {
                this.snackbar.text = text
                this.snackbar.color = color
                this.snackbar.visible = true
            },
            openCreateEditDialog: function (mode, value) {
                this.createEditMode = mode
                this.createEditDialog = true

                if (this.createEditMode === 'CREATE') {
                    this.$refs.createEditBeerForm.reset()
                    // this.createEditBeerModel = JSON.parse(JSON.stringify(this.createEditBeerDefaultModel))
                }

                if (this.createEditMode === 'EDIT') {
                    this.createEditBeerModel = JSON.parse(JSON.stringify(value))
                }
            },
            saveItem: function () {
                if (this.createEditMode === 'CREATE') {
                    this.$http.post('/beers', this.createEditBeerModel).then(function (data) {
                        this.beerData.push(data.body)
                        this.toast('Created', 'green')
                    }, (error) => {
                        this.toast(error.body, 'red')
                    }).finally(() => {
                        this.createEditDialog = false
                    })
                }

                if (this.createEditMode === 'EDIT') {
                    var gridItem = this.beerData.filter(x => x.id === this.createEditBeerModel.id)[0]
                    var editModel = {}

                    Object.keys(this.createEditBeerModel).forEach(index => {
                        if (this.createEditBeerModel[index] !== gridItem[index]) {
                            editModel[index] = this.createEditBeerModel[index]
                        }
                    })

                    this.$http.put('/beers/' + this.createEditBeerModel.id, editModel).then(function () {
                        Object.assign(gridItem, this.createEditBeerModel)
                        this.toast('Edited', 'green')
                    }, (error) => {
                        this.toast(error.body, 'red')
                    }).finally(() => {
                        this.createEditDialog = false
                    })
                }
            },
            deleteItem: function (item) {
                if (confirm('Confirm deletion?')) {
                    this.$http.delete('/beers/' + item.id).then(function () {
                        this.beerData = this.beerData.filter(x => x.id !== item.id)
                        this.toast('Deleted', 'green')
                    }, (error) => {
                        this.toast(error.body, 'error')
                    })
                }
            }
        },
        watch: {
            searchBeers: function (value) {
                if (value === null || value === '' || this.selected === true) {
                    this.selected = false
                    this.searchBeersData = []
                } else {
                    setTimeout(() => {
                        if (value === this.searchBeers) {
                            this.searchBeersLoading = true
                            this.$http.get('/beers/' + value).then(function (data) {
                                this.searchBeersData = data.body
                            }, (error) => {
                                this.toast(error.body, 'red')
                            }).finally(() => {
                                this.searchBeersLoading = false
                            })
                        }
                    }, 500)
                }
            }
        },
        filters: {
            percentage: function (value) {
                return value + '%'
            }
        },
        mounted: function () {
            this.createEditBeerModel = this.createEditBeerDefaultModel
            this.$http.get('/beers').then(function (data) {
                this.beerData = data.body
            }, (error) => {
                this.toast(error.body, 'red')
            })
        }
    }
</script>