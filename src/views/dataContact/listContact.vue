<template>
  <v-app>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      top
      centered
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarUpdate.show"
      :timeout="3000"
      top
      centered
      :color="snackbarUpdate.color"
    >
      {{ snackbarUpdate.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbarUpdate.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarDelete.show"
      :timeout="3000"
      top
      centered
      :color="snackbarDelete.color"
    >
      {{ snackbarDelete.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbarDelete.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-data-table
      :loading="loadingItem"
      :headers="headers"
      :items="list"
      :page="pageContact"
      :options.sync="optionsContact"
      :server-items-length="totalContact"
      item-key="id"
      class="elevation-1"
      loading-text="Loading... Please wait"
      @update:options="paginate"
    >
      <template v-slot:top flat>
        <v-toolbar class="elevation-1">
          <addContact @contactAdded="snackbar.show = true" />

          <v-dialog v-model="openEdit" max-width="700px">
            <v-card tile>
              <v-card-title>
                <span class="headline">Edit Contact</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form v-model="valid">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="defaultItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.type"
                          :items="listData.typeData"
                          label="Type"
                          item-text="name"
                          item-value="id"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12">
                        <span class="headline">Email:</span>
                      </v-col>
                      <v-col cols="12">
                        <v-list>
                          <div class="text-right">Is Primary</div>
                          <v-list-item
                            v-for="(value, index) in valueEmail"
                            :key="index"
                          >
                            <v-list-item-remove>
                              <v-icon
                                slot="prepend"
                                color="red"
                                @click="removeEmail"
                              >
                                mdi-minus-circle-outline
                              </v-icon>
                            </v-list-item-remove>
                            <v-list-item-content>
                              <h5>
                                {{ value.email }}(<span
                                  class="font-weight-bold"
                                  v-if="value.type == 1"
                                  >Personal</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 2"
                                  >Work</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 3"
                                  >Other</span
                                >)
                              </h5>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-radio-group v-model="value.is_primary">
                                <v-radio
                                  :key="index"
                                  :id="index"
                                  :value="1"
                                  @change="handleChangeEmails(value)"
                                >
                                </v-radio>
                              </v-radio-group>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.emails.type"
                          label="Type"
                          :items="listData.typeclass"
                          item-text="name"
                          item-value="id"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="defaultItem.emails.email"
                          label="email"
                          :append-icon="'mdi-email-plus-outline'"
                          @click:append="addemail"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <span class="headline">Phones</span>
                      </v-col>
                      <v-col cols="12">
                        <v-list>
                          <div class="text-right">Is Primary</div>
                          <v-list-item
                            v-for="(value, index) in valuePhone"
                            :key="index"
                          >
                            <v-list-item-remove>
                              <v-icon
                                slot="prepend"
                                color="red"
                                @click="removePhone"
                              >
                                mdi-minus-circle-outline
                              </v-icon>
                            </v-list-item-remove>
                            <v-list-item-content>
                              <h5>
                                {{ value.country_code }}-{{
                                  value.number
                                }}(<span
                                  class="font-weight-bold"
                                  v-if="value.type == 1"
                                  >Personal</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 2"
                                  >Work</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 3"
                                  >Other</span
                                >)
                              </h5>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-radio-group v-model="value.is_primary">
                                <v-radio
                                  :key="index"
                                  :id="index"
                                  :value="1"
                                  @change="handleChangePhone(value)"
                                >
                                </v-radio>
                              </v-radio-group>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="defaultItem.phones.type"
                          label="Type"
                          :items="listData.typeclass"
                          item-text="name"
                          item-value="id"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="defaultItem.phones.country_code"
                          label="Country"
                          :items="listData.typecountry_code"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="defaultItem.phones.number"
                          label="phone"
                          name="number"
                          :rules="[required('number'), minLength('number', 10)]"
                        >
                          <v-icon
                            slot="append"
                            @click="addphone"
                            :disabled="!valid"
                          >
                            mdi-phone-plus
                          </v-icon>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <span class="headline">Addresses</span>
                      </v-col>
                      <v-col cols="12">
                        <v-list>
                          <div class="text-right">Is Primary</div>
                          <v-list-item
                            v-for="(value, index) in valueAddress"
                            :key="index"
                          >
                            <v-list-item-remove>
                              <v-icon
                                slot="prepend"
                                color="red"
                                @click="removeAddress"
                              >
                                mdi-minus-circle-outline
                              </v-icon>
                            </v-list-item-remove>
                            <v-list-item-content>
                              <h5>
                                {{ value.address_line_1 }},
                                {{ value.address_line_2 }}, {{ value.city }},
                                {{ value.state }}, {{ value.country }}-
                                {{ value.zipcode }}
                                (<span
                                  class="font-weight-bold"
                                  v-if="value.type == 1"
                                  >Personal</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 2"
                                  >Work</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 3"
                                  >Other</span
                                >)
                              </h5>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-radio-group v-model="value.is_primary">
                                <v-radio
                                  :key="index"
                                  :id="index"
                                  :value="1"
                                  @change="handleChangeAddresses(value)"
                                >
                                </v-radio>
                              </v-radio-group>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.addresses.country"
                          label="Country"
                          :items="listData.typeCountry"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="8"></v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="defaultItem.addresses.state"
                          label="State"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="defaultItem.addresses.city"
                          label="City"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="defaultItem.addresses.address_line_1"
                          label="Address Line 1"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="defaultItem.addresses.address_line_2"
                          label="Address Line 2"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="defaultItem.addresses.zipcode"
                          label="Postal Code"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.addresses.type"
                          label="Type"
                          :items="listData.typeclass"
                          item-text="name"
                          item-value="id"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4"></v-col>
                      <v-col>
                        <v-btn small color="error" @click="addAddress"
                          >Add Address</v-btn
                        >
                      </v-col>
                      <v-col cols="12">
                        <span class="headline">Social Accounts</span>
                      </v-col>
                      <v-col cols="12">
                        <v-list>
                          <div class="text-right">Is Primary</div>
                          <v-list-item
                            v-for="(value, index) in valuesocialnetwork"
                            :key="index"
                          >
                            <v-list-item-remove>
                              <v-icon
                                slot="prepend"
                                color="red"
                                @click="removeSocialAccount"
                              >
                                mdi-minus-circle-outline
                              </v-icon>
                            </v-list-item-remove>
                            <v-list-item-content>
                              <h5>
                                {{ value.url }}(<span
                                  class="font-weight-bold"
                                  v-if="value.type == 1"
                                  >Personal</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 2"
                                  >Work</span
                                >
                                <span
                                  class="font-weight-bold"
                                  v-if="value.type == 3"
                                  >Other</span
                                >)
                              </h5>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-radio-group v-model="value.is_primary">
                                <v-radio
                                  :key="index"
                                  :id="index"
                                  :value="1"
                                  @change="handleChangeSocialNetwork(value)"
                                >
                                </v-radio>
                              </v-radio-group>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.socialnetwork.type"
                          label="Type"
                          :items="listData.typeclass"
                          item-text="name"
                          item-value="id"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field
                          v-model="defaultItem.socialnetwork.url"
                          label="url"
                          :append-icon="'mdi-email-plus-outline'"
                          @click:append="addsocialaccount"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-divider class="mt-5"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="closeEdit"> Cancel </v-btn>
                <v-btn color="primary" @click="update"> Update </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="justify-center"
                >Delete This Contact?</v-card-title
              >
              <v-spacer></v-spacer>
              <v-card-subtitle class="text-center"
                >Are you sure?</v-card-subtitle
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Yes</v-btn
                >
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >No</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...menu, ...tooltip }">
                  <v-icon>mdi-dots-vertical</v-icon></v-btn
                >
              </template>
              <span>Action</span>
            </v-tooltip>
          </template>
          <v-list class="pa-0" dense>
            <v-list-item @click="Edit(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-account-edit</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Edit Contact</v-list-item-title>
            </v-list-item>
            <v-list-item disabled @click="Delete(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-account-remove</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Delete Contact</v-list-item-title>
            </v-list-item>
            <v-list-item @click="Detail(item.id)">
              <v-list-item-icon class="mr-2">
                <v-icon small>mdi-account-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Detail Contact</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:[`item.type`]="items">
        <div v-for="(type, index) in items" :key="index">
          <td v-if="type == 1">customer</td>
          <td v-if="type == 2">supplier</td>
        </div>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
import validations from "@/utils/validations";
import addContact from "./addContact";
export default {
  name: "Contact",
  components: { addContact },
  data() {
    return {
      openEdit: false,
      loadingItem: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Type", value: "type" },
        { text: "Email", value: "primary_email" },
        { text: "Phone", value: "primary_phone" },
        { text: "Data Added", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      snackbar: {
        show: false,
        text: "Contact Added Successfully",
        color: "success",
      },
      snackbarUpdate: {
        show: false,
        text: "Contact Updated Successfully",
        color: "success",
      },
      snackbarDelete: {
        show: false,
        text: "Contact Deleted Successfully",
        color: "success",
      },
      list: [],
      clearItem: {
        name: null,
        type: "",
        emails: [{ type: "" }, { is_primary: "" }, { email: "" }],
        phones: [
          { type: "" },
          { is_primary: "" },
          { country_code: "" },
          { number: "" },
        ],
        addresses: [
          { type: "" },
          { is_primary: "" },
          { address_line_1: "" },
          { address_line_2: "" },
          { city: "" },
          { country: "" },
          { state: "" },
          { zipcode: "" },
        ],
        socialnetwork: [{ type: "" }, { is_primary: "" }, { url: "" }],
      },
      defaultItem: {
        id: "",
        name: "",
        type: "",
        emails: [{ type: "" }, { is_primary: "" }, { email: "" }],
        phones: [
          { type: "" },
          { is_primary: "" },
          { country_code: "" },
          { number: "" },
        ],
        addresses: [
          { type: "" },
          { is_primary: "" },
          { address_line_1: "" },
          { address_line_2: "" },
          { city: "" },
          { country: "" },
          { state: "" },
          { zipcode: "" },
        ],
        socialnetwork: [{ type: "" }, { is_primary: "" }, { url: "" }],
      },
      ...validations,

      listData: {
        typeData: [
          { id: 1, name: "Customer" },
          { id: 2, name: "Supplier" },
        ],
        typeclass: [
          { id: 1, name: "Personal" },
          { id: 2, name: "Work" },
          { id: 3, name: "Other" },
        ],
        typeCountry: ["Indonesia", "English", "Arabic"],
        typecountry_code: ["ID", "US", "AS"],
      },
      valueEmail: [],
      valuePhone: [],
      valueAddress: [],
      valuesocialnetwork: [],
      pageContact: 1,
      totalContact: 0,
      optionsContact: {},
      listId: 0,
    };
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },

  methods: {
    paginate() {
      this.readDataFromAPI();
    },

    readDataFromAPI() {
      this.loadingItem = true;
      const uri = "https://api-dev.phantasmode.com";
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const { page, itemsPerPage } = this.optionsContact;
      Proxy.get(
        uri + "/api/contacts" + "?page=" + page + "&limit=" + itemsPerPage,
        { headers }
      )
        .then((res) => {
          this.list = res.data.data;
          this.totalContact = res.data.total;
          this.loadingItem = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingItem = false;
        });
    },

    Edit(id) {
      console.log(id);
      this.openEdit = true;
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      Proxy.get(uri + "/api/contacts/" + id, {
        headers,
      })
        .then((res) => {
          this.defaultItem.id = res.data.id;
          this.defaultItem.name = res.data.name;
          this.defaultItem.type = res.data.type;
          this.valueEmail = res.data.emails;
          this.valuePhone = res.data.phones;
          this.valueAddress = res.data.addresses;
          this.valuesocialnetwork = res.data.social_networks;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    Detail(id) {
      console.log(id);
      this.$router.push("/Menu/Contact/detailContact/" + id);
    },

    Delete(id) {
      console.log(id);
      this.listId = id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // set url
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const response = Proxy.delete(uri + "/api/contacts/" + this.listId, {
        headers,
      });
      console.log(response.data);
      this.snackbarDelete.show = true;
      this.readDataFromAPI();
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    close() {
      this.dialog = false;
      this.defaultItem = this.clearItem;
      this.valueEmail = null;
      this.valuePhone = null;
      this.valueAddress = null;
      this.valuesocialnetwork = null;
    },
    closeEdit() {
      this.openEdit = false;
      this.defaultItem = this.clearItem;
      this.valueEmail = null;
      this.valuePhone = null;
      this.valueAddress = null;
      this.valuesocialnetwork = null;
    },

    addemail() {
      const incomingDataEmail = {
        type: this.defaultItem.emails.type,
        is_primary: this.defaultItem.emails.is_primary,
        email: this.defaultItem.emails.email,
      };
      this.defaultItem.emails = {
        type: "",
        is_primary: "",
        email: "",
      };
      this.valueEmail.push(incomingDataEmail);
    },
    addphone() {
      const incomingDataPhone = {
        type: this.defaultItem.phones.type,
        is_primary: this.defaultItem.phones.is_primary,
        country_code: this.defaultItem.phones.country_code,
        number: this.defaultItem.phones.number,
      };
      this.defaultItem.phones = {
        type: "",
        is_primary: "",
        country_code: "",
        number: "",
      };
      this.valuePhone.push(incomingDataPhone);
    },
    addAddress() {
      const incomingDataAddress = {
        type: this.defaultItem.addresses.type,
        is_primary: this.defaultItem.addresses.is_primary,
        address_line_1: this.defaultItem.addresses.address_line_1,
        address_line_2: this.defaultItem.addresses.address_line_2,
        city: this.defaultItem.addresses.city,
        country: this.defaultItem.addresses.country,
        state: this.defaultItem.addresses.state,
        zipcode: this.defaultItem.addresses.zipcode,
      };
      this.defaultItem.addresses = {
        type: "",
        is_primary: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        country: "",
        state: "",
        zipcode: "",
      };
      this.valueAddress.push(incomingDataAddress);
    },

    addsocialaccount() {
      const incomingDataEmail = {
        type: this.defaultItem.socialnetwork.type,
        is_primary: this.defaultItem.socialnetwork.is_primary,
        url: this.defaultItem.socialnetwork.url,
      };
      this.defaultItem.socialnetwork = {
        type: "",
        is_primary: "",
        url: "",
      };
      this.valuesocialnetwork.push(incomingDataEmail);
    },

    handleChangeEmails(email) {
      this.valueEmail
        .filter((emailObject) => {
          if (email.email == emailObject.email) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = 1;
        });

      this.valueEmail
        .filter((emailObject) => {
          if (email.email !== emailObject.email) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = null;
        });
      console.log(this.valueEmail, this.defaultItem.emails.is_primary);
    },
    handleChangePhone(phone) {
      this.valuePhone
        .filter((phoneObject) => {
          if (phone.number == phoneObject.number) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = 1;
        });

      this.valuePhone
        .filter((phoneObject) => {
          if (phone.number !== phoneObject.number) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = null;
        });
      console.log(this.valuePhone, this.defaultItem.phones.is_primary);
    },
    handleChangeAddresses(Addresses) {
      this.valueAddress
        .filter((AddressesObject) => {
          if (Addresses.country == AddressesObject.country) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = 1;
        });

      this.valueAddress
        .filter((AddressesObject) => {
          if (Addresses.country !== AddressesObject.country) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = null;
        });
      console.log(this.valueAddress, this.defaultItem.addresses.is_primary);
    },
    handleChangeSocialNetwork(socialnetwork) {
      this.valuesocialnetwork
        .filter((SocialNetworkObject) => {
          if (socialnetwork.url == SocialNetworkObject.url) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = 1;
        });

      this.valuesocialnetwork
        .filter((SocialNetworkObject) => {
          if (socialnetwork.url !== SocialNetworkObject.url) {
            return true;
          }
        })
        .map((filtered) => {
          filtered.is_primary = null;
        });
      console.log(
        this.valuesocialnetwork,
        this.defaultItem.socialnetwork.is_primary
      );
    },

    update() {
      // set url
      const uri = "https://api-dev.phantasmode.com";
      // get token from localStorage
      const token = localStorage.getItem("access_token");
      // set the headers
      const headers = {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      };
      const body = {
        name: this.defaultItem.name,
        type: this.defaultItem.type,
        emails: this.valueEmail,
        phones: this.valuePhone,
        addresses: this.valueAddress,
        socialnetwork: this.valuesocialnetwork,
      };
      Proxy.put(uri + "/api/contacts/" + this.defaultItem.id, body, {
        headers,
      })
        .then((res) => {
          console.log(res);
          this.snackbarUpdate.show = true;
          this.readDataFromAPI();
          this.closeEdit();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeEmail: function(index) {
      this.valueEmail.splice(index, 1);
    },
    removePhone: function(index) {
      this.valuePhone.splice(index, 1);
    },
    removeAddress: function(index) {
      this.valueAddress.splice(index, 1);
    },
    removeSocialAccount: function(index) {
      this.valuesocialnetwork.splice(index, 1);
    },
  },
  mounted() {
    this.readDataFromAPI();
  },
};
</script>
