import { createStore } from "vuex";
import axios from "axios";

// Create a new store instance.
const store = createStore({
  state: () => {
    return {
      clients: [],
      supplyPoints: []
    }

  },
  getters: {
    getClients: (state) => state.clients,
    getSupplyPoints: (state) => state.supplyPoints,
  },
  actions: {
    async fetchClients({ commit }) {
      try {
        const dataClients = await axios.get(
          "http://localhost:8080/clients.json"
        );
        console.log('dataClients: ',dataClients)
        commit("SET_CLIENTS", dataClients.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchSupplyPoints({ commit }) {
      try {
        const dataSupplyPoints = await axios.get(
          "http://localhost:8080/supply-points.json"
        );
        commit("SET_SUPPLY_POINTS", dataSupplyPoints.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  mutations: {
    SET_CLIENTS(state, data) {
      state.clients = data;
    },
    SET_SUPPLY_POINTS(state, data) {
      state.supplyPoints = data;
    },
  },
});

export default store;
