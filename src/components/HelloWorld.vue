<template>
  <div class="app-container">
    <form @submit.prevent="getClientOffer">
      <h3>Introduce el ID del cliente (CUPS)</h3>
      <prime-input-text type="number" v-model="cups" />
      <prime-button type="submit" label="Submit" />
      <div>
        <prime-data-table
          :value="clients"
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
import { mapActions, mapState } from "vuex";
// import { toRaw } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      message: null,
      cups: null,
      columns: null
    };
  },
  computed: {
    ...mapState(["clients", "supplyPoints"]),
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
    this.fetchClients();
    this.fetchSupplyPoints();
  },
  methods: {
    ...mapActions(["fetchClients", "fetchSupplyPoints"]),
    findClient(cups) {
      const findClient = this.clients.find((client) => client.cups == cups);
      if (!findClient) throw new Error("You're not a client");
      return findClient;
    },
    findSupplypointById(cups) {
      const findSupplypoint = this.supplyPoints.find(
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
    findClientNeighborsData(clientNeighbors) {
      const findNeighbors = [];
      clientNeighbors.forEach((cups) => {
        findNeighbors.push(this.findSupplypointById(cups));
      });
      return findNeighbors;
    },
    checkClientOffer(supplypoint) {
      const findNeighbors = this.findClientNeighborsData(supplypoint.neighbors);
      let hasOffer = false;
      findNeighbors.forEach((neighbor) => {
        if (
          neighbor &&
          neighbor.power.p1 < supplypoint.power.p1 &&
          neighbor.power.p2 < supplypoint.power.p2
        ) {
          hasOffer = true;
        }
      });
      return hasOffer;
    },

    async getClientOffer() {
      try {
        const findOneClientData = await this.findClient(this.cups);
        const findOneSupplypointData = await this.findSupplypointById(
          this.cups
        );
        const isClientAllowed = await this.isClientAllowed(
          findOneClientData,
          findOneSupplypointData
        );
        if (isClientAllowed.offer) {
          const clientHasOffer = await this.checkClientOffer(
            findOneSupplypointData
          );
          if (clientHasOffer) {
            this.$store.commit("SET_PRODUCT", [
              { ...findOneClientData, ...findOneSupplypointData },
            ]);
            this.showToast("Client has 5% offer", "info");
          } else {
            this.$store.commit("SET_PRODUCT", [
              { ...findOneClientData, ...findOneSupplypointData },
            ]);
            this.showToast("No discount or conditions available.", "info");
          }
        } else {
          this.$store.commit("SET_PRODUCT", [
            { ...findOneClientData, ...findOneSupplypointData },
          ]);
          this.showToast(isClientAllowed.message, "info");
        }
      } catch (err) {
        if (this.cups) this.showToast(err, "error");
        this.$store.commit("SET_PRODUCT", this.allItems);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
