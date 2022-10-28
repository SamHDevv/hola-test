<template>
  <div class="app-container">
    <form @submit.prevent="getOffers">
      <h3>Introduce el ID del cliente (CUPS)</h3>
      <prime-input-text type="number" v-model="cups" />
      <prime-button type="submit" label="Submit" @click="getClientsData" />
      <div>
        <prime-data-table
          :value="this.$store.state.clients"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="6"
        >
          <prime-column
            v-for="col of columns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
          ></prime-column>
        </prime-data-table>
      </div>
    </form>
    <div class="my-items"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      message: null,
      cups: null,
      columns: null,
      // clients:null,
      // supplypoints: null,
      allItems: null,
    };
  },
  computed: {
    ...mapState(["clients", "suppyPoints"])
  },
  mounted() {
    this.columns = [
      { field: "full_name", header: "Full name" },
      { field: "address", header: "Address" },
      { field: "cups", header: "Cups" },
      { field: "role", header: "Role" },
      { field: "building_type", header: "Building type" },
      { field: "email", header: "Email" },
      { field: "promo", header: "Promo" },
    ];
    this.$store.dispatch("fetchClients");
    this.$store.dispatch("fetchSupplyPoints");
    console.log("clients:", this.$store.state.clients);
    console.log("clients:", this.clients);
  },
  methods: {
    // findClient(cups) {
    //   const findClient = this.clients.find((client) => client.cups == cups);
    //   if (!findClient) throw new Error("You're not a client");
    //   return findClient;
    // },
    // rooftopAvailable(client, supplypoint) {
    //   let offer = {
    //     offer: false,
    //     message:
    //       "Rooftop revolution is available only for houses with neighbors",
    //   };
    //   if (client.building_type == "house" && supplypoint.neighbors.length > 0) {
    //     offer = { offer: true, message: "" };
    //   }
    //   return offer;
    // },
    // findNeighbors(neighbors) {
    //   const findNeighbors = [];
    //   neighbors.forEach((cups) => {
    //     findNeighbors.push(
    //       this.supplypoints.find((supplypoint) => supplypoint.cups == cups)
    //     );
    //   });
    //   return findNeighbors;
    // },
    // clientOffer(supplypoint) {
    //   const findNeighbors = findNeighbors(supplypoint.neighbors);
    //   let hasOffer = false;
    //   findNeighbors.forEach((neighbor) => {
    //     if (
    //       neighbor &&
    //       neighbor.power.p1 < supplypoint.power.p1 &&
    //       neighbor.power.p2 < supplypoint.power.p2
    //     ) {
    //       hasOffer = true;
    //     }
    //   });
    //   return hasOffer;
    // }
  },
};

// onMounted(() => {
//   // dispatch the fetchClients action which commits a mutation to update the state
//   store.dispatch("fetchClients");
//   store.dispatch("fetchSuppyPoints");
// });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
