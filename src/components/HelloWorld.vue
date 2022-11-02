<template>
  <div class="app-container">
    <form @submit.prevent="getOffers">
      <h3>Introduce el ID del cliente (CUPS)</h3>
      <prime-input-text type="number" v-model="cups" />
      <prime-button type="submit" label="Submit" @click="findClient" />
      <div>
        <prime-data-table
          :value="this.rawClients"
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
    <prime-toast />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { toRaw } from "vue";

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
      allItems: null,
      rawClients: null,
      rawSupplyPoints: null,
    };
  },
  computed: {
    ...mapState(["clients", "supplyPoints"]),
  },
  async mounted() {
    this.columns = [
      { field: "full_name", header: "Full name" },
      { field: "address", header: "Address" },
      { field: "cups", header: "Cups" },
      { field: "role", header: "Role" },
      { field: "building_type", header: "Building type" },
      { field: "email", header: "Email" },
      { field: "promo", header: "Promo" },
    ];
    await this.$store.dispatch("fetchClients");
    await this.$store.dispatch("fetchSupplyPoints");
    this.rawClients = toRaw(this.clients);
    console.log("Deconstructing object proxy: ", toRaw(this.clients));
    console.log(typeof Object.assign(this.clients));
    console.log(Object.assign(this.clients));

    console.log("Proxy: ", this.clients.handler);
    console.log("Trying to access to target from proxy: ", this.clients.target);
    this.rawSupplyPoints = toRaw(this.supplyPoints);
    // console.log("SupplyPoints:", this.rawSupplyPoints);
  },
  methods: {
    findClient(cups) {
      // for (let j in this.rawClients) {
      //   console.log(this.rawClients[j].get())
      // }

      const findClient = this.rawClients.find((client) => client.cups == cups);
      console.log(typeof this.rawClients);
      console.log("findClient: ", findClient);
      if (!findClient) throw new Error("You're not a client");
      return findClient;
    },

    findSupplypointById(cups) {
      const findSupplypoint = this.rawSupplypoints.find(
        (supplypoint) => supplypoint.cups == cups
      );
      if (!findSupplypoint) throw new Error("You're not supplypoint");

      return findSupplypoint;
    },

    isClientAllowed(client, supplypoint) {
      let offer = {
        offer: false,
        message:
          "Rooftop revolution is available only for houses with neighbors",
      };
      if (client.building_type == "house" && supplypoint.neighbors.length > 0) {
        offer = { offer: true, message: "" };
      }
      return offer;
    },
    showToast(message, type) {
      this.$toast.add({
        severity: type == "error" ? type : "info",
        summary: message,
        life: 3000,
      });
    },
    // findClientNeighborsData(ClientNeighbors) {
    //   const findNeighbors = [];
    //   ClientNeighbors.forEach((cups) => {
    //     findNeighbors.push(
    //       this.supplypoints.find((supplypoint) => supplypoint.cups == cups)
    //     );
    //   });
    //   return findNeighbors;
    // },

    // checkClientOffer(supplypoint) {
    //   const findNeighbors = this.findClientNeighborsData(supplypoint.neighbors);
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
    // },

    // async getOffers() {
    //   try {
    //     const findOneClientData = await this.clientService.findClient(
    //       this.cups
    //     );
    //     const findOneSupplypointData =
    //       await this.supplypointService.findSupplypointById(this.cups);

    //     const isClientAllowed = await this.clientService.isClientAllowed(
    //       findOneClientData,
    //       findOneSupplypointData
    //     );

    //     if (isClientAllowed.offer) {
    //       const clientHasOffer = await this.clientService.checkClientOffer(
    //         findOneSupplypointData
    //       );
    //       if (clientHasOffer) {
    //         this.$store.commit("setProducts", [
    //           { ...findOneClientData, ...findOneSupplypointData },
    //         ]);
    //         this.showToast("Client has 5% offer", "info");
    //       } else {
    //         this.$store.commit("setProducts", [
    //           { ...findOneClientData, ...findOneSupplypointData },
    //         ]);
    //         this.showToast("No discount, no conditions.", "info");
    //       }
    //     } else {
    //       this.$store.commit("setProducts", [
    //         { ...findOneClientData, ...findOneSupplypointData },
    //       ]);
    //       this.showToast(isClientAllowed.message, "info");
    //     }
    //   } catch (err) {
    //     if (this.cups) this.showToast(err, "error");
    //     this.$store.commit("setProducts", this.allItems);
    //   }
  },
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
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
