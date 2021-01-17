<template>
  <v-app>
    <template>
      <v-card tile>
        <v-card-actions>
          <v-btn text class="ma-2" color="blue darken-2" dark @click="back">
            <v-icon dark left> mdi-arrow-left </v-icon> Back To Contact List
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="ma-2"
                color="blue darken-2"
                dark
                v-on="on"
                v-bind="attrs"
                @click="postValue(post)"
              >
                <v-icon dark left> mdi-account-edit </v-icon> Edit</v-btn
              >
            </template>
            <v-card tile>
              <v-card-title>
                <span class="headline">Edit Contact</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form v-model="valid">
                    <v-row
                      ><v-col cols="12">
                        <v-text-field
                          v-model="defaultItem.name"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="defaultItem.type"
                          :items="listData.typeData"
                          item-text="name"
                          item-value="id"
                          label="Type"
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
                              <v-icon slot="prepend" color="red">
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
                              <v-icon slot="prepend" color="red">
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
                              <v-icon slot="prepend" color="red">
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
                              <v-icon slot="prepend" color="red">
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
                <v-btn color="error" @click="close"> Cancel </v-btn>
                <v-btn color="primary" @click="update"> Update </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn text class="ma-2" color="blue darken-2" dark>
            <v-icon dark left> mdi-bitbucket </v-icon> Archive
          </v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-card class="right mb-6 ml-6" max-width="500" v-if="post != null">
          <v-card-title>Basic Information</v-card-title>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> <h4>Name:</h4></v-list-item-title>
              <v-list-item-subtitle>{{ post.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title><h4>Primary Email:</h4></v-list-item-title>
              <v-list-item-subtitle>
                {{ post.primary_email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title><h4>Primary Phone:</h4></v-list-item-title>
              <v-list-item-subtitle>
                {{ post.primary_phone }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card
          class="right mb-6 ml-6"
          max-width="500"
          v-if="post.addresses.length > 0"
        >
          <v-card-title>Addresses</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                v-for="value in post.addresses"
                :key="value"
              >
                <span class="font-weight-bold" v-if="value.type == 1"
                  >Personal</span
                >
                <span class="font-weight-bold" v-if="value.type == 2"
                  >Work</span
                >
                <span class="font-weight-bold" v-if="value.type == 3"
                  >Other</span
                >
                :{{ value.address_line_1 }},{{ value.address_line_2 }},{{
                  value.city
                }},{{ value.country }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card
          class="right mb-6 ml-6"
          max-width="500"
          v-if="post.phones.length > 0"
        >
          <v-card-title>Phones</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle v-for="value in post.phones" :key="value">
                <span class="font-weight-bold" v-if="value.type == 1"
                  >Personal</span
                >
                <span class="font-weight-bold" v-if="value.type == 2"
                  >Work</span
                >
                <span class="font-weight-bold" v-if="value.type == 3"
                  >Other</span
                >
                : {{ value.formatted_number }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-card
          class="right mb-6 ml-6"
          max-width="500"
          outlined
          v-if="post.social_networks.length > 0"
        >
          <v-card-title>Social Network</v-card-title>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle
                v-for="value in post.social_networks"
                :key="value"
              >
                <span class="font-weight-bold" v-if="value.type == 1"
                  >Personal</span
                >
                <span class="font-weight-bold" v-if="value.type == 2"
                  >Work</span
                >
                <span class="font-weight-bold" v-if="value.type == 3"
                  >Other</span
                >
                : {{ value.url }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-card>
    </template>
  </v-app>
</template>

<script>
import Proxy from "@/services/proxy";
import validations from "@/utils/validations";
export default {
  data() {
    return {
      post: "",
      dialog: false,
      defaultItem: {
        id: "",
        name: "",
        type: "",
        category_type: "",
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
      clearItem: {
        name: "",
        type: "",
        category_type: "",
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
    };
  },
  methods: {
    back() {
      this.$router.push("/Menu/Contact");
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
    postValue(post) {
      this.defaultItem.id = post.id;
      this.defaultItem.name = post.name;
      this.defaultItem.type = post.type;
      this.valueEmail = post.emails;
      this.valuePhone = post.phones;
      this.valueAddress = post.addresses;
      this.valuesocialnetwork = post.social_networks;
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

    close() {
      this.dialog = false;
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
      const response = Proxy.put(
        uri + "/api/contacts/" + this.$route.params.id,
        body,
        {
          headers,
        }
      );
      console.log(response.data);
      this.close();
    },
  },
  async mounted() {
    // set url
    const uri = "https://api-dev.phantasmode.com";
    // get token from localStorage
    const token = localStorage.getItem("access_token");
    // set the headers
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    const result = await Proxy.get(
      uri + "/api/contacts/" + this.$route.params.id,
      {
        headers,
      }
    );
    console.log(result.data);
    this.post = result.data;
  },
};
</script>
