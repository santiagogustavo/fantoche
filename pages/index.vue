<template>
  <v-container class="page">
    <div class="fantoche-table">
      <v-row justify="center" align="center">
        <h1>fantoche</h1>
      </v-row>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="url"
                :rules="urlRules"
                label="URL"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="width"
                :rules="dimensionRules"
                label="Width"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="height"
                :rules="dimensionRules"
                label="Height"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="6" align="center">
            <v-btn
              :disabled="!valid"
              color="success"
              @click="handleClickPrint"
            >
              Print
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <div v-if="imageUrl" class="fantoche-table__url">
        {{ imageUrl }}
      </div>
      <div v-if="imageUrl" class="fantoche-table__print" :style="cssVars">
        <img :src="imageUrl" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { isWebUri } from 'valid-url';
import { FANTOCHE_APP_BASE_URL } from '@/constants/url';

export default {
  name: 'Index',
  data: () => ({
    valid: true,
    url: '',
    width: '',
    height: '',
    urlRules: [
      (v) => !!v || 'URL is required',
      (v) => !!isWebUri(v) || 'Must be a valid URL',
    ],
    dimensionRules: [
      (v) => Number(v) > 0 || 'Must be a number greater than zero',
    ],
    imageUrl: '',
  }),
  computed: {
    cssVars() {
      return {
        '--print-width': this.width + 'px',
        '--print-height': this.height + 'px',
      };
    },
  },
  methods: {
    handleClickPrint() {
      this.imageUrl = '';
      setTimeout(() => {
        this.imageUrl = `${FANTOCHE_APP_BASE_URL}/?url=${this.url}&width=${this.width}&height=${this.height}`;
      }, 10);
    },
  },
};
</script>

<style lang="scss">
@keyframes photoflash {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fantoche-table {
  max-width: 90%;
  margin: auto;
  width: fit-content;

  &__url {
    margin: 32px 0;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }

  &__print {
    margin: 32px auto;
    position: relative;
    height: var(--print-height);
    width: var(--print-width);
    max-height: fit-content;
    max-width: 100%;

    img {
      height: auto;
      width: 100%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: inherit;
      max-height: inherit;
      background: white;
      animation: photoflash 500ms ease forwards;
    }
  }
}
</style>
