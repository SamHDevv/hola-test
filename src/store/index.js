import { createStore } from "vuex";
import axios from "axios";

// Create a new store instance.
const store = createStore({
  state: () => {
    return {
      clients: [],
      supplyPoints: [],
      products: null,
    };
  },
  actions: {
    async fetchClients({ commit }) {
      axios.get("http://localhost:8080/clients.json").then((dataClients) => {
        // console.log("dataClients: ", dataClients.data);
        commit("SET_CLIENTS", dataClients.data);
      });
    },
    async fetchSupplyPoints({ commit }) {
      axios.get("http://localhost:8080/supply-points.json").then((dataSupplyPoints) => {
          // console.log('1. dataSupplyPoints: ', dataSupplyPoints.data)
          commit("SET_SUPPLY_POINTS", dataSupplyPoints.data);
        });
    },
  },
  mutations: {
    SET_CLIENTS(state, data) {
      state.clients = data;
    },
    SET_SUPPLY_POINTS(state, data) {
      state.supplyPoints = data;
    },
    SET_PRODUCT(state, data) {
      state.products = data;
    },
  },
});

export default store;
